---
name: site-technical-audit
description: Auditoria técnica do lamit-site (2026-10-14) — armadilha do NODE_ENV no .env, deploy sem config, fases e caminho do pacote lamit-brand
metadata:
  type: project
---

Auditoria técnica do lamit-site entregue em 2026-10-14 (`lamit-site/docs/audits/2026-10-14-technical-audit.md`).

Fatos não óbvios que valem para próximas sessões:
- O `.env` do lamit-site (template AIOX) tem `NODE_ENV=development`, o que faz o `vite build` local gerar o React em modo desenvolvimento (674 KB contra 440 KB). Ao medir o bundle, rodar com `NODE_ENV=production` até isso ser corrigido.
- O repositório do site não tem config de deploy nem GitHub Pages; o host é desconhecido. Recomendei Netlify (como a loja, `lamitstore.netlify.app`).
- Loja e site já compartilham os valores de paleta, Montserrat e raios, mas duplicados à mão; a divergência que resta é só de tema (loja clara com sombras, site escuro sem sombras).

**Why:** o usuário está unificando o ecossistema LAMIT; ver [[store-site-alignment]].
**How to apply:** em trabalhos de tokens, usar os nomes de primitivas da loja (`--color-cobalt` etc.) e o pacote `lamit-brand` em repositório próprio com tag git; conferir se as fases 1 e 2 (correções de produção e lint/testes) já foram feitas antes de propor refatorações.
