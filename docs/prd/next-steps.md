# Next Steps

## UX Expert Prompt

Este PRD (`docs/prd.md`) e o Project Brief (`docs/brief.md`) fornecem o contexto completo para a **lamit-store**. Inicie a criação da especificação de UI/UX (`front-end-spec.md`), usando as metas de UI definidas na seção "User Interface Design Goals" como ponto de partida — valide as suposições marcadas antes de aprofundar (visão de UX geral, se "O que é a LAMIT" é bloco ou página separada, nível de acessibilidade).

## Architect Prompt

Este PRD (`docs/prd.md`) fornece o contexto técnico completo para a **lamit-store**. Inicie a criação da arquitetura front-end (`front-end-architecture.md`) a partir da seção "Technical Assumptions" — resolva as áreas em aberto: estrutura de dados do catálogo, link único vs. por produto no Google Forms, e configuração do pipeline de deploy no Netlify.

## User Actions (Tarefas Só-Humanas)

Adicionado pelo `@po` durante a validação de artefatos — nada aqui é tarefa de código; são ações que só a equipe LAMIT pode fazer, fora deste repositório:

- ~~Criar/acessar a conta Netlify e conectar o repositório do projeto~~ — feito (deploy automático confirmado na Story 1.1).
- **Google Forms:** link base já criado e confirmado ao vivo (`forms.gle/fXtUpnhuPxxZenYo7`, título "LAMIT STORE"), usado como placeholder em `data/products.json` desde a Story 2.3. A pergunta "Qual produto você quer comprar?" já existe no Forms, mas ainda só com uma opção placeholder — falta preencher as 4 opções reais e configurar a ramificação abaixo.

  **Estrutura completa a configurar** (com ramificação via "Ir para a seção baseado na resposta", já que Google Forms não tem exibição condicional de pergunta única):

  - **Seção 1 — Produto:** "Qual produto você quer comprar?" (múltipla escolha, obrigatória) — opções: `Camiseta Marrom Simples` / `Camiseta Brasão Preta` / `Camiseta Salvador` / `Ecobag LAMIT`. Ramificação: Marrom Simples → Seção 2; Brasão Preta → Seção 2; Salvador → Seção 3; Ecobag → Seção 4 (pula tamanho/cor).
  - **Seção 2 — Tamanho** (Marrom Simples / Brasão Preta): "Qual tamanho?" — P/M/G/GG → segue pra Seção 4.
  - **Seção 3 — Tamanho e Cor** (Salvador): "Qual tamanho?" — P/M/G/GG; "Qual cor?" — Azul/Dourada/Preta → segue pra Seção 4.
  - **Seção 4 — Seus dados** (comum a todos): Nome completo (texto curto, obrigatório); Telefone/WhatsApp (texto curto, obrigatório); Método de pagamento — Pix/Cartão (múltipla escolha, obrigatório); Comprovante de pagamento (upload de arquivo, obrigatório — **exige que o respondente esteja logado numa conta Google**).

  Depois de criar as 4 opções da Seção 1, gerar o link pré-preenchido de cada uma (menu ⋮ → "Obter link pré-preenchido", preenchendo só a pergunta de produto) e passar os 4 links pra atualizar `formsUrl` em `data/products.json` — sem mudança de código.
- Configurar a conta InfinitePay (Pix + link de cartão) e obter o link/QR code de pagamento a ser referenciado no fluxo do Forms.
- Fornecer, para substituir os placeholders em `data/products.json`: foto da ecobag, preços confirmados dos fornecedores.
- **Domínio:** decidido — lançamento no subdomínio padrão do Netlify (`lamitstore.netlify.app`); migração para domínio próprio fica para depois, sem retrabalho necessário na arquitetura atual.
