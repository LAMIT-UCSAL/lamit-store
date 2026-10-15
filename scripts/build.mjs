// Monta a pasta dist/ só com os arquivos públicos do site (é o que o Netlify publica).
// Lista de inclusão, não de exclusão: qualquer arquivo novo na raiz (.env, docs/, .aiox-core/,
// .claude/, node_modules/...) fica fora do deploy por padrão.

import { cpSync, existsSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, applyPartials } from './partials.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

const PUBLIC_ENTRIES = ['index.html', 'css', 'js', 'data', 'produtos', 'assets'];

// Dentro de assets/: material interno de marca não vai para o site
const EXCLUDED = ['assets/lamit-brand-skill'];

// Fotos de produto/comunidade são servidas só em WebP; os PNG/JPEG originais ficam no repositório
const ORIGINALS_ONLY = /^assets\/(products|community)\/.+\.(png|jpe?g)$/i;

function isExcluded(path) {
  const rel = relative(root, path).split(sep).join('/');
  return EXCLUDED.some((prefix) => rel === prefix || rel.startsWith(`${prefix}/`))
    || rel.endsWith('.zip')
    || ORIGINALS_ONLY.test(rel);
}

try {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist);

  for (const entry of PUBLIC_ENTRIES) {
    const source = join(root, entry);
    if (!existsSync(source)) throw new Error(`entrada pública não encontrada: ${entry}`);
    cpSync(source, join(dist, entry), { recursive: true, filter: (path) => !isExcluded(path) });
  }

  // Header e rodapé saem sempre de partials/, mesmo que alguma página esteja desatualizada
  for (const page of PAGES) {
    const file = join(dist, page);
    writeFileSync(file, applyPartials(readFileSync(file, 'utf8')));
  }

  console.log(`dist/ pronto com: ${PUBLIC_ENTRIES.join(', ')}`);
} catch (error) {
  console.error('Error in build:', error);
  throw new Error(`Failed to build dist/: ${error.message}`);
}
