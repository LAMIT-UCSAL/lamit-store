# Requirements

## Functional

1. **FR1:** O sistema deve exibir uma página de catálogo listando os 4 produtos do primeiro drop (3 camisetas + 1 ecobag).
2. **FR2:** Cada produto no catálogo deve ter uma página de detalhe própria, acessível a partir da listagem.
3. **FR3:** A página de detalhe de cada produto deve exibir fotos, descrição, tamanhos disponíveis e cores disponíveis.
4. **FR4:** A descrição de cada produto deve incluir, como informação adicional (não como aviso destacado), uma nota transparente sobre o modelo de produção: os pedidos daquele modelo são enviados ao fornecedor quando o total agregado de pedidos atinge 30 unidades (ou após 1 mês, com a quantidade então acumulada), com prazo de produção de ~2 semanas a partir do envio. A redação deve deixar claro que o limite de 30 é sobre o total de pedidos do modelo, não uma exigência de compra individual.
5. **FR5:** Cada produto deve ter um CTA "Pedir" que redireciona o usuário ao Google Forms externo correspondente.
6. **FR6:** O site deve aplicar a identidade visual oficial da LAMIT (logo, paleta, linguagem gráfica scrapbook/editorial) usando os assets fornecidos em `assets/`.
7. **FR7:** O site deve fornecer contexto mínimo sobre o que é a LAMIT, já que parte do público (visitante orgânico) não conhece a marca previamente.
8. **FR8:** O site deve exibir uma nota de privacidade curta e visível (ex: rodapé, presente em todas as páginas) informando que os dados fornecidos no Google Forms (nome, contato, comprovante de pagamento) são usados exclusivamente pela LAMIT para processar o pedido, sem compartilhamento com terceiros além do necessário para produção/entrega.

## Non Functional

1. **NFR1:** O site deve ser responsivo, com prioridade mobile-first.
2. **NFR2:** O site deve ser construído como HTML/CSS/JS estático, sem framework e sem backend.
3. **NFR3:** O site deve ser hospedado no Netlify.
4. **NFR4:** O carregamento deve ser rápido mesmo em conexão móvel mediana.
5. **NFR5:** O site não deve coletar nem armazenar dados sensíveis — dados de pedido e comprovante de pagamento ficam inteiramente no Google Forms, fora do site.
6. **NFR6:** O site deve suportar navegadores modernos (Chrome, Safari, mobile), sem necessidade de suporte a navegadores legados.
