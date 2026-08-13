# Project Brief: lamit-store

## Resumo Executivo

A **lamit-store** é a loja online oficial de produtos com a marca LAMIT (Liga Acadêmica de Maratonas, Inovação e Tecnologia, UCSAL) — um catálogo digital onde qualquer visitante pode navegar e escolher itens do primeiro drop de merchandising: 3 modelos de camiseta e 1 modelo de ecobag. O problema que resolve: a LAMIT hoje é vista principalmente como "uma liga acadêmica de maratonas, inovação e tecnologia", e não tem nenhum canal próprio de e-commerce que reforce sua identidade de marca perante seu público. O mercado-alvo é o público que já acompanha a LAMIT nas redes e qualquer visitante que chegue ao site sem contexto prévio. A proposta de valor: uma experiência de navegação de catálogo com o polimento de um e-commerce real, mesmo sem checkout transacional integrado nesta primeira versão — o pedido é finalizado via Google Forms, com pagamento via InfinitePay.

## Declaração do Problema

Hoje a LAMIT é percebida, principalmente, como "apenas uma liga acadêmica de maratonas, inovação e tecnologia" — uma leitura mais estreita do que sua identidade de marca real (uma comunidade que cria experiências de inovação, não só eventos acadêmicos). Isso limita o quanto a marca se fixa na mente do público além do contexto pontual de cada evento.

A liga não tem, hoje, nenhum canal próprio onde essa identidade de marca possa ser vivida fora de um evento específico — não existe uma vitrine digital de produtos LAMIT que reforce pertencimento e sirva como ponto de contato contínuo com quem já segue a liga ou chega até ela por acaso. Usar uma plataforma genérica (Shopify, loja de Instagram) resolveria a venda, mas não constrói a base própria que a LAMIT quer ter no médio prazo, rumo a um e-commerce completo.

A urgência concreta: já existe um primeiro drop pronto para lançar (3 camisetas + 1 ecobag), com data-alvo de lançamento em 17/08 — o produto está pronto antes do canal para vendê-lo.

## Solução Proposta

A solução é um site catálogo enxuto, construído em HTML/CSS/JS estático, que apresenta o drop de produtos LAMIT com a fidelidade visual e a experiência de navegação de um e-commerce real — sem carregar a complexidade de carrinho persistente ou conta de usuário. Ao escolher um produto, o visitante é direcionado a um Google Forms para concluir o pedido, anexando o comprovante de pagamento feito via InfinitePay (Pix ou link de cartão).

O diferencial não está na tecnologia (é deliberadamente simples), mas em ser **verdadeiramente a marca LAMIT** — usando a identidade visual oficial já definida (paleta azul institucional/laranja, linguagem gráfica de scrapbook/colagem/artesanal, tom de voz "de dentro da comunidade") em vez de um template genérico de loja. Isso é o que um Shopify ou uma loja de Instagram não entregariam por padrão.

A solução tem sucesso porque remove o maior gargalo (montar checkout integrado) do caminho crítico: o drop já está pronto, e o site pode ir ao ar assim que os dados finais chegarem, sem esperar uma integração de pagamento nativa amadurecer. A visão de longo prazo é que este site seja o **primeiro degrau** de um e-commerce completo da LAMIT — cada decisão de estrutura deve deixar espaço pra evoluir (mais categorias, checkout nativo, carrinho) sem precisar ser refeita do zero.

## Usuários-Alvo

### Segmento Primário: Comunidade e seguidores da LAMIT

Jovens de 18–30 anos, majoritariamente universitários (não exclusivamente UCSAL) interessados em tecnologia, inovação e empreendedorismo — pessoas que já seguem a LAMIT nas redes sociais, participaram de algum evento (Imersão, LAMITalks, hackathons) ou conhecem a liga de algum jeito. Comportamento atual: consomem conteúdo da LAMIT no Instagram, mas não têm hoje nenhum canal pra "levar a marca com eles" fisicamente. Necessidade: uma forma tangível de mostrar afiliação e pertencimento à comunidade. Objetivo ao chegar no site: ver rápido o que tem no drop e decidir se compra.

### Segmento Secundário: Visitante orgânico sem contexto prévio

Pessoas que chegam ao site sem saber o que é a LAMIT — via link compartilhado, busca, curiosidade. Comportamento atual: não têm afinidade prévia com a marca. Necessidade: entender rapidamente o que é a LAMIT e se os produtos valem a compra, sem depender de conhecimento prévio da liga. Objetivo: ou comprar por impulso (se o design agradar), ou pelo menos sair sabendo o que é a LAMIT.

## Metas e Métricas de Sucesso

### Objetivos de Negócio

- Lançar o site do primeiro drop a tempo da data-alvo (17/08), sem depender de checkout nativo.
- Gerar um fluxo mensurável de pedidos via Google Forms + InfinitePay a partir do catálogo durante a janela do drop.
- Deixar uma base técnica e de conteúdo reaproveitável para o e-commerce completo futuro, em vez de algo descartável.

### Métricas de Sucesso do Usuário

- O visitante entende em poucos segundos que é a loja oficial de produtos LAMIT e o que está disponível no drop.
- O visitante vê claramente tamanhos, cores e prazo de entrega por produto antes de ser redirecionado ao Forms.
- Quem decide comprar completa o redirecionamento pro Forms, pagamento via InfinitePay e anexo do comprovante sem confusão sobre qual produto/variação está pedindo.

### KPIs (Indicadores-Chave)

- **Taxa de clique catálogo → Forms:** % de visitantes que clicam em "Pedir" em pelo menos um produto.
- **Pedidos completos no Forms:** volume de respostas recebidas durante a janela do drop.
- **Taxa de rejeição da página:** só mensurável se/quando algum analytics for adicionado (não faz parte do escopo técnico atual).

_(Metas propostas para acompanhamento — não há números-alvo confirmados pelo usuário até o momento deste brief.)_

## Escopo do MVP

### Funcionalidades Core (Obrigatórias)

- **Página de catálogo:** lista os 4 produtos do primeiro drop (3 camisetas + 1 ecobag) em formato de grid, como um e-commerce.
- **Página de detalhe por produto:** fotos, descrição, e as opções de tamanho/cor disponíveis (informativo — a escolha real acontece no Forms).
- **Nota de prazo de entrega por produto:** cada página de produto inclui, como informação adicional na descrição (não como aviso destacado), uma nota transparente explicando que os pedidos daquele modelo são enviados ao fornecedor quando o total agregado de pedidos atinge 30 unidades (ou após 1 mês, com a quantidade então acumulada) — deixando claro que o limite é sobre o total de pedidos do modelo, não uma exigência de compra individual — com prazo de produção de ~2 semanas a partir do envio.
- **CTA "Pedir" por produto:** leva ao Google Forms externo, onde o cliente escolhe tamanho/cor, paga via InfinitePay e anexa o comprovante antes de enviar.
- **Identidade visual LAMIT aplicada:** logo, paleta institucional e linguagem gráfica oficial (scrapbook/colagem/editorial) usando os assets já fornecidos em `assets/`.
- **Responsivo (mobile-first):** grande parte do tráfego deve vir de redes sociais via celular.

### Fora de Escopo para o MVP

- Checkout nativo / gateway de pagamento integrado ao site (pagamento acontece via InfinitePay, fora do site)
- Conta de usuário / login
- Carrinho de compras persistente
- Seleção de tamanho/cor *dentro* do site (fica a cargo do próprio Forms)
- Exibição de preço (ainda pendente de fornecedores)
- Categorias além do primeiro drop (moletons, canecas ficam para drops futuros)

### Critérios de Sucesso do MVP

O site está publicado, navegável, com os 4 produtos do drop corretamente representados (fotos, tamanhos, cores, prazo de entrega) e cada um leva, sem erro, ao Google Forms certo para fechar o pedido e o pagamento.

## Visão Pós-MVP

### Funcionalidades da Fase 2

- Exibição de preço e, possivelmente, checkout nativo (Pix/cartão via InfinitePay integrado) substituindo o handoff manual pro Forms.
- Expansão do catálogo: moletons, canecas e novos drops sazonais além do primeiro.
- Um jeito mais simples de atualizar o catálogo (sem precisar editar HTML diretamente a cada novo produto).

### Visão de Longo Prazo (1–2 anos)

A lamit-store se torna o e-commerce completo da LAMIT — com carrinho, checkout integrado, controle de estoque e histórico de pedidos — mas mantendo a identidade de marca (não só a função de venda) como o que a diferencia de uma loja genérica.

### Oportunidades de Expansão

- Produtos exclusivos por evento (ex: edição limitada pra Imersão LAMIT).
- Parcerias com fornecedores locais pra produção sob demanda, reduzindo risco de estoque parado.
- A loja como canal de relacionamento com ex-membros/alumni da liga, não só quem está na liga hoje.

## Considerações Técnicas

### Requisitos de Plataforma

- Web, responsivo, mobile-first (a maior parte do tráfego deve vir de redes sociais via celular).
- Suporte a navegadores modernos (Chrome, Safari, navegadores mobile) — não é necessário suportar navegadores antigos dado o público jovem.
- Performance: carregamento rápido mesmo em conexão móvel mediana — site estático favorece isso por natureza.

### Preferências de Tecnologia

- **Frontend:** HTML/CSS/JS puro, sem framework.
- **Backend:** nenhum — não há necessidade de servidor de aplicação nesta fase.
- **Banco de dados:** nenhum — o catálogo (4 produtos) pode viver como dado estático no próprio código.
- **Hosting/Infraestrutura:** Netlify.

### Considerações de Arquitetura

- **Estrutura de repositório:** repositório único simples, sem necessidade de monorepo.
- **Arquitetura de serviço:** nenhum serviço próprio além do site estático; integrações externas são o Google Forms e o InfinitePay (fora do site).
- **Requisitos de integração:** link do Google Forms (ainda pendente) e link de pagamento InfinitePay.
- **Segurança/Compliance:** o site em si não coleta dados sensíveis — a coleta de dados do pedido e comprovante de pagamento acontece inteiramente dentro do Google Forms, fora do escopo técnico do site.

## Restrições e Premissas

### Restrições

- **Orçamento:** não informado — a decisão por stack estática simples e sem checkout nativo já reduz custo de infraestrutura ao mínimo (hosting no Netlify).
- **Prazo:** data-alvo de lançamento é 17/08 (não rígida, mas desejável).
- **Recursos:** não informado quantas pessoas trabalham no projeto além do usuário.
- **Técnico:** sem framework, sem backend, sem checkout nativo nesta fase — restrições deliberadas, não limitações de capacidade.
- **Modelo de produção:** os produtos são feitos sob demanda, com quantidade mínima de 30 unidades por modelo para serem repassadas ao fornecedor. Se o mínimo não for atingido em até 1 mês, o pedido segue com a quantidade real solicitada. Prazo de produção após o fornecedor receber os pedidos: ~2 semanas.

### Premissas-Chave

- A identidade de marca oficial da LAMIT (assets em `assets/`) é fixa e não deve ser reinventada.
- Fotos dos 3 modelos de camiseta já foram fornecidas (`assets/products/camisetas/`); falta a foto da ecobag e o link do Google Forms — o site precisa de placeholders até lá.
- Preço dos produtos ainda depende de resposta dos fornecedores.
- O público não pode ser assumido como já conhecendo a LAMIT — o site precisa contextualizar a marca minimamente.
- Transparência é um valor explícito: o site deve deixar claro, produto a produto, que a produção é sob demanda e que o prazo de entrega varia conforme o pedido mínimo de 30 unidades ser atingido — sem prometer prazo fixo que não pode ser cumprido.
- Pagamento acontece via InfinitePay (Pix ou link de cartão), fora do site; o comprovante é anexado pelo cliente no próprio Google Forms antes de enviar a resposta.

## Riscos e Questões Abertas

### Riscos Principais

- **Confiança do público com prazo variável:** alguém que compra no fim da janela de pedidos (até 1 mês) mais o prazo de produção (~2 semanas) pode esperar até ~6 semanas. Isso precisa estar muito claro na página de produto para não virar reclamação.
- **Comprovante de pagamento fora do fluxo nativo do Forms:** depende do cliente lembrar de anexar o comprovante antes de enviar — risco de pedidos incompletos ou sem pagamento comprovado.
- **Lançamento sem preço definido:** o catálogo pode precisar ir ao ar sem preço visível se os fornecedores demorarem.
- **Fluxo manual via Google Forms:** sem integração automática, pedidos podem se perder ou ter erro de leitura conforme o volume cresce.
- **Prazo do projeto:** a data-alvo (17/08) é próxima; tratada como desejável, não rígida, por decisão do usuário.

### Questões em Aberto

- Nenhuma questão crítica em aberto no momento — as principais (prazo de produção, comportamento abaixo do MOQ, data-alvo, forma de pagamento) foram resolvidas nesta sessão.

### Áreas que Precisam de Mais Pesquisa

- Como outras ligas/coletivos estudantis brasileiros comunicam prazo de produção sob demanda com transparência, sem soar como risco pro comprador.
- Melhor prática de copy para "sujeito a mínimo de pedidos" sem espantar quem está decidindo comprar.

## Próximos Passos

### Ações Imediatas

1. Salvar este Project Brief em `docs/brief.md` (concluído).
2. Obter os dados ainda pendentes antes do lançamento: link do Google Forms, foto da ecobag, preços confirmados pelos fornecedores.
3. Atualizar o `PRODUCT.md` com a correção sobre pagamento (InfinitePay + comprovante anexado ao Forms, não "sem pagamento") e com a nova pasta de assets de produto.
4. Handoff para `@pm` criar o PRD formal a partir deste brief.
5. Seguir a cadeia do workflow `greenfield-ui`: `@ux-design-expert` (spec de UX) → `@architect` (arquitetura front-end) → `@po` (validação) → ciclo de stories.

### Handoff para o PM

Este Project Brief fornece o contexto completo para a **lamit-store**. Inicie em modo de geração de PRD, revise o brief cuidadosamente e trabalhe com o usuário para criar o PRD seção por seção conforme o template indica, pedindo esclarecimentos ou sugerindo melhorias quando necessário.
