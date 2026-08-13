# Routing

```plaintext
/                                        → index.html (Catálogo)
/produtos/camiseta-marrom-simples.html   → Detalhe: Camiseta Marrom Simples
/produtos/camiseta-brasao-preta.html     → Detalhe: Camiseta Brasão Preta
/produtos/camiseta-salvador.html         → Detalhe: Camiseta Salvador (3 cores)
/produtos/ecobag.html                    → Detalhe: Ecobag
```

Navegação via `<a href="...">` relativos entre essas páginas — sem JavaScript de roteamento.

**Rotas protegidas / lazy loading / guards de autenticação:** N/A — não há autenticação, não há conteúdo restrito, e com apenas 5 páginas HTML leves, lazy loading de rota não traria benefício real.
