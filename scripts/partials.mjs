// Header e rodapé compartilhados: a fonte única fica em partials/*.html e cada página
// guarda uma cópia entre os marcadores <!-- partial:NOME ... --> e <!-- /partial:NOME -->.
// As páginas continuam completas (funcionam com `npx serve .`) e não há como divergir:
//   npm run partials        → reescreve as cópias nas páginas a partir de partials/
//   npm run partials:check  → falha se alguma página estiver desatualizada
// O build (scripts/build.mjs) também aplica os partials ao gerar dist/.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

export const PAGES = ['index.html', ...readdirSync(join(root, 'produtos'))
  .filter((file) => file.endsWith('.html'))
  .map((file) => `produtos/${file}`)];

const MARKER = /(<!-- partial:([a-z-]+)[^>]*-->\n)[\s\S]*?(\s*<!-- \/partial:\2 -->)/g;

const cache = new Map();
function readPartial(name) {
  if (!cache.has(name)) cache.set(name, readFileSync(join(root, 'partials', `${name}.html`), 'utf8'));
  return cache.get(name);
}

export function applyPartials(html) {
  return html.replace(MARKER, (_, open, name, close) => `${open}${readPartial(name).replace(/\n$/, '')}${close}`);
}

function run(mode) {
  const stale = [];
  for (const page of PAGES) {
    const file = join(root, page);
    const html = readFileSync(file, 'utf8');
    const updated = applyPartials(html);
    if (updated === html) continue;
    stale.push(page);
    if (mode === 'write') writeFileSync(file, updated);
  }

  if (mode === 'check' && stale.length > 0) {
    throw new Error(`páginas fora de sincronia com partials/: ${stale.join(', ')} (rode npm run partials)`);
  }
  console.log(stale.length ? `partials aplicados em: ${stale.join(', ')}` : 'partials: todas as páginas em dia');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    run(process.argv.includes('--check') ? 'check' : 'write');
  } catch (error) {
    console.error('Error in partials:', error.message);
    process.exitCode = 1;
  }
}
