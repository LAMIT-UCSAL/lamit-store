# Frontend Developer Standards

## Critical Coding Rules

1. Nunca hardcode cores em hex direto no CSS de um componente — sempre usar as CSS variables de `tokens.css`.
2. Nunca hardcode dados de produto (nome, preço, tamanhos, link do Forms) direto no HTML — a fonte única de verdade é `data/products.json`.
3. Toda alteração no header/footer compartilhado deve ser replicada manualmente nas 5 páginas (sem includes/templating) — marcar esses blocos com um comentário (`<!-- SHARED: footer v1 -->`) pra facilitar localizar todas as instâncias na hora de atualizar.
4. Toda imagem de produto exige `alt` descritivo — nunca vazio ou genérico ("imagem", "foto").
5. Nunca remover o guard de `prefers-reduced-motion` ao adicionar novas animações.
6. Nunca introduzir framework JS (React, Vue, jQuery) "pra facilitar" — quebra a decisão de stack já confirmada.
7. Nunca deixar um CTA "Pedir" sem link funcional — se o Forms real ainda não existir no momento do deploy, apontar pro placeholder documentado, nunca `href="#"` vazio.
8. Sempre testar navegação por teclado ao adicionar qualquer novo elemento interativo.

## Quick Reference

**Comandos comuns**
- Servir localmente: `npx serve .` ou `netlify dev` — nenhum comando de build é necessário.
- Deploy: push na branch principal → Netlify builda e publica automaticamente (Story 1.1 do PRD).

**Padrões de import (ordem em cada página HTML)**

```html
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/components.css">
...
<script src="/js/main.js" defer></script>
```

**Convenção de nomes de arquivo:** kebab-case (`camiseta-salvador.html`, `main.js`).

**Utilitário central do projeto:** `data/products.json` — toda informação de produto vem daqui, nunca hardcoded em HTML.
