# Project Structure

```plaintext
lamit-store/
├── index.html                      # Catálogo / Home (contexto LAMIT + grid de produtos)
├── produtos/
│   ├── camiseta-marrom-simples.html
│   ├── camiseta-brasao-preta.html
│   ├── camiseta-salvador.html      # 1 produto, 3 variações de cor (azul/dourada/preta)
│   └── ecobag.html
├── css/
│   ├── tokens.css                  # Variáveis de marca: cores, espaçamento, tipografia
│   ├── base.css                    # Reset + estilos globais (body, headings, links)
│   └── components.css              # Product card, CTA, delivery note, header, footer
├── js/
│   └── main.js                     # Micro-interações leves (se necessário além de puro CSS)
├── data/
│   └── products.json               # Nome, descrição, tamanhos, cores, link do Forms, caminho da foto
├── assets/
│   ├── logos/                      # Logos LAMIT (movidos da raiz de assets/)
│   └── products/
│       ├── camisetas/              # já existe — fotos fornecidas
│       └── ecobag/                 # placeholder até a foto chegar
├── netlify.toml                    # Configuração de build/deploy no Netlify
└── README.md
```

**Racional:** cada produto é um arquivo HTML próprio (não uma rota dinâmica), consequência direta de "sem framework". Dados dos produtos centralizados em `data/products.json` porque o PRD exige que preço, foto e link do Forms possam ser atualizados sem mexer na estrutura do site.
