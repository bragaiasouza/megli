export default function ContactPage() {
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
                  <form action=".">
                      <fieldset>
                          <label>
                              <input type="text" placeholder="Nome completo" />
                          </label>
                          <label>
                              <input type="text" placeholder="Celular" />
                          </label>
                          <label>
                              <input type="text" placeholder="E-mail" />
                          </label>
                          <label>
                              <textarea placeholder="Deixe sua mensagem"></textarea>
                          </label>
                          <label>
                              <button>Envie sua mensagem</button>
                          </label>
                      </fieldset>
                  </form>
              </article>
          </div>
      </section>
    </>
  );
}
