var endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
var token = import.meta.env.VITE_HYGRAPH_TOKEN;
var stage = import.meta.env.VITE_HYGRAPH_STAGE || 'PUBLISHED';

export function hasHygraphConfig() {
  return Boolean(endpoint);
}

export async function hygraphRequest(query, variables) {
  if (!endpoint) {
    throw new Error('VITE_HYGRAPH_ENDPOINT nao definido.');
  }

  var response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: JSON.stringify({
      query: query,
      variables: {
        stage: stage,
        ...(variables || {}),
      },
    }),
  });

  var payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error(
      'Hygraph respondeu com erro: ' + JSON.stringify(payload.errors || payload),
    );
  }

  return payload.data;
}

export function pingHygraph() {
  return hygraphRequest('query PingHygraph { __typename }');
}
