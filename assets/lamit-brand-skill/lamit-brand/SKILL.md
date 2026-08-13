---
name: lamit-brand
description: Use this skill whenever creating or reviewing any creative or written deliverable for LAMIT (Liga Acadêmica de Maratonas, Inovação e Tecnologia) or its flagship event, the Imersão LAMIT — including Reels/video scripts (roteiros), Instagram captions, carousel copy, event announcements, LAMITalks content, video-editing guides, brand/identity documents, briefings, or any other marketing or documentation deliverable tied to this brand. Trigger this even if the user doesn't say "LAMIT" explicitly but mentions "a liga", "a imersão", trilhas like Agents AI/Web3/LinkedIn & Carreira/Gestão de Projetos, or asks to keep "nossa identidade visual" for a university tech/innovation event. Always consult this skill before drafting brand voice or copy, choosing colors/fonts, or generating a .docx deliverable for this brand — don't rely on generic marketing instincts for it.
---

# LAMIT — Conteúdo, Documentação e Processo Criativo

Esta skill encapsula como criar qualquer peça de comunicação ou documento para a LAMIT: roteiros de vídeo, legendas, carrosséis, guias de edição, briefings e outros materiais de marca. A LAMIT tem uma voz e uma identidade visual bem definidas — o objetivo aqui não é só "escrever bonito", mas manter consistência entre tudo o que a liga publica.

## Antes de começar: reúna o contexto

Verifique primeiro se a conversa já trouxe o que você precisa — nomes de quem vai protagonizar, data/local do evento, trilhas, tom desejado, ou um rascunho de roteiro para melhorar. Não peça de novo o que já foi dito.

Se faltar algo essencial, pergunte de forma direta e objetiva (uma pergunta por vez é melhor que uma lista):
- Que tipo de peça é essa? (roteiro de Reels, legenda, carrossel, documento/guia, briefing...)
- É sobre um evento específico (ex: Imersão LAMIT) ou conteúdo institucional geral da liga?
- Quem protagoniza (se for vídeo) e quais são os dados concretos (data, local, vagas, trilhas)?

## A marca, resumidamente

A LAMIT não vende eventos — cria **experiências**. A comunicação nunca deve soar corporativa, vendedora ou cheia de clichê motivacional; ela deve soar como alguém de dentro da comunidade, animado para compartilhar algo bom. Toda peça deve fazer a pessoa sentir que está entrando numa comunidade que constrói o futuro, não apenas recebendo um anúncio.

Guia completo de marca (posicionamento, personalidade, tom de voz, identidade visual institucional): `references/lamit-institucional.md`.

Quando o conteúdo for sobre a **Imersão LAMIT** (o evento-âncora da liga), ela tem um conceito e uma paleta próprios — o símbolo da **porta** (oportunidade, transformação, novo caminho), o slogan fixo **"Construindo Habilidades do Futuro"** (nunca alterar) e uma paleta específica (cream, azul médio, navy). Guia completo: `references/imersao-lamit.md`. Leia esse arquivo sempre que o pedido envolver a Imersão, mesmo que só de leve.

## Checklist de tom de voz (aplique antes de entregar qualquer texto)

- [ ] Foco na **transformação** que a pessoa vai viver, não só na programação/agenda.
- [ ] Números concretos em vez de vago — "180 vagas", não "vagas limitadas"; "11 de julho", não "em breve".
- [ ] Sem apelo ao medo ou tom vendedor ("é essencial", "você vai ficar pra trás", "corre que é última chance").
- [ ] Sem clichê motivacional pronto ("o futuro é agora", "não perca essa oportunidade única").
- [ ] Linguagem natural, como conversa — não como anúncio.
- [ ] Se for sobre a Imersão: a metáfora da porta aparece em algum momento (abertura, fechamento ou CTA), mesmo que sutil.
- [ ] Emojis e hashtags com moderação — nunca em excesso.

Se alguma dessas caixas falhar, reescreva o trecho antes de entregar — isso normalmente é o que diferencia um rascunho comercial de uma peça que soa como a LAMIT de verdade.

## Como estruturar cada formato

### Roteiros de Reels / vídeo curto

Padrão que funciona bem para a marca:
1. **Gancho** — uma pergunta ou constatação que gera identificação (ex: "Quantas portas já se fecharam pra você...").
2. **Virada** — a LAMIT/o evento entra como resposta natural ao gancho, não como venda.
3. **Corpo** — o conteúdo principal (trilhas, atrações, formato) em ritmo ágil; se houver uma lista (ex: trilhas), prefira "bater e passar" — uma palavra ou frase curta por corte — em vez de uma frase corrida.
4. **Momento humano** — um instante de espontaneidade/humor entre os apresentadores (ex: um segredo, uma risada, uma interrupção) ajuda o vídeo a não parecer roteirizado demais.
5. **CTA** — convite direto e, se for Imersão, ancorado na metáfora da porta ("Bora atravessar essa porta com a gente?").

**Se houver dois ou mais apresentadores**, escreva como diálogo alternado do início ao fim — não como um monólogo de uma pessoa com a outra aparecendo só numa cena bônus no final. Isso deixa o vídeo mais dinâmico e usa melhor quem está em cena.

Duração ideal: 35–45 segundos. Se o roteiro escrito parecer longo lido em voz alta nesse tempo, corte informação, não ritmo.

### Legendas e carrosséis

Estrutura padrão (do guia institucional): gancho forte → contextualização → benefício para o leitor → convite para interação → chamada para ação. Evite legendas longas demais e excesso de hashtags.

### Documentos e guias (roteiro para enviar à equipe, guia de edição, briefing)

Quando o pedido for por um **documento** (ex: "gera um documento para eu mandar pro editor/pra Kézia"), use o skill de `docx` (`/mnt/skills/public/docx/SKILL.md`) para criar o arquivo, seguindo a identidade visual da marca dentro do próprio documento:

- Use `scripts/lamit_docx_template.js` como ponto de partida — já traz as cores oficiais e componentes prontos (títulos de seção, bullets, falas de personagem, células de "ficha técnica", direções de cena) para você não recriar do zero a cada documento.
- Cabeçalho com o nome do evento, rodapé com o slogan "Construindo Habilidades do Futuro" quando o documento for sobre a Imersão.
- Títulos de seção com sublinhado laranja (`E8722C`) e texto em azul institucional (`0A69C4`); corpo do texto em navy (`0E1B27`) sobre fundo claro.
- Sempre renderize o docx em PDF/imagem antes de entregar para conferir visualmente (fluxo padrão do skill de docx).

## Paleta rápida (referência de cores em hex)

| Cor | Hex | Quando usar |
|---|---|---|
| Azul institucional | `#0A69C4` | Destaques, títulos, tarjas — LAMIT em geral e Imersão |
| Navy quase preto | `#0E1B27` | Texto principal sobre fundo claro |
| Cream | `#FBFAF8` | Fundos de cards de texto, telas de transição (Imersão) |
| Laranja | `#E8722C` | CTAs e urgência — usar com moderação |

Cores de apoio (branco, amarelo, verde, vermelho) existem para categorizar conteúdo institucional da LAMIT, mas raramente aparecem em peças da Imersão, que tem paleta mais restrita.

## Arquivos desta skill

- `references/lamit-institucional.md` — guia completo de marca da LAMIT (missão, tom de voz, identidade visual, redes sociais).
- `references/imersao-lamit.md` — guia completo do evento Imersão LAMIT (conceito da porta, slogan, trilhas, paleta específica, dados da edição atual).
- `scripts/lamit_docx_template.js` — template inicial em JS (biblioteca `docx`) com as cores e componentes visuais da marca já configurados, para gerar documentos .docx mais rápido.

Ao começar uma tarefa nova, é normal ler só o(s) arquivo(s) de referência relevante(s) — não é preciso carregar os dois guias completos se o pedido for só institucional (ou só sobre a Imersão).
