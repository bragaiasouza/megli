import { bindHygraphFields } from './bindings.js';
import { hasHygraphConfig, pingHygraph } from './client.js';
import { loadPageData } from './page-loaders.js';
import { renderPage } from './renderers.js';

export async function bootHygraph(pageName) {
  if (!pageName) {
    return null;
  }

  if (!hasHygraphConfig()) {
    document.documentElement.dataset.hygraph = 'disabled';
    return null;
  }

  document.documentElement.dataset.hygraph = 'connecting';

  try {
    await pingHygraph();

    var payload = await loadPageData(pageName);

    if (payload) {
      renderPage(pageName, payload);
      bindHygraphFields(payload);
    }

    document.documentElement.dataset.hygraph = 'connected';
    return payload;
  } catch (error) {
    document.documentElement.dataset.hygraph = 'error';
    console.error('[Hygraph]', error);
    return null;
  }
}
