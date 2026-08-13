# lamit-store Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Lançar o catálogo digital do primeiro drop LAMIT (3 camisetas + 1 ecobag) até 17/08.
- Reforçar a identidade de marca da LAMIT como algo além de "liga acadêmica de maratonas, inovação e tecnologia".
- Validar demanda por merchandising oficial sem investir em checkout nativo.
- Estabelecer uma base técnica reaproveitável para o e-commerce completo futuro da LAMIT.

### Background Context

A LAMIT não tem hoje nenhum canal próprio de e-commerce, e sua identidade de marca é mais rica do que a percepção comum de "liga acadêmica". Um primeiro drop de produtos (camisetas + ecobag) já está pronto para produção sob demanda, mas falta o canal digital pra apresentá-lo com a qualidade visual e a experiência de navegação que a marca merece — em vez de depender de uma plataforma genérica (Shopify, loja de Instagram) que não carrega a identidade visual oficial da liga.

O modelo de negócio desta primeira versão é deliberadamente simples: catálogo estático, sem checkout nativo — o pedido é finalizado via Google Forms, com pagamento via InfinitePay e comprovante anexado pelo próprio cliente. Isso permite lançar rápido sem esperar uma integração de pagamento madura, validando a demanda antes de investir mais.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-08-13 | 0.1 | PRD inicial criado a partir do Project Brief (`docs/brief.md`) | Morgan (@pm) |

## Requirements

### Functional

1. **FR1:** O sistema deve exibir uma página de catálogo listando os 4 produtos do primeiro drop (3 camisetas + 1 ecobag).
2. **FR2:** Cada produto no catálogo deve ter uma página de detalhe própria, acessível a partir da listagem.
3. **FR3:** A página de detalhe de cada produto deve exibir fotos, descrição, tamanhos disponíveis e cores disponíveis.
4. **FR4:** A descrição de cada produto deve incluir, como informação adicional (não como aviso destacado), uma nota transparente sobre o modelo de produção: os pedidos daquele modelo são enviados ao fornecedor quando o total agregado de pedidos atinge 30 unidades (ou após 1 mês, com a quantidade então acumulada), com prazo de produção de ~2 semanas a partir do envio. A redação deve deixar claro que o limite de 30 é sobre o total de pedidos do modelo, não uma exigência de compra individual.
5. **FR5:** Cada produto deve ter um CTA "Pedir" que redireciona o usuário ao Google Forms externo correspondente.
6. **FR6:** O site deve aplicar a identidade visual oficial da LAMIT (logo, paleta, linguagem gráfica scrapbook/editorial) usando os assets fornecidos em `assets/`.
7. **FR7:** O site deve fornecer contexto mínimo sobre o que é a LAMIT, já que parte do público (visitante orgânico) não conhece a marca previamente.
8. **FR8:** O site deve exibir uma nota de privacidade curta e visível (ex: rodapé, presente em todas as páginas) informando que os dados fornecidos no Google Forms (nome, contato, comprovante de pagamento) são usados exclusivamente pela LAMIT para processar o pedido, sem compartilhamento com terceiros além do necessário para produção/entrega.

### Non Functional

1. **NFR1:** O site deve ser responsivo, com prioridade mobile-first.
2. **NFR2:** O site deve ser construído como HTML/CSS/JS estático, sem framework e sem backend.
3. **NFR3:** O site deve ser hospedado no Netlify.
4. **NFR4:** O carregamento deve ser rápido mesmo em conexão móvel mediana.
5. **NFR5:** O site não deve coletar nem armazenar dados sensíveis — dados de pedido e comprovante de pagamento ficam inteiramente no Google Forms, fora do site.
6. **NFR6:** O site deve suportar navegadores modernos (Chrome, Safari, mobile), sem necessidade de suporte a navegadores legados.

## User Interface Design Goals

### Overall UX Vision

Navegação de catálogo que passa confiança de e-commerce real desde o primeiro clique — grid de produtos com fotos em destaque, cada produto levando a uma página de detalhe rica antes do redirecionamento externo. Prioridade: quem nunca ouviu falar da LAMIT entende a marca e o produto em poucos segundos de rolagem. *(suposição, a validar)*

### Key Interaction Paradigms

Navegação simples de listagem → detalhe → CTA externo, sem estados complexos (sem login, sem carrinho, sem filtros — catálogo pequeno não precisa).

### Core Screens and Views

- Página de Catálogo (grid dos 4 produtos)
- Página de Detalhe de Produto (×4 instâncias)
- Seção/bloco "O que é a LAMIT" (contexto mínimo de marca, conforme FR7) *(suposição de que é um bloco na própria home, não uma página separada)*

### Accessibility: WCAG AA

*(suposição — não discutido explicitamente; piso razoável para um site público)*

### Branding

Identidade visual oficial da LAMIT — paleta azul institucional (`#0A69C4`) + laranja (`#E8722C`), navy quase preto para texto (`#0E1B27`), linguagem gráfica scrapbook/colagem/editorial/artesanal (papel rasgado, fita adesiva, rabiscos, recortes com contorno branco), conforme `assets/lamit-brand-skill/lamit-brand/references/lamit-institucional.md`. Vinculante.

### Target Device and Platforms: Web Responsive

Mobile-first, conforme NFR1.

## Technical Assumptions

**Nota:** o preset padrão do AIOX (`nextjs-react`) não se aplica a este projeto — decisão de stack estática simples sem framework já confirmada.

### Repository Structure

Repositório único simples. Monorepo/Polyrepo não se aplicam — não há múltiplos pacotes/serviços a coordenar.

### Service Architecture

Site estático puro, sem arquitetura de serviço backend. Monolith/Microservices/Serverless não se aplicam plenamente.

### Testing Requirements

Validação manual multi-dispositivo/multi-navegador antes do lançamento (visual + funcional: cada CTA leva ao Forms certo), checagem de acessibilidade (WCAG AA) e validação de HTML. Não há lógica de aplicação/backend que justifique testes unitários ou pirâmide de teste completa.

### Additional Technical Assumptions and Requests

- Dados do catálogo (os 4 produtos) podem viver como dado estático simples referenciado pelas páginas (JSON ou constantes no próprio código) — decisão de implementação fina cabe ao `@architect`.
- Deploy no Netlify, presumivelmente via integração contínua com o repositório Git — a confirmar com `@devops`/`@architect`.
- O site precisa suportar placeholders explícitos para foto da ecobag, preço e link do Google Forms até esses ativos chegarem, sem travar o lançamento.

## Epic List

1. **Epic 1: Fundação & Catálogo** — Estabelecer a base do projeto (estrutura de repositório, deploy no Netlify, sistema de identidade visual LAMIT aplicado) e entregar a página de catálogo funcional com os 4 produtos do drop.
2. **Epic 2: Páginas de Produto & Encaminhamento de Pedido** — Entregar as páginas de detalhe de cada produto (fotos, variações, nota de prazo de entrega) com o CTA que fecha o fluxo levando ao Google Forms, completando a jornada de compra do MVP.

## Epic 1 Fundação & Catálogo

Este épico estabelece a fundação técnica do site (estrutura de projeto, pipeline de deploy no Netlify) e aplica a identidade visual oficial da LAMIT em um sistema de base reutilizável. A fatia de valor real entregue é a página de catálogo navegável e publicada com os 4 produtos do drop — já implantável e testável, mesmo antes das páginas de detalhe existirem.

### Story 1.1 Setup do Projeto e Pipeline de Deploy

Como mantenedor do projeto,
Eu quero ter a estrutura básica do site e um pipeline de deploy automático no Netlify configurados,
Para que qualquer mudança no repositório vá ao ar de forma confiável e seja possível validar progresso em produção desde o início.

**Acceptance Criteria**
1: Repositório contém a estrutura mínima de um site estático (HTML/CSS/JS) rodando localmente sem erros.
2: O projeto está conectado ao Netlify e cada push na branch principal gera um deploy automático.
3: Uma página inicial simples está acessível publicamente via URL do Netlify.

### Story 1.2 Sistema de Identidade Visual LAMIT

Como desenvolvedor do site,
Eu quero ter os tokens de marca da LAMIT (cores, tipografia, componentes visuais base) implementados de forma reutilizável,
Para que todas as páginas apliquem a identidade oficial de forma consistente, sem reinventar estilo página a página.

**Acceptance Criteria**
1: Paleta oficial (azul institucional `#0A69C4`, laranja `#E8722C`, navy `#0E1B27`, cream `#FBFAF8`) definida como variáveis CSS reutilizáveis.
2: Logo(s) da LAMIT (a partir de `assets/`) integrados e disponíveis para uso nas páginas.
3: Estilo base de tipografia e componentes (botões, cards) reflete a linguagem gráfica oficial (scrapbook/editorial/artesanal) do guia de marca.

### Story 1.3 Página de Catálogo com os 4 Produtos

Como visitante do site,
Eu quero ver uma página de catálogo com os 4 produtos do primeiro drop,
Para que eu possa navegar rapidamente pelo que está disponível para compra.

**Acceptance Criteria**
1: A página exibe os 4 produtos (3 camisetas + 1 ecobag) em grid, com foto, nome e categoria de cada um.
2: A página inclui um bloco de contexto mínimo sobre o que é a LAMIT (FR7).
3: A página é responsiva e funcional em mobile e desktop.
4: Produtos sem foto final (ex: ecobag) exibem um placeholder claro em vez de imagem quebrada ou ausente.
5: Cada produto no grid é clicável — o destino final (página de detalhe) é completado no Epic 2; nesta story o link pode apontar para um destino temporário.
6: A página inclui, em um rodapé reutilizável por todo o site, uma nota de privacidade curta sobre o uso dos dados coletados no Google Forms (FR8).
7: `data/products.json` é criado com os dados dos 4 produtos (nome, categoria, tamanhos, cores, nota de prazo, link do Forms), usando placeholders explícitos onde o dado real ainda não existir (preço, foto da ecobag, link do Forms) — é a fonte que a página de catálogo (AC1) e as páginas de produto (Epic 2) consomem.

## Epic 2 Páginas de Produto & Encaminhamento de Pedido

Este épico entrega as páginas de detalhe individuais para os 4 produtos (fotos, variações, nota de prazo de entrega) e conecta o CTA "Pedir" ao Google Forms correto, completando a jornada de compra do MVP — do catálogo até o encaminhamento do pedido.

### Story 2.1 Página de Detalhe de Produto

Como visitante do site,
Eu quero ver uma página de detalhe completa ao clicar em um produto do catálogo,
Para que eu possa conhecer fotos, descrição, tamanhos e cores antes de decidir comprar.

**Acceptance Criteria**
1: Cada um dos 4 produtos tem sua própria página de detalhe, acessível a partir do card correspondente no catálogo (FR2).
2: A página exibe fotos do produto (ou placeholder claro se ainda não disponível — caso da ecobag), descrição, tamanhos e cores disponíveis (FR3).
3: A página segue a identidade visual definida na Story 1.2.
4: A página é responsiva em mobile e desktop.

### Story 2.2 Nota de Prazo de Entrega por Produto

Como visitante interessado em comprar,
Eu quero entender, na própria página do produto, como funciona o prazo de entrega,
Para que eu tome uma decisão de compra informada, sem surpresas sobre o tempo de espera.

**Acceptance Criteria**
1: Cada página de produto inclui, na descrição, uma nota informativa (não destacada como alerta) sobre o modelo de produção sob demanda (FR4).
2: O texto deixa claro que o limite de 30 unidades é agregado por modelo (soma de todos os compradores), não uma exigência de compra individual.
3: O texto menciona a janela de até 1 mês para atingir o limite e o prazo de produção de ~2 semanas após o envio ao fornecedor.

### Story 2.3 CTA "Pedir" com Redirecionamento ao Google Forms

Como visitante decidido a comprar,
Eu quero clicar em um botão "Pedir" e ser levado diretamente ao formulário de pedido correto,
Para que eu consiga finalizar minha compra sem confusão sobre qual produto estou pedindo.

**Acceptance Criteria**
1: Cada página de produto tem um CTA "Pedir" visível (FR5).
2: O CTA redireciona para o link do Google Forms configurado para aquele pedido.
3: Se o link do Forms ainda não estiver disponível no momento do desenvolvimento, o CTA usa um valor placeholder fácil de atualizar sem exigir mudanças estruturais de código.
4: O comportamento do CTA é testado manualmente em pelo menos um navegador mobile e um desktop antes do lançamento.

## Checklist Results Report

### Resumo Executivo

- **Completude do PRD:** ~75%
- **Adequação do escopo MVP:** Just Right — escopo enxuto e bem delimitado; nenhum corte óbvio necessário (a nota de prazo de entrega é branding/confiança-crítica e não deve ser cortada mesmo sob pressão de prazo).
- **Prontidão para fase de arquitetura:** READY FOR ARCHITECT — nenhum item bloqueia o início; os gaps identificados são refináveis em paralelo.
- **Gaps mais críticos:** nota de privacidade/LGPD resolvida nesta sessão (ver FR8); resta ausência de mecanismo de analytics para medir os KPIs já definidos.

### Category Statuses

| Category | Status | Critical Issues |
|---|---|---|
| 1. Problem Definition & Context | PARTIAL | Metas de sucesso sem números-alvo confirmados; pesquisa formal de usuário/mercado ausente (proporcional ao porte do projeto) |
| 2. MVP Scope Definition | PARTIAL | Mecanismo de feedback/validação do MVP (analytics) não definido |
| 3. User Experience Requirements | PARTIAL | Estados de erro para link externo quebrado (Forms fora do ar, por exemplo) não especificados |
| 4. Functional Requirements | PASS | — |
| 5. Non-Functional Requirements | PARTIAL | Nota de privacidade resolvida (FR8); resta performance não quantificada numericamente |
| 6. Epic & Story Structure | PASS | — |
| 7. Technical Guidance | PARTIAL | Monitoramento/analytics pós-lançamento não definido |
| 8. Cross-Functional Requirements | PARTIAL | Suporte pós-lançamento (quem corrige links quebrados, etc.) não documentado |
| 9. Clarity & Communication | PASS | — |

### Critical Deficiencies

Nenhum item classificado como BLOCKER. Itens HIGH/MEDIUM abaixo.

### Top Issues by Priority

**BLOCKERS:** nenhum.

**HIGH (resolvido nesta sessão):**
- ~~Não há nota de privacidade/LGPD para os dados pessoais coletados via Google Forms~~ — resolvido: **FR8** adicionado (nota de privacidade no rodapé, todas as páginas) e refletido como AC6 da Story 1.3. *Ressalva: é uma nota mínima informativa, não substitui uma política de privacidade formal revisada por alguém com conhecimento jurídico, caso a LAMIT queira algo mais robusto no futuro.*

**MEDIUM:**
- Sem ferramenta de analytics definida — impede medir os KPIs já estabelecidos (taxa de clique catálogo→Forms, taxa de rejeição).
- Sem plano de suporte pós-lançamento (quem corrige um link quebrado ou atualiza preço/link do Forms depois do deploy).

**LOW:**
- Performance não quantificada numericamente (ex: tempo de carregamento alvo) — risco baixo dado que é site estático simples.
- Ausência de pesquisa formal de usuário/mercado — proporcional ao porte do projeto, não crítico para este MVP.

### MVP Scope Assessment

- **Features que poderiam ser cortadas:** nenhuma identificada — o escopo já é o mínimo necessário.
- **Features essenciais faltando:** nenhuma para o MVP definido; a nota de privacidade (acima) é a única adição recomendada antes do lançamento público.
- **Preocupações de complexidade:** baixas — projeto tecnicamente simples por design.
- **Realismo do timeline:** 17/08 é apertado mas tratado como alvo flexível, não rígido, por decisão do usuário.

### Technical Readiness

- **Clareza dos constraints técnicos:** alta — stack, hospedagem e não-requisitos (sem backend, sem framework) estão bem documentados.
- **Riscos técnicos identificados:** baixos, dada a simplicidade do site; o maior risco é de conteúdo/confiança (comunicação do prazo de entrega), não técnico.
- **Áreas que precisam de investigação do architect:** estrutura de dados do catálogo (JSON vs. constantes), decisão entre um link único de Forms ou um por produto, configuração específica do pipeline de deploy no Netlify.

### Recommendations

1. Adicionar uma nota de privacidade simples (mesmo que curta) sobre os dados coletados no Google Forms, antes do lançamento público.
2. Considerar uma ferramenta de analytics leve (ex: Netlify Analytics, Plausible) como ação de baixo custo para viabilizar os KPIs já definidos — não bloqueia o lançamento, mas deveria entrar antes ou logo após.
3. Definir informalmente quem é responsável por manutenção pós-lançamento (atualizar preço, link do Forms, corrigir links quebrados).

### Final Decision

**READY FOR ARCHITECT** — o PRD e os épicos estão suficientemente completos e estruturados para a fase de arquitetura. Os gaps identificados (privacidade — resolvido via FR8, analytics, suporte pós-lançamento) são recomendações de qualidade, não bloqueios.

## Next Steps

### UX Expert Prompt

Este PRD (`docs/prd.md`) e o Project Brief (`docs/brief.md`) fornecem o contexto completo para a **lamit-store**. Inicie a criação da especificação de UI/UX (`front-end-spec.md`), usando as metas de UI definidas na seção "User Interface Design Goals" como ponto de partida — valide as suposições marcadas antes de aprofundar (visão de UX geral, se "O que é a LAMIT" é bloco ou página separada, nível de acessibilidade).

### Architect Prompt

Este PRD (`docs/prd.md`) fornece o contexto técnico completo para a **lamit-store**. Inicie a criação da arquitetura front-end (`front-end-architecture.md`) a partir da seção "Technical Assumptions" — resolva as áreas em aberto: estrutura de dados do catálogo, link único vs. por produto no Google Forms, e configuração do pipeline de deploy no Netlify.

### User Actions (Tarefas Só-Humanas)

Adicionado pelo `@po` durante a validação de artefatos — nada aqui é tarefa de código; são ações que só a equipe LAMIT pode fazer, fora deste repositório:

- Criar/acessar a conta Netlify e conectar o repositório do projeto (habilita o deploy automático da Story 1.1).
- Criar o Google Forms de pedido, incluindo a pergunta "Qual produto você está pedindo?" com as 4 opções, e obter o `entry ID` dessa pergunta — necessário pra montar os links pré-preenchidos usados em `data/products.json` (ver decisão em `docs/ui-architecture.md`, seção API Integration).
- Configurar a conta InfinitePay (Pix + link de cartão) e obter o link/QR code de pagamento a ser referenciado no fluxo do Forms.
- Fornecer, para substituir os placeholders em `data/products.json`: foto da ecobag, preços confirmados dos fornecedores, link final do Google Forms.
- **Domínio:** decidido — lançamento no subdomínio padrão do Netlify (`lamitstore.netlify.app`); migração para domínio próprio fica para depois, sem retrabalho necessário na arquitetura atual.
