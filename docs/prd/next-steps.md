# Next Steps

## UX Expert Prompt

Este PRD (`docs/prd.md`) e o Project Brief (`docs/brief.md`) fornecem o contexto completo para a **lamit-store**. Inicie a criação da especificação de UI/UX (`front-end-spec.md`), usando as metas de UI definidas na seção "User Interface Design Goals" como ponto de partida — valide as suposições marcadas antes de aprofundar (visão de UX geral, se "O que é a LAMIT" é bloco ou página separada, nível de acessibilidade).

## Architect Prompt

Este PRD (`docs/prd.md`) fornece o contexto técnico completo para a **lamit-store**. Inicie a criação da arquitetura front-end (`front-end-architecture.md`) a partir da seção "Technical Assumptions" — resolva as áreas em aberto: estrutura de dados do catálogo, link único vs. por produto no Google Forms, e configuração do pipeline de deploy no Netlify.

## User Actions (Tarefas Só-Humanas)

Adicionado pelo `@po` durante a validação de artefatos — nada aqui é tarefa de código; são ações que só a equipe LAMIT pode fazer, fora deste repositório:

- ~~Criar/acessar a conta Netlify e conectar o repositório do projeto~~ — feito (deploy automático confirmado na Story 1.1).
- ~~Configurar o Google Forms (seções, ramificação, links pré-preenchidos)~~ — feito. Forms "LAMIT STORE" configurado com as 4 seções e ramificação por produto (estrutura ainda documentada abaixo como referência); os 4 `formsUrl` em `data/products.json` usam os links pré-preenchidos reais (Story 2.3, confirmado funcionando pelo usuário em teste manual real).

  <details>
  <summary>Estrutura configurada (referência)</summary>

  - **Seção 1 — Produto:** "Qual produto você quer comprar?" — `Camiseta Marrom Simples` / `Camiseta Brasão Preta` / `Camiseta Estampa Salvador` / `Ecobag LAMIT`. Ramificação: Marrom Simples → Seção 2; Brasão Preta → Seção 2; Salvador → Seção 3; Ecobag → Seção 4.
  - **Seção 2 — Tamanho** (Marrom Simples / Brasão Preta): P/M/G/GG → Seção 4.
  - **Seção 3 — Tamanho e Cor** (Salvador): P/M/G/GG + Azul/Dourada/Preta → Seção 4.
  - **Seção 4 — Seus dados:** Nome completo; Telefone/WhatsApp; Método de pagamento (Pix/Cartão); Comprovante de pagamento (upload — exige login Google).
  </details>
- **Pendente:** configurar a conta InfinitePay (Pix + link de cartão) e obter o link/QR code de pagamento a ser referenciado no fluxo do Forms.
- **Pendente:** fornecer, para substituir os placeholders em `data/products.json`: foto da ecobag, preços confirmados dos fornecedores.
- **Domínio:** decidido — lançamento no subdomínio padrão do Netlify (`lamitstore.netlify.app`); migração para domínio próprio fica para depois, sem retrabalho necessário na arquitetura atual.
