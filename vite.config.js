import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function singlePropertyRewrite() {
  function rewritePropertyUrl(req, _res, next) {
    var requestUrl = req.url || '';
    var pathname = requestUrl.split('?')[0].split('#')[0];

    if (pathname && /^\/imovel\/[^/?#]+\/?$/.test(pathname)) {
      req.url = '/imovel/index.html';
    }

    next();
  }

  return {
    name: 'single-property-rewrite',
    configureServer(server) {
      server.middlewares.use(rewritePropertyUrl);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewritePropertyUrl);
    },
  };
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchPublishedProperties(env) {
  if (!env.VITE_HYGRAPH_ENDPOINT) {
    return [];
  }

  var response = await fetch(env.VITE_HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(env.VITE_HYGRAPH_TOKEN ? { Authorization: 'Bearer ' + env.VITE_HYGRAPH_TOKEN } : {}),
    },
    body: JSON.stringify({
      query: `
        query PropertyPaths($stage: Stage!) {
          imovels(stage: $stage, first: 500) {
            nome
          }
        }
      `,
      variables: {
        stage: env.VITE_HYGRAPH_STAGE || 'PUBLISHED',
      },
    }),
  });

  var payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error(
      'Falha ao buscar imoveis para gerar rotas: ' + JSON.stringify(payload.errors || payload),
    );
  }

  return payload.data && payload.data.imovels ? payload.data.imovels : [];
}

function generateStaticPropertyPages() {
  var resolvedConfig;

  return {
    name: 'generate-static-property-pages',
    configResolved(config) {
      resolvedConfig = config;
    },
    async closeBundle() {
      if (!resolvedConfig || resolvedConfig.command !== 'build') {
        return;
      }

      var outDir = resolvedConfig.build.outDir;
      var templatePath = resolve(outDir, 'imovel/index.html');
      var template = await readFile(templatePath, 'utf8');
      var properties = await fetchPublishedProperties(resolvedConfig.env);

      await Promise.all(
        properties.map(async function (property) {
          var slug = slugify(property.nome);

          if (!slug) {
            return;
          }

          var targetDir = resolve(outDir, 'imovel', slug);
          await mkdir(targetDir, { recursive: true });
          await writeFile(resolve(targetDir, 'index.html'), template);
        }),
      );
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), singlePropertyRewrite(), generateStaticPropertyPages()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        imoveis: resolve(__dirname, 'imoveis/index.html'),
        imoveisComprar: resolve(__dirname, 'imoveis/comprar/index.html'),
        imoveisAlugar: resolve(__dirname, 'imoveis/alugar/index.html'),
        imovel: resolve(__dirname, 'imovel/index.html'),
        imovelsTemporada: resolve(__dirname, 'imoveis/temporada/index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        consultoria: resolve(__dirname, 'consultoria/index.html'),
        contato: resolve(__dirname, 'contato/index.html'),
      },
    },
  },
});
