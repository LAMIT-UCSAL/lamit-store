# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML/CSS/JS estático simples (sem framework) — escolha do usuário, priorizando o deploy mais simples possível para este MVP.

## Users

Público que acompanha a LAMIT (redes sociais, comunidade UCSAL) e visitantes que chegam ao site sem contexto prévio ("caíram de paraquedas"). Loja pública, não restrita a membros ou afiliados da UCSAL.

## Product Purpose

Vender produtos com a marca LAMIT (camisetas, moletons, ecobags, canecas e itens semelhantes) para fortalecer a identidade de marca da LAMIT. O site é um MVP focado na experiência de navegação do catálogo de produtos, como em um e-commerce real — sem gateway de pagamento nesta primeira versão. Primeiro drop: 3 modelos de camiseta + 1 modelo de ecobag.

## Positioning

A LAMIT quer ser reconhecida como muito mais do que "apenas uma liga acadêmica de maratonas, inovação e tecnologia" — a loja de produtos de marca é parte dessa construção de identidade. Este site é o primeiro passo (MVP) rumo a um e-commerce completo futuro; o fluxo atual (catálogo → Google Forms) é deliberadamente transitório, não o modelo final.

## Operating Context

Usuário navega um catálogo pequeno como se estivesse em um e-commerce comum (visualizar produtos, escolher modelo). Não há conta de usuário nem carrinho persistente necessários nesta fase. Ao final da escolha, o usuário é encaminhado para um Google Forms externo para finalizar o pedido manualmente.

## Capabilities and Constraints

- Sem gateway de pagamento nesta versão — decisão explícita para o MVP.
- Fluxo de finalização: usuário escolhe produto(s) no site → é redirecionado para um Google Forms (externo) para concluir o pedido.
- Catálogo do primeiro drop: 3 modelos de camiseta + 1 modelo de ecobag. Categorias futuras já mencionadas pelo usuário (moletons, canecas) não fazem parte deste drop, mas indicam para onde o catálogo deve crescer.
- Projetado explicitamente como MVP a caminho de um e-commerce completo futuro — decisões de escopo/arquitetura não devem assumir que este fluxo (sem pagamento, com handoff para Forms) é permanente.
- Ainda não existem: fotos/artes dos produtos e o link do Google Forms. Até serem fornecidos, o site precisa de placeholders — não inventar essas evidências.

## Brand Commitments

LAMIT = Liga Acadêmica de Maratonas, Inovação e Tecnologia (liga acadêmica multidisciplinar da UCSAL). Identidade oficial já definida e fornecida pelo usuário em `assets/` — vinculante, não deve ser reinventada:

- Guia de marca completo: `assets/lamit-brand-skill/lamit-brand/SKILL.md` + `references/lamit-institucional.md` (posicionamento, tom de voz, identidade visual institucional) + `references/imersao-lamit.md` (guia do evento-âncora Imersão LAMIT, fora do escopo direto da loja mas útil como referência de voz/paleta).
- Arquivos de logo: `assets/01_LAMIT_HORIZONTAL.png`, `assets/02_LAMIT_VERTICAL.png`, `assets/03_LAMIT_ESCUDO.png`, `assets/lamitEscudoVazadoBranco.png`, `assets/lamitEscudoVazadoAzul.svg`.
- Posicionamento confirmado: "a LAMIT não vende eventos, cria experiências" — comunicação nunca corporativa/vendedora, sempre como alguém de dentro da comunidade.
- Trabalho visual futuro (new-work/DESIGN.md) deve consultar o guia de marca acima diretamente para paleta, tipografia e linguagem gráfica (estética scrapbook/editorial/artesanal) em vez de essas decisões serem re-derivadas aqui.

## Evidence on Hand

Assets de marca (logos + guia institucional completo) fornecidos em `assets/`, ver Brand Commitments. Ainda faltam: fotos/artes dos produtos (camisetas e ecobag do primeiro drop) e o link do Google Forms de pedido — até serem fornecidos, o site precisa de placeholders explícitos; não fabricar essas evidências.

## Product Principles

1. Escopo de MVP: navegação de catálogo apenas, sem integração de pagamento, checkout via handoff para Google Forms.
2. A experiência deve parecer um e-commerce real na navegação, mesmo sem backend transacional.
3. Prioridade de construção de marca — reforçar que a LAMIT é mais do que uma liga acadêmica.
4. Construído para crescer — este MVP é um degrau para um e-commerce completo futuro; evitar decisões que precisem ser descartadas depois.
5. Respeitar a identidade de marca oficial já existente da LAMIT (guia + logos em `assets/`) em vez de inventar uma nova.
