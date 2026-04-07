import React from 'react';

export default function ContactPage() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const form = e.target;
    const nome = form.querySelector('input[placeholder="Nome completo"]').value;
    const celular = form.querySelector('input[placeholder="Celular"]').value;
    const email = form.querySelector('input[placeholder="E-mail"]').value;
    const imovel = form.querySelector('#contact-imovel').options[form.querySelector('#contact-imovel').selectedIndex].text;
    const mensagem = form.querySelector('textarea').value;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          celular,
          email,
          imovel: form.querySelector('#contact-imovel').value ? imovel : '',
          mensagem,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
      } else {
        setMessage('❌ Erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Erro ao enviar a mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    var selectImovel = document.querySelector('#contact-imovel');
    if (!selectImovel || selectImovel.querySelectorAll('option').length > 1) {
      return;
    }

    async function loadImovels() {
      try {
        var endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
        if (!endpoint) return;

        var response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query { imovels(first: 500) { id codigo nome } }`,
            variables: {}
          })
        });

        var json = await response.json();
        if (json.data && json.data.imovels) {
          json.data.imovels.forEach(function (imovel) {
            var code = imovel.codigo || 'COD.XXXXXX';
            var optionEl = document.createElement('option');
            optionEl.value = imovel.id;
            optionEl.textContent = code + ' - ' + (imovel.nome || '');
            selectImovel.appendChild(optionEl);
          });
        }
      } catch (err) {
        console.error('Erro ao carregar imóveis:', err);
      }
    }

    loadImovels();
  }, []);

  return (
    <>
      <section id="contact">
          <div className="container">
              <header>
                  <small>Fale Conosco</small>
                  <h1>Vamos conversar <strong>como <br />podemos ajudá-lo</strong></h1>
              </header>
              <article className="flex align-center">
                  <figure><img src="/assets/img/contact-img.png" /></figure>
                  <form onSubmit={handleSubmit}>
                      <fieldset>
                          <label>
                              <input type="text" placeholder="Nome completo" required />
                          </label>
                          <label>
                              <input type="tel" placeholder="Celular" required />
                          </label>
                          <label>
                              <input type="email" placeholder="E-mail" required />
                          </label>
                          <label>
                              <select id="contact-imovel" defaultValue="">
                                  <option value="">Selecionar imóvel de interesse (opcional)</option>
                              </select>
                          </label>
                          <label>
                              <textarea placeholder="Deixe sua mensagem" required></textarea>
                          </label>
                          <label>
                              <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Envie sua mensagem'}</button>
                          </label>
                          {message && <p style={{ textAlign: 'center', marginTop: '16px' }}>{message}</p>}
                      </fieldset>
                  </form>
              </article>
          </div>
      </section>
    </>
  );
}
