# Testing Requirements

Sem testes automatizados (nenhum framework de teste faz sentido pra HTML/CSS estático sem lógica de aplicação). O requisito é uma checklist de validação manual antes do lançamento:

## Checklist de Validação Manual

- [ ] Cada um dos 4 produtos abre a página de detalhe correta a partir do card no catálogo.
- [ ] Cada CTA "Pedir" leva ao Google Forms com o produto certo pré-selecionado (ou ao Forms genérico, se o fallback estiver ativo).
- [ ] Nota de prazo de entrega presente e legível em todas as páginas de produto.
- [ ] Nota de privacidade (FR8) presente no rodapé de todas as páginas.
- [ ] Layout testado em pelo menos: 1 celular real (ou emulado), 1 tablet, 1 desktop.
- [ ] Layout testado em pelo menos: Chrome e Safari (conforme NFR6).
- [ ] Navegação 100% funcional por teclado (tab through) em todas as páginas.
- [ ] Contraste de cor verificado com Lighthouse/axe, especialmente o laranja de accent.
- [ ] Placeholder de imagem exibido corretamente para a ecobag (enquanto a foto real não chega).
- [ ] `prefers-reduced-motion` testado (animações desabilitadas quando ativado no SO).

## Testing Best Practices

1. **Validação manual estruturada:** seguir a checklist acima antes de cada deploy que toque conteúdo ou layout.
2. **Teste em dispositivo real quando possível:** emuladores escondem problemas reais de toque/performance.
3. **Cobertura de navegador:** mínimo Chrome + Safari (mobile e desktop), conforme NFR6.
4. **Teste de link externo:** verificar que cada link do Forms de fato abre e (quando aplicável) chega pré-preenchido.
5. **Re-teste após qualquer atualização de `products.json`:** já que preço/foto/link mudam depois do lançamento inicial.
