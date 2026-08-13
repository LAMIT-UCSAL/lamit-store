# Frontend Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|---|---|---|---|---|
| Framework | Nenhum (HTML/CSS/JS vanilla) | — | Estrutura das páginas | Decisão já confirmada — site pequeno, sem necessidade de reatividade complexa |
| UI Library | Nenhuma | — | — | N/A — componentes escritos à mão em HTML/CSS |
| State Management | N/A | — | — | Não há estado de aplicação; a única "navegação" é entre páginas HTML separadas |
| Routing | Navegação nativa do browser | — | Ir de página em página | Múltiplos arquivos HTML estáticos com `<a href>`, sem router client-side |
| Build Tool | Nenhum (opcional: Netlify CLI para preview local) | — | Deploy | Sem bundler necessário; arquivos servidos como estão |
| Styling | CSS puro com Custom Properties | — | Estilo e tokens de marca | Suficiente pro escopo; Tailwind/Sass seriam complexidade desnecessária pra 5 páginas |
| Testing | Validação manual (checklist) | — | Garantir qualidade antes do lançamento | Sem lógica de aplicação que justifique testes automatizados (conforme PRD) |
| Component Library | Nenhuma | — | — | N/A |
| Form Handling | N/A | — | — | Não há formulário no site — é externo (Google Forms) |
| Animation | CSS transitions/keyframes puros | — | As 3 animações definidas no front-end-spec | Leve o bastante pra não precisar de biblioteca (ex: GSAP) |
| Dev Tools | Netlify CLI (opcional) | — | Preview de deploy local | Alinhado à hospedagem já decidida |
