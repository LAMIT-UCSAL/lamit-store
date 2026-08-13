# Epic 2 Páginas de Produto & Encaminhamento de Pedido

Este épico entrega as páginas de detalhe individuais para os 4 produtos (fotos, variações, nota de prazo de entrega) e conecta o CTA "Pedir" ao Google Forms correto, completando a jornada de compra do MVP — do catálogo até o encaminhamento do pedido.

## Story 2.1 Página de Detalhe de Produto

Como visitante do site,
Eu quero ver uma página de detalhe completa ao clicar em um produto do catálogo,
Para que eu possa conhecer fotos, descrição, tamanhos e cores antes de decidir comprar.

**Acceptance Criteria**
1: Cada um dos 4 produtos tem sua própria página de detalhe, acessível a partir do card correspondente no catálogo (FR2).
2: A página exibe fotos do produto (ou placeholder claro se ainda não disponível — caso da ecobag), descrição, tamanhos e cores disponíveis (FR3).
3: A página segue a identidade visual definida na Story 1.2.
4: A página é responsiva em mobile e desktop.

## Story 2.2 Nota de Prazo de Entrega por Produto

Como visitante interessado em comprar,
Eu quero entender, na própria página do produto, como funciona o prazo de entrega,
Para que eu tome uma decisão de compra informada, sem surpresas sobre o tempo de espera.

**Acceptance Criteria**
1: Cada página de produto inclui, na descrição, uma nota informativa (não destacada como alerta) sobre o modelo de produção sob demanda (FR4).
2: O texto deixa claro que o limite de 30 unidades é agregado por modelo (soma de todos os compradores), não uma exigência de compra individual.
3: O texto menciona a janela de até 1 mês para atingir o limite e o prazo de produção de ~2 semanas após o envio ao fornecedor.

## Story 2.3 CTA "Pedir" com Redirecionamento ao Google Forms

Como visitante decidido a comprar,
Eu quero clicar em um botão "Pedir" e ser levado diretamente ao formulário de pedido correto,
Para que eu consiga finalizar minha compra sem confusão sobre qual produto estou pedindo.

**Acceptance Criteria**
1: Cada página de produto tem um CTA "Pedir" visível (FR5).
2: O CTA redireciona para o link do Google Forms configurado para aquele pedido.
3: Se o link do Forms ainda não estiver disponível no momento do desenvolvimento, o CTA usa um valor placeholder fácil de atualizar sem exigir mudanças estruturais de código.
4: O comportamento do CTA é testado manualmente em pelo menos um navegador mobile e um desktop antes do lançamento.
