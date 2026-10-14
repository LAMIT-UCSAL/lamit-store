---
name: project-store-site-alignment
description: Iniciativa (out/2026) de alinhar visual da lamit-store (tema claro) ao lamit-site (tema escuro); recomendação arquitetural e bloqueio de paleta pendente
metadata:
  type: project
---

Em 2026-10-13 auditei a loja e recomendei: migrar lamit-store para Vite vanilla MPA (sem React) + pacote compartilhado `lamit-brand` (tokens CSS em 3 camadas com `[data-theme]`, fontes woff2, sprite SVG), distribuído como dependência git versionada. Auditoria completa em docs/audits/2026-10-13-frontend-architecture-audit.md.

**Why:** loja segue o guia de marca (#0A69C4/#E8722C/Montserrat), site segue DESIGN.md próprio (#0A3383/#164194/#e84b13/BB Mono, raio 0, sem sombra) — divergência de paleta/tipografia sem dono decidido. Também: netlify publish="." expunha o repo inteiro (.aiox-core, docs, zips).

**How to apply:** antes de propor trabalho visual, verificar se a decisão de paleta canônica (UX + dono da marca) já foi tomada e se a Fase 0 (bloquear exposição do deploy, comprimir imagens) foi feita. Ver [[lamit-store-deploy-exposure]] se surgir.
