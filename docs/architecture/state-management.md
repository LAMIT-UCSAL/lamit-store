# State Management

**N/A — sem framework, sem gerenciamento de estado.**

O único "estado" da aplicação é qual página está sendo visualizada, resolvido nativamente pelo navegador (cada produto é uma página HTML própria). Estados de interface (hover, foco) são resolvidos inteiramente em CSS, sem necessidade de JavaScript pra rastrear estado. Se alguma interação futura precisar de estado real em JS, usar estado local simples por página — não introduzir uma biblioteca de state management.
