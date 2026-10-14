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
