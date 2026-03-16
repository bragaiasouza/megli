import { resolve } from 'node:path';
import { defineConfig } from 'vite';

function singlePropertyRewrite() {
  function rewritePropertyUrl(req, _res, next) {
    if (req.url && /^\/imovel\/[^/?#]+\/?$/.test(req.url)) {
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

export default defineConfig({
  appType: 'mpa',
  plugins: [singlePropertyRewrite()],
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
