import { hygraphRequest } from './client.js';

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function propertySlugFromLocation() {
  var pathSegments = window.location.pathname.split('/').filter(Boolean);
  var imovelIndex = pathSegments.indexOf('imovel');
  var slug = imovelIndex > -1 ? pathSegments[imovelIndex + 1] : '';

  if (!slug) {
    return '';
  }

  try {
    return decodeURIComponent(slug);
  } catch (_error) {
    return slug;
  }
}

var IMOVEL_FIELDS = `
  id
  destaque
  categoria
  fase
  nome
  endereco
  bairro
  cidade
  referenciaDoLocal
  metragem
  banheiro
  quarto
  vaga
  descricao
  video
  precoTemporada
  precoAluguel
  precoVenda
  precoIptu
  precoCondominio
  caracteristicas
  galeriaDeImagens {
    url
    fileName
  }
  mapa {
    latitude
    longitude
  }
  airBnbLink
  bookingLink
`;

var FOOTER_IMOVEL_FIELDS = `
  id
  cidade
  bairro
`;

var PROPERTY_LOOKUP_LIMIT = 500;

var PAGE_LOADERS = {
  home: async function ({ request }) {
    return request(
      `
        query HomePage($stage: Stage!) {
          imovels(stage: $stage, first: 10, orderBy: publishedAt_DESC, where: { destaque: true }) {
            ${IMOVEL_FIELDS}
          }
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
  },
  properties: async function ({ request }) {
    return request(
      `
        query PropertiesPage($stage: Stage!) {
          imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${IMOVEL_FIELDS}
          }
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
  },
  property: async function ({ request }) {
    var slug = propertySlugFromLocation();
    var normalizedSlug = slugify(slug);
    var id = new URLSearchParams(window.location.search).get('id');

    if (!normalizedSlug && !id) {
      return null;
    }

    if (id) {
      var payloadById = await request(
        `
          query PropertyPageById($stage: Stage!, $id: ID!) {
            imovel(stage: $stage, where: { id: $id }) {
              ${IMOVEL_FIELDS}
            }
            footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
              ${FOOTER_IMOVEL_FIELDS}
            }
          }
        `,
        { id: id },
      );

      if (payloadById && payloadById.imovel) {
        return payloadById;
      }
    }

    var payload = await request(
      `
        query PropertyPageBySlug($stage: Stage!) {
          imovels(stage: $stage, first: ${PROPERTY_LOOKUP_LIMIT}) {
            ${IMOVEL_FIELDS}
          }
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
    var imovels = payload && payload.imovels ? payload.imovels : [];
    var imovel =
      imovels.find(function (item) {
        return slugify(item.nome) === normalizedSlug;
      }) || null;

    return {
      imovel: imovel,
      footerImovels: payload && payload.footerImovels ? payload.footerImovels : [],
    };
  },
  about: async function ({ request }) {
    return request(
      `
        query AboutPage($stage: Stage!) {
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
  },
  consulting: async function ({ request }) {
    return request(
      `
        query ConsultingPage($stage: Stage!) {
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
  },
  contact: async function ({ request }) {
    return request(
      `
        query ContactPage($stage: Stage!) {
          footerImovels: imovels(stage: $stage, first: 100, orderBy: publishedAt_DESC) {
            ${FOOTER_IMOVEL_FIELDS}
          }
        }
      `,
    );
  },
};

export async function loadPageData(pageName) {
  var loader = PAGE_LOADERS[pageName];

  if (!loader) {
    return null;
  }

  return loader({
    request: hygraphRequest,
  });
}

export { PAGE_LOADERS };
