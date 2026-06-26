# Autenticação (Cloudflare Access + Authentik)

Mesmo padrão do **diariobr**: o site (Cloudflare Pages) fica atrás do **Cloudflare
Access**, que delega o login ao **Authentik** (`sso.colabh.org`) como provedor de
identidade **OIDC**. O Astro **não** muda — a proteção acontece na borda (Cloudflare),
antes da requisição chegar ao site estático.

```
visitante ──▶ Cloudflare Access (edge) ──▶ Authentik (OIDC) ──▶ login
                     │  cookie de sessão válido?
                     └── sim ─▶ serve o site (Cloudflare Pages)
```

Vantagens: nenhuma dependência no build/runtime do site, SSO unificado com os demais
apps do ecossistema e política de acesso centralizada no Authentik.

> **Pré-requisito de DNS**: o domínio precisa estar na zona Cloudflare **com proxy
> ligado** (nuvem laranja). `lab-ippriunesp.org` já é autoritativo na Cloudflare, então
> o Access funciona no domínio custom. Para previews `*.pages.dev` veja o [Passo 5](#passo-5--proteger-previews-opcional).

---

## Antes de começar: duas decisões

### Decisão 1 — O que proteger (escopo)

| Opção | Domínio no Access | Quando usar |
|---|---|---|
| **Só previews** (recomendado p/ site público) | `*.<projeto>.pages.dev` | Site público em construção: produção aberta, previews de branch protegidos. |
| **Site inteiro** | `lab-ippriunesp.org` (+ `www`) | O site é privado/interno (como o diariobr, se ele for restrito). |
| **Uma seção** | `lab-ippriunesp.org/restrito` (path) ou `admin.lab-ippriunesp.org` | Só uma área exige login; o resto fica público. |

O escopo é **só o campo "domínio" da Access Application** (Passo 3). Tudo o mais
(Authentik, IdP, policy) é idêntico. Dá pra ter mais de uma Application com escopos
diferentes.

### Decisão 2 — Quem entra (policy)

| Opção | Regra no Access | Observação |
|---|---|---|
| **Grupo no Authentik** (recomendado) | `OIDC Claims` → `groups` contém `lab-ippri` | Centralizado no IdP; exige o scope mapping de grupos (Passo 1.4). |
| **E-mails `@unesp.br`** | `Emails ending in` → `@unesp.br` | Simples; qualquer conta institucional autenticada no Authentik entra. |
| **Lista específica** | `Emails` → lista | Bom p/ poucos usuários ou acesso temporário. |

Os exemplos abaixo usam **grupo `lab-ippri`** como caso recomendado e mostram as
variantes nos pontos relevantes.

---

## Passo 1 — Authentik: provider + application OIDC

No admin do Authentik (`https://authentik.colabh.org/if/admin/`):

**1.1** **Applications → Providers → Create → OAuth2/OpenID Provider**:
- **Name**: `site-lab (Cloudflare Access)`
- **Authorization flow**: `default-provider-authorization-explicit-consent` (ou o implicit, se preferir não exibir tela de consentimento)
- **Client type**: `Confidential`
- **Client ID / Client Secret**: deixe gerar — **anote os dois** (usados no Passo 2)
- **Redirect URIs/Origins** (um por linha):
  ```
  https://<TEAM>.cloudflareaccess.com/cdn-cgi/access/callback
  ```
  Troque `<TEAM>` pelo nome da sua organização Zero Trust (veja no Passo 2).
- **Signing Key**: a chave padrão (`authentik Self-signed Certificate`)
- **Scopes**: `openid`, `email`, `profile`

**1.2** **Applications → Applications → Create**:
- **Name**: `Site Lab IPPRI`
- **Slug**: `site-lab`  ← compõe as URLs OIDC abaixo
- **Provider**: o provider criado em 1.1

**1.3** Anote os **endpoints OIDC** (slug `site-lab`):
```
Discovery : https://authentik.colabh.org/application/o/site-lab/.well-known/openid-configuration
Authorize : https://authentik.colabh.org/application/o/authorize/
Token     : https://authentik.colabh.org/application/o/token/
JWKS/Certs: https://authentik.colabh.org/application/o/site-lab/jwks/
Userinfo  : https://authentik.colabh.org/application/o/userinfo/
Issuer    : https://authentik.colabh.org/application/o/site-lab/
```

**1.4** *(só se a policy for por grupo)* Garanta que o claim `groups` seja enviado:
- **Customization → Property mappings → Create → Scope mapping**:
  - **Name**: `OIDC groups`, **Scope name**: `groups`
  - **Expression**:
    ```python
    return [group.name for group in request.user.ak_groups.all()]
    ```
- No provider (1.1), adicione `groups` à lista de **Scopes**.
- Crie o grupo **Directory → Groups → `lab-ippri`** e adicione os usuários.

> **Quem pode usar o login**: o Authentik também filtra por *bindings* na Application
> (1.2). Para o Cloudflare ser a fonte única da política, deixe a Application sem
> binding restritivo e controle tudo na policy do Access (Passo 4). Para defesa em
> profundidade, vincule o grupo `lab-ippri` aqui **e** na policy.

---

## Passo 2 — Cloudflare Zero Trust: adicionar o Authentik como IdP

Painel: **Zero Trust** (`one.dash.cloudflare.com`) → **Settings → Authentication**.

- O **nome da organização** (`<TEAM>`) aparece em **Settings → Custom Pages →
  Team domain** como `https://<TEAM>.cloudflareaccess.com`. É o valor usado na
  redirect URI do Passo 1.1.

**Login methods → Add new → OpenID Connect**:
- **Name**: `Authentik`
- **App ID**: o **Client ID** do Passo 1.1
- **Client secret**: o **Client Secret** do Passo 1.1
- **Auth URL**: `https://authentik.colabh.org/application/o/authorize/`
- **Token URL**: `https://authentik.colabh.org/application/o/token/`
- **Certificate URL**: `https://authentik.colabh.org/application/o/site-lab/jwks/`
- **Proof Key for Code Exchange (PKCE)**: **ligado**
- **OIDC Claims**: adicione `email` e (se usar grupos) `groups`
- **Save** → **Test** (deve abrir o login do Authentik e voltar com sucesso).

---

## Passo 3 — Cloudflare Access: a Application

**Zero Trust → Access → Applications → Add an application → Self-hosted**:
- **Application name**: `Site Lab IPPRI`
- **Session duration**: ex. `24h`
- **Application domain** — conforme a **Decisão 1**:
  - Site inteiro: `lab-ippriunesp.org` (adicione outra entrada p/ `www` se existir)
  - Seção: `lab-ippriunesp.org` + **Path** `/restrito` (ou subdomínio próprio)
  - Previews: `*.<projeto>.pages.dev` (veja Passo 5)
- **Identity providers**: marque **apenas** `Authentik` (desmarque "Accept all
  available identity providers" para não permitir outros métodos)
- **Instant Auth**: pode ligar para pular o seletor de IdP (só há um)
- Avance para as policies (Passo 4).

---

## Passo 4 — Policy (quem entra)

Na Application, **Add a policy**:
- **Policy name**: `lab-ippri`
- **Action**: `Allow`
- **Configure rules → Include** — conforme a **Decisão 2**:

| Policy | Selector | Valor |
|---|---|---|
| Grupo Authentik | **OIDC Claims** | claim `groups` = `lab-ippri` |
| `@unesp.br` | **Emails ending in** | `@unesp.br` |
| Lista | **Emails** | `fulano@unesp.br`, `ciclana@unesp.br` |

Salve. Opcional: uma 2ª policy `Action: Block` para `Everyone` como negação explícita
(o Access já é deny-by-default, então normalmente basta o Allow).

---

## Passo 5 — Proteger previews (opcional)

Os deploys de preview do Pages saem em `https://<hash>.<projeto>.pages.dev`. Para
exigir login só neles, sem tocar na produção:

1. Descubra o nome do projeto em **Workers & Pages → seu projeto** (ex.: `site-lab`).
2. Crie uma **Access Application self-hosted** (Passo 3) com **domínio**
   `*.<projeto>.pages.dev` (wildcard de subdomínio) e a mesma policy do Passo 4.
3. Mantenha o domínio de produção (`lab-ippriunesp.org`) **sem** Access → continua público.

> O label exato e o suporte a wildcard em `*.pages.dev` podem variar conforme o painel.
> Se a UI não aceitar o wildcard, use **Workers & Pages → projeto → Settings → Access
> Policy / Protect preview deployments**, que cria a Access Application automaticamente
> apontando para o IdP escolhido.

---

## Verificação

1. Acesse a URL protegida numa janela anônima → deve **redirecionar ao Authentik**.
2. Faça login com um usuário **dentro** da policy → cai no site.
3. Faça login com um usuário **fora** da policy → tela "denied" do Access.
4. Sessão: `https://<TEAM>.cloudflareaccess.com` lista os apps; logout em
   `https://<TEAM>.cloudflareaccess.com/cdn-cgi/access/logout`.

---

## Troubleshooting

| Sintoma | Causa provável | Correção |
|---|---|---|
| Loop de redirect / `invalid redirect_uri` | Redirect URI no Authentik ≠ `<TEAM>` real | Confira a URI do Passo 1.1 vs. o team domain (Passo 2). |
| Login OK mas sempre "denied" | Policy não bate | Veja os claims recebidos em **Access → Logs**; ajuste email/claim `groups`. |
| Grupo não filtra | Claim `groups` não enviado | Scope mapping (1.4) + `groups` nos scopes do provider **e** nos OIDC Claims (Passo 2). |
| Erro de certificado/JWKS | Certificate URL errada | Use a JWKS com o slug correto: `.../application/o/site-lab/jwks/`. |
| Produção também pede login (não era pra pedir) | Access Application cobrindo o apex | Escopo deve ser só `*.pages.dev` (Passo 5), não o domínio custom. |

---

## Apêndice — Terraform (IaC opcional)

Para gerir como código em vez do dashboard. Requer um **API token Cloudflare** com
permissão *Access: Apps and Policies* + *Access: Organizations, Identity Providers* e
o **account ID**. Provider `cloudflare/cloudflare` **>= 5.0** (nomes `zero_trust_*`).

```hcl
variable "account_id"     { type = string }
variable "authentik_slug" { type = string, default = "site-lab" }
variable "oidc_client_id"     { type = string, sensitive = true }
variable "oidc_client_secret" { type = string, sensitive = true }

# 1) Authentik como IdP OIDC
resource "cloudflare_zero_trust_access_identity_provider" "authentik" {
  account_id = var.account_id
  name       = "Authentik"
  type       = "oidc"
  config {
    client_id      = var.oidc_client_id
    client_secret  = var.oidc_client_secret
    auth_url       = "https://authentik.colabh.org/application/o/authorize/"
    token_url      = "https://authentik.colabh.org/application/o/token/"
    certs_url      = "https://authentik.colabh.org/application/o/${var.authentik_slug}/jwks/"
    pkce_enabled   = true
    scopes         = ["openid", "email", "profile", "groups"]
    claims         = ["email", "groups"]
  }
}

# 2) Access Application (ajuste o domain conforme a Decisão 1)
resource "cloudflare_zero_trust_access_application" "site_lab" {
  account_id                = var.account_id
  name                      = "Site Lab IPPRI"
  domain                    = "lab-ippriunesp.org"   # ou "*.site-lab.pages.dev" p/ previews
  type                      = "self_hosted"
  session_duration          = "24h"
  allowed_idps              = [cloudflare_zero_trust_access_identity_provider.authentik.id]
  auto_redirect_to_identity = true
}

# 3) Policy (exemplo: grupo lab-ippri via claim OIDC; veja variantes nos comentários)
resource "cloudflare_zero_trust_access_policy" "lab_ippri" {
  account_id     = var.account_id
  application_id = cloudflare_zero_trust_access_application.site_lab.id
  name           = "lab-ippri"
  precedence     = 1
  decision       = "allow"

  include {
    oidc { name = "groups", value = "lab-ippri" }
    # variante @unesp.br:  email_domain { domain = "unesp.br" }
    # variante lista:      email { email = "fulano@unesp.br" }
  }
}
```

> Mantenha `oidc_client_secret` fora do git (use `TF_VAR_oidc_client_secret`, SOPS, ou
> o secret store do CI). O `.gitleaks.toml` do `devops` já bloqueia segredos commitados.

---

## Referências

- [Deploy no Cloudflare Pages](deploy.md)
- Authentik — *Integrate with Cloudflare Access* (docs oficiais do Authentik)
- Cloudflare — *Zero Trust → Access → Generic OIDC IdP* e *Self-hosted applications*
- IdP do ecossistema: `authentik.colabh.org` / `sso.colabh.org` (ver `devops`)
