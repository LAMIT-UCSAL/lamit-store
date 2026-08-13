/**
 * Template inicial para gerar documentos .docx com a identidade visual da LAMIT / Imersão LAMIT.
 *
 * Este arquivo NÃO deve ser rodado como está — é um ponto de partida. Copie o conteúdo
 * relevante para um script novo (ex: /home/claude/gerar.js), ajuste as seções e o conteúdo
 * para o documento que você está criando (roteiro, guia de edição, briefing, etc.), e rode com:
 *   npm install docx
 *   node gerar.js
 *
 * Sempre siga o fluxo do skill docx (/mnt/skills/public/docx/SKILL.md): gerar -> converter
 * para PDF -> renderizar imagens -> conferir visualmente antes de entregar.
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, ShadingType, Table, TableRow, TableCell, WidthType,
  Header, Footer, convertInchesToTwip,
} = require("docx");
const fs = require("fs");

// ---- Paleta oficial (ver references/imersao-lamit.md e lamit-institucional.md) ----
const CORES = {
  azul: "0A69C4",       // Azul institucional — destaques, títulos, tarjas
  navy: "0E1B27",       // Texto principal sobre fundo claro
  cream: "FBFAF8",      // Fundo de cards/telas de texto
  laranja: "E8722C",    // Destaque LAMIT — CTAs, urgência, ação (usar com moderação)
  cinza: "6B7280",
  cinzaClaro: "9C9890",
};

// ---- Componentes reutilizáveis ----

// Título de seção com sublinhado laranja (padrão usado em todos os documentos LAMIT)
function tituloSecao(texto) {
  return new Paragraph({
    spacing: { before: 420, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: CORES.laranja } },
    children: [new TextRun({ text: texto, bold: true, size: 28, color: CORES.azul })],
  });
}

function subtitulo(texto) {
  return new Paragraph({
    spacing: { before: 260, after: 100 },
    children: [new TextRun({ text: texto, bold: true, size: 23, color: CORES.navy })],
  });
}

function paragrafo(texto, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: texto, size: 22, color: CORES.navy, ...opts })],
  });
}

function bullet(texto) {
  return new Paragraph({
    spacing: { after: 90 },
    indent: { left: convertInchesToTwip(0.22) },
    children: [
      new TextRun({ text: "•  ", size: 22, color: CORES.laranja, bold: true }),
      new TextRun({ text: texto, size: 22, color: CORES.navy }),
    ],
  });
}

// Para roteiros: nome do personagem em cor de destaque + fala indentada
function personagem(nome, cor) {
  return new Paragraph({
    spacing: { before: 240, after: 60 },
    children: [new TextRun({ text: nome, bold: true, color: cor, size: 22 })],
  });
}

function fala(texto) {
  return new Paragraph({
    spacing: { after: 120 },
    indent: { left: convertInchesToTwip(0.2) },
    children: [new TextRun({ text: texto, size: 24, color: CORES.navy })],
  });
}

function direcao(texto) {
  return new Paragraph({
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.2) },
    children: [new TextRun({ text: texto, italics: true, size: 20, color: CORES.cinza })],
  });
}

// Cabeçalho "ficha técnica" — usado no topo de roteiros e briefings de evento
function celulaFicha(largura, label, valor) {
  return new TableCell({
    width: { size: largura, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: CORES.cream },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 16, color: CORES.cinzaClaro })] }),
      new Paragraph({ children: [new TextRun({ text: valor, size: 22, color: CORES.navy, bold: true })] }),
    ],
  });
}

// ---- Documento base (cabeçalho "IMERSÃO LAMIT" + rodapé com o slogan) ----
// Troque o título, subtítulo e o array `children` pelo conteúdo real do documento.
const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1080, bottom: 1080, left: 1260, right: 1260 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: "IMERSÃO LAMIT", bold: true, color: CORES.azul, size: 18 })],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Construindo Habilidades do Futuro", italics: true, size: 16, color: CORES.cinzaClaro })],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: "Título do Documento", bold: true, size: 40, color: CORES.navy })],
        }),
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: "Subtítulo / contexto", size: 24, color: CORES.azul, bold: true })],
        }),

        tituloSecao("Exemplo de Seção"),
        paragrafo("Substitua este conteúdo pelo texto real do documento."),
        bullet("Item de lista de exemplo."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/claude/output.docx", buffer);
  console.log("done");
});
