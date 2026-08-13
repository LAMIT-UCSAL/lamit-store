# Next Steps

## UX Expert Prompt

Este PRD (`docs/prd.md`) e o Project Brief (`docs/brief.md`) fornecem o contexto completo para a **lamit-store**. Inicie a criação da especificação de UI/UX (`front-end-spec.md`), usando as metas de UI definidas na seção "User Interface Design Goals" como ponto de partida — valide as suposições marcadas antes de aprofundar (visão de UX geral, se "O que é a LAMIT" é bloco ou página separada, nível de acessibilidade).

## Architect Prompt

Este PRD (`docs/prd.md`) fornece o contexto técnico completo para a **lamit-store**. Inicie a criação da arquitetura front-end (`front-end-architecture.md`) a partir da seção "Technical Assumptions" — resolva as áreas em aberto: estrutura de dados do catálogo, link único vs. por produto no Google Forms, e configuração do pipeline de deploy no Netlify.

## User Actions (Tarefas Só-Humanas)

Adicionado pelo `@po` durante a validação de artefatos — nada aqui é tarefa de código; são ações que só a equipe LAMIT pode fazer, fora deste repositório:

- Criar/acessar a conta Netlify e conectar o repositório do projeto (habilita o deploy automático da Story 1.1).
- Criar o Google Forms de pedido, incluindo a pergunta "Qual produto você está pedindo?" com as 4 opções, e obter o `entry ID` dessa pergunta — necessário pra montar os links pré-preenchidos usados em `data/products.json` (ver decisão em `docs/ui-architecture.md`, seção API Integration).
- Configurar a conta InfinitePay (Pix + link de cartão) e obter o link/QR code de pagamento a ser referenciado no fluxo do Forms.
- Fornecer, para substituir os placeholders em `data/products.json`: foto da ecobag, preços confirmados dos fornecedores, link final do Google Forms.
- **Domínio:** decidido — lançamento no subdomínio padrão do Netlify (ex: `lamit-store.netlify.app`); migração para domínio próprio fica para depois, sem retrabalho necessário na arquitetura atual.
