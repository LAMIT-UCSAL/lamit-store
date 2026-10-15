# lamit-store

Catálogo digital do primeiro drop de produtos da LAMIT (Liga Acadêmica de Maratonas, Inovação e Tecnologia). Site estático — HTML/CSS/JS puro, sem framework, sem backend. Contexto completo em `docs/brief.md`, `docs/prd/` e `docs/architecture/`.

## Rodar localmente

Nenhuma instalação de dependências é necessária:

```bash
npx serve .
```

## Deploy

Push na branch `main` → deploy automático no Netlify (ver `netlify.toml`).

O Netlify roda `node scripts/build.mjs`, que monta `dist/` só com os arquivos públicos (`index.html`, `css/`, `js/`, `data/`, `produtos/` e `assets/`, sem o material interno de marca e sem os PNG/JPEG originais das fotos). Só `dist/` é publicada: `.env`, `docs/`, `.aiox-core/`, `.claude/` e o resto do repositório ficam fora do ar.

Para conferir localmente o que vai para o ar:

```bash
npm run build
npx serve dist
```

Ao criar uma pasta ou arquivo público novo na raiz, inclua-o em `PUBLIC_ENTRIES` no `scripts/build.mjs`.

## Header e rodapé compartilhados

A fonte única fica em `partials/header.html` e `partials/footer.html`. Cada página guarda uma cópia entre os marcadores `<!-- partial:NOME -->` e `<!-- /partial:NOME -->`, para continuar funcionando com `npx serve .`.

- Editou um partial? Rode `npm run partials` para atualizar as páginas.
- `npm run partials:check` falha se alguma página estiver desatualizada.
- O build sempre aplica os partials na `dist/`, então o que vai para o ar nunca diverge.

## Pedido pelo Google Forms

O botão "Fazer pedido" abre o Forms já com produto, tamanho e (na Soterô) cor marcados. Os IDs das perguntas ficam em `data/products.json`: `formsFields` (`size`, `color`) em cada produto e `formsValue` em cada variante de cor. Se as perguntas do Forms mudarem, atualize esses IDs.

## Prévia de compartilhamento

Cada página tem título, descrição e imagem próprios para WhatsApp, Instagram e afins. As imagens (1200×630) ficam em `assets/og/` e foram geradas a partir da primeira foto de cada produto; ao trocar a foto principal ou criar um produto, gere uma nova e atualize as tags `og:` da página.
