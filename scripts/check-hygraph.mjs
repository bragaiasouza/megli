import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');
const endpoint = env.VITE_HYGRAPH_ENDPOINT;
const token = env.VITE_HYGRAPH_TOKEN;

if (!endpoint) {
  console.error('Defina VITE_HYGRAPH_ENDPOINT no .env antes de testar a conexao com o Hygraph.');
  process.exit(1);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  body: JSON.stringify({
    query: 'query PingHygraph { __typename }',
  }),
});

const payload = await response.json();

if (!response.ok || payload.errors) {
  console.error('Falha ao conectar no Hygraph.');
  console.error(JSON.stringify(payload.errors || payload, null, 2));
  process.exit(1);
}

console.log('Hygraph conectado com sucesso.');
console.log(JSON.stringify(payload.data, null, 2));
