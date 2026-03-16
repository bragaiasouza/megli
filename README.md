# Megli

Base migrada para Node + Vite em modo multipage, mantendo as paginas estaticas originais e preparando a integracao com o Hygraph.

As rotas amigaveis ficam assim:

- `/`
- `/sobre/`
- `/imoveis/`
- `/imoveis/comprar/`
- `/imoveis/alugar/`
- `/imoveis/temporada/`
- `/imovel/`
- `/consultoria/`
- `/contato/`

## Rodando o projeto

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

## Hygraph

1. Copie `.env.example` para `.env`
2. Preencha `VITE_HYGRAPH_ENDPOINT`
3. Preencha `VITE_HYGRAPH_TOKEN` se a API exigir autenticacao
4. Teste a conexao:

```bash
npm run check:hygraph
```

## Estrutura principal

- `public/assets`: imagens, fontes e CSS legado do layout atual
- `src/main.js`: bootstrap da aplicacao e comportamento global
- `src/lib/hygraph/client.js`: cliente GraphQL para o Hygraph
- `src/lib/hygraph/page-loaders.js`: ponto de entrada para queries por pagina
- `src/lib/hygraph/bindings.js`: bind generico com `data-hg-text`, `data-hg-html` e `data-hg-image`

## Como plugar o schema do Hygraph

Implemente loaders em `src/lib/hygraph/page-loaders.js` usando `request(query, variables)`.

Exemplo:

```js
var PAGE_LOADERS = {
  home: async function ({ request }) {
    return request(
      `
        query HomePage($stage: Stage!) {
          homePage(stage: $stage) {
            heroTitle
            heroDescription
          }
        }
      `,
    );
  },
};
```

Depois, no HTML, ligue os campos:

```html
<h2 data-hg-text="homePage.heroTitle">Titulo fallback</h2>
<p data-hg-text="homePage.heroDescription">Descricao fallback</p>
```
