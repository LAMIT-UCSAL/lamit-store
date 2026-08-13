# Epic 1 Fundação & Catálogo

Este épico estabelece a fundação técnica do site (estrutura de projeto, pipeline de deploy no Netlify) e aplica a identidade visual oficial da LAMIT em um sistema de base reutilizável. A fatia de valor real entregue é a página de catálogo navegável e publicada com os 4 produtos do drop — já implantável e testável, mesmo antes das páginas de detalhe existirem.

## Story 1.1 Setup do Projeto e Pipeline de Deploy

Como mantenedor do projeto,
Eu quero ter a estrutura básica do site e um pipeline de deploy automático no Netlify configurados,
Para que qualquer mudança no repositório vá ao ar de forma confiável e seja possível validar progresso em produção desde o início.

**Acceptance Criteria**
1: Repositório contém a estrutura mínima de um site estático (HTML/CSS/JS) rodando localmente sem erros.
2: O projeto está conectado ao Netlify e cada push na branch principal gera um deploy automático.
3: Uma página inicial simples está acessível publicamente via URL do Netlify.

## Story 1.2 Sistema de Identidade Visual LAMIT

Como desenvolvedor do site,
Eu quero ter os tokens de marca da LAMIT (cores, tipografia, componentes visuais base) implementados de forma reutilizável,
Para que todas as páginas apliquem a identidade oficial de forma consistente, sem reinventar estilo página a página.

**Acceptance Criteria**
1: Paleta oficial (azul institucional `#0A69C4`, laranja `#E8722C`, navy `#0E1B27`, cream `#FBFAF8`) definida como variáveis CSS reutilizáveis.
2: Logo(s) da LAMIT (a partir de `assets/`) integrados e disponíveis para uso nas páginas.
3: Estilo base de tipografia e componentes (botões, cards) reflete a linguagem gráfica oficial (scrapbook/editorial/artesanal) do guia de marca.

## Story 1.3 Página de Catálogo com os 4 Produtos

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
