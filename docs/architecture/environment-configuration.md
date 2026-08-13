# Environment Configuration

N/A — nenhuma variável de ambiente necessária. O site não faz chamadas de API, não usa chaves/secrets, e não há backend para configurar.

A única configuração relacionada é de build/deploy no Netlify:

```toml
# netlify.toml
[build]
  publish = "."
  command = "" # sem build step — arquivos estáticos servidos como estão
```
