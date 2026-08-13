# API Integration (adaptado: não há API — é integração externa via link)

**Decisão arquitetural (resolve a pendência do PRD "link único vs. por produto"):** 1 Google Forms compartilhado, com uma pergunta "Qual produto você está pedindo?" dentro do formulário, usando o recurso de link pré-preenchido do Google Forms — cada CTA "Pedir" aponta pro mesmo Forms, com um parâmetro de URL que já vem com o produto certo selecionado.

**Por quê:** manter 1 link só é mais simples de atualizar/trocar depois, evita erro humano de colar o link errado em algum produto, e ainda entrega a mesma experiência de preenchimento automático que um Forms por produto daria.

**Fallback:** se o Forms pré-preenchido não estiver configurado a tempo do lançamento (17/08), cada CTA aponta pro Forms genérico sem pré-seleção — o usuário escolhe o produto manualmente dentro do formulário.

## Estrutura de dados (`data/products.json`)

```json
{
  "products": [
    {
      "id": "camiseta-marrom-simples",
      "name": "Camiseta Marrom Simples",
      "category": "Camiseta",
      "sizes": ["P", "M", "G", "GG"],
      "colors": ["Marrom"],
      "image": "/assets/products/camisetas/4 - camisaLamitMarromSimples.png",
      "price": null,
      "deliveryNote": "Pedidos deste modelo são enviados ao fornecedor ao atingir 30 unidades no total (ou após 1 mês). Produção: ~2 semanas após o envio.",
      "formsUrl": "https://forms.gle/PLACEHOLDER?entry.PRODUTO=Camiseta+Marrom+Simples"
    }
  ]
}
```

`price: null` e `formsUrl` com placeholder são intencionais — refletem o que o PRD já registrou como pendente.
