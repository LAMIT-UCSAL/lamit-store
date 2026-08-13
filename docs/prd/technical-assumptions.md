# Technical Assumptions

**Nota:** o preset padrão do AIOX (`nextjs-react`) não se aplica a este projeto — decisão de stack estática simples sem framework já confirmada.

## Repository Structure

Repositório único simples. Monorepo/Polyrepo não se aplicam — não há múltiplos pacotes/serviços a coordenar.

## Service Architecture

Site estático puro, sem arquitetura de serviço backend. Monolith/Microservices/Serverless não se aplicam plenamente.

## Testing Requirements

Validação manual multi-dispositivo/multi-navegador antes do lançamento (visual + funcional: cada CTA leva ao Forms certo), checagem de acessibilidade (WCAG AA) e validação de HTML. Não há lógica de aplicação/backend que justifique testes unitários ou pirâmide de teste completa.

## Additional Technical Assumptions and Requests

- Dados do catálogo (os 4 produtos) podem viver como dado estático simples referenciado pelas páginas (JSON ou constantes no próprio código) — decisão de implementação fina cabe ao `@architect`.
- Deploy no Netlify, presumivelmente via integração contínua com o repositório Git — a confirmar com `@devops`/`@architect`.
- O site precisa suportar placeholders explícitos para foto da ecobag, preço e link do Google Forms até esses ativos chegarem, sem travar o lançamento.
