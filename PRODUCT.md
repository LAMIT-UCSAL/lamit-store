# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML/CSS/JS estático simples (sem framework) — escolha do usuário, priorizando o deploy mais simples possível para este MVP.

## Users

Público que acompanha a LAMIT (redes sociais, comunidade UCSAL) e visitantes que chegam ao site sem contexto prévio ("caíram de paraquedas"). Loja pública, não restrita a membros ou afiliados da UCSAL.

## Product Purpose

Vender produtos com a marca LAMIT (camisetas, moletons, ecobags, canecas e itens semelhantes) para fortalecer a identidade de marca da LAMIT. O site é um MVP focado na experiência de navegação do catálogo de produtos, como em um e-commerce real — sem checkout nativo integrado nesta primeira versão (pagamento via InfinitePay, fora do site). Primeiro drop: 3 modelos de camiseta + 1 modelo de ecobag + 1 modelo de caneca. Data-alvo de lançamento: 17/08.

## Positioning

A LAMIT quer ser reconhecida como muito mais do que "apenas uma liga acadêmica de maratonas, inovação e tecnologia" — a loja de produtos de marca é parte dessa construção de identidade. Este site é o primeiro passo (MVP) rumo a um e-commerce completo futuro; o fluxo atual (catálogo → Google Forms) é deliberadamente transitório, não o modelo final.

## Operating Context

Usuário navega um catálogo pequeno como se estivesse em um e-commerce comum (visualizar produtos, escolher modelo). Não há conta de usuário nem carrinho persistente necessários nesta fase. Ao final da escolha, o usuário é encaminhado para um Google Forms externo para finalizar o pedido manualmente.

## Capabilities and Constraints

- Sem checkout nativo/gateway de pagamento integrado ao site nesta versão — decisão explícita para o MVP. O pagamento acontece via **InfinitePay** (Pix ou link de cartão), fora do site; o cliente anexa o comprovante de pagamento no próprio Google Forms antes de enviar a resposta.
- Fluxo de finalização: usuário escolhe produto(s) no site → é redirecionado para um Google Forms (externo) → paga via InfinitePay → anexa o comprovante no Forms → envia o pedido.
- Modelo de produção: produtos feitos sob demanda. Os pedidos de cada modelo são repassados ao fornecedor quando o total agregado (soma de todos os compradores) atinge o mínimo do modelo (30 unidades para camisetas; 5 para ecobag e caneca), ou após 1 mês, com a quantidade então acumulada. Prazo de produção após o envio ao fornecedor: ~2 semanas para camisetas, ~1 semana para ecobag e caneca. Importante: o mínimo é sobre o total de pedidos do modelo, não uma exigência de compra individual — cada página de produto deve comunicar isso como nota informativa na descrição, não como aviso destacado.
- Catálogo do primeiro drop: 3 modelos de camiseta (Core, Legacy, Soterô) + 1 ecobag (Clube do Café Sem Pressa, que substituiu a LAMIT × Perolar em 2026-10-14) + 1 caneca (Na Minha Máquina Funciona, adicionada em 2026-10-14). Ecobag e caneca trazem o Pitch, a coruja maratonista mascote da LAMIT. Moletons continuam como categoria futura, fora deste drop.
- Data-alvo de lançamento: 17/08 — desejável, não rígida.
- Projetado explicitamente como MVP a caminho de um e-commerce completo futuro — decisões de escopo/arquitetura não devem assumir que este fluxo (sem checkout nativo, com handoff para Forms) é permanente.
- Fotos de todos os produtos do drop já fornecidas em `assets/products/` (camisetas, ecobags, canecas). Link do Google Forms: camisetas e ecobag têm link próprio; a caneca ainda usa provisoriamente o link da ecobag, enquanto o time decide o formato do pedido (2026-10-14). Não inventar links nem evidências.

## Brand Commitments

LAMIT = Liga Acadêmica de Maratonas, Inovação e Tecnologia (liga acadêmica multidisciplinar da UCSAL). Identidade oficial já definida e fornecida pelo usuário em `assets/` — vinculante, não deve ser reinventada:

- Guia de marca completo: `assets/lamit-brand-skill/lamit-brand/SKILL.md` + `references/lamit-institucional.md` (posicionamento, tom de voz, identidade visual institucional) + `references/imersao-lamit.md` (guia do evento-âncora Imersão LAMIT, fora do escopo direto da loja mas útil como referência de voz/paleta).
- Arquivos de logo: `assets/logos/01_LAMIT_HORIZONTAL.png`, `assets/logos/02_LAMIT_VERTICAL.png`, `assets/logos/03_LAMIT_ESCUDO.png`, `assets/logos/lamitEscudoVazadoBranco.png`, `assets/logos/lamitEscudoVazadoAzul.svg` (movidos pra subpasta na Story 1.2).
- Posicionamento confirmado: "a LAMIT não vende eventos, cria experiências" — comunicação nunca corporativa/vendedora, sempre como alguém de dentro da comunidade.
- **Atualização 2026-10-13 (decisão do usuário):** a linguagem visual da loja passa a seguir a do site principal da LAMIT (`lamit-site/DESIGN.md`, "The Hackathon Broadcast"), traduzida para tema claro ("Broadcast em papel"): paleta Cobalto `#0A3383` / Signal Blue `#164194` / Signal Orange `#E84B13` / Ouro `#D7C06B`, tipografia Montserrat (mantida do guia institucional), cantos suavizados e o gradiente Grainient como elemento assinatura (em faixas, nunca como fundo de página). Isso substitui a paleta do guia institucional (`#0A69C4`, `#E8722C`) e a estética scrapbook na loja. (A BB Manual Mono e os cantos retos do site foram testados e descartados pelo usuário em 2026-10-13.) Posicionamento e tom de voz do guia continuam valendo. Tokens em `css/tokens.css`; racional em `docs/audits/2026-10-13-design-alignment-audit.md`.

## Evidence on Hand

Assets de marca (logos + guia institucional completo) fornecidos em `assets/`, ver Brand Commitments. Fotos de todos os produtos do primeiro drop fornecidas em `assets/products/` (camisetas, ecobag Clube do Café, caneca). Pendente: link de pedido definitivo da caneca (em decisão pelo time). Não fabricar evidências.

## Product Principles

1. Escopo de MVP: navegação de catálogo apenas, sem checkout nativo integrado, checkout via handoff para Google Forms + pagamento InfinitePay.
2. A experiência deve parecer um e-commerce real na navegação, mesmo sem backend transacional.
3. Prioridade de construção de marca — reforçar que a LAMIT é mais do que uma liga acadêmica.
4. Construído para crescer — este MVP é um degrau para um e-commerce completo futuro; evitar decisões que precisem ser descartadas depois.
5. Respeitar a identidade de marca oficial já existente da LAMIT (guia + logos em `assets/`) em vez de inventar uma nova.
