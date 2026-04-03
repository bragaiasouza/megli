import React from 'react';

var CONTACT = {
  instagram:
    'https://www.instagram.com/meglinegociosimobiliarios?igsh=MTFmYTh3aXY1dWI0aA==',
  facebook: 'https://www.facebook.com/share/17m3u69UtG/',
  whatsapp: 'https://wa.me/5511996529796',
  email: 'meglinegociosimobiliarios@gmail.com',
  phones: [
    { href: 'tel:+5511996529796', label: '(11) 99652-9796' },
    { href: 'tel:+5511999699392', label: '(11) 99969-9392' },
  ],
};

var NAV_ITEMS = [
  { href: '/', title: 'Início', label: 'Início' },
  { href: '/sobre/', title: 'Sobre a Megli', label: 'Sobre a Megli' },
  { href: '/imoveis/', title: 'Todos os imóveis', label: 'Todos os imóveis' },
  { href: '/imoveis/comprar/', title: 'Comprar', label: 'Comprar' },
  { href: '/imoveis/alugar/', title: 'Alugar', label: 'Alugar' },
  { href: '/imoveis/temporada/', title: 'Por temporada', label: 'Por temporada' },
  { href: '/consultoria/', title: 'Consultoria', label: 'Consultoria' },
];

function CallIcon() {
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.6249 13.4583V12.0417C10.6249 11.2902 10.3264 10.5695 9.79506 10.0382C9.2637 9.50684 8.54303 9.20833 7.79159 9.20833H3.54159C2.79014 9.20833 2.06947 9.50684 1.53812 10.0382C1.00676 10.5695 0.708252 11.2902 0.708252 12.0417V13.4583M10.6249 0.798999C11.2325 0.956511 11.7706 1.31131 12.1547 1.80771C12.5388 2.30411 12.7472 2.914 12.7472 3.54167C12.7472 4.16933 12.5388 4.77922 12.1547 5.27562C11.7706 5.77202 11.2325 6.12682 10.6249 6.28433M14.8749 13.4583V12.0417C14.8745 11.4139 14.6655 10.804 14.2809 10.3079C13.8963 9.81173 13.3578 9.45736 12.7499 9.30042M8.49992 3.54167C8.49992 5.10647 7.23139 6.375 5.66659 6.375C4.10178 6.375 2.83325 5.10647 2.83325 3.54167C2.83325 1.97686 4.10178 0.708332 5.66659 0.708332C7.23139 0.708332 8.49992 1.97686 8.49992 3.54167Z"
        stroke="#FFD14E"
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 8L8 1M8 1L15 8M8 1V15"
        stroke="#FFD14E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.59844 0C2.51124 0 0 2.51356 0 5.60156V13.6016C0 16.6888 2.51356 19.2 5.60156 19.2H13.6016C16.6888 19.2 19.2 16.6864 19.2 13.5984V5.59844C19.2 2.51124 16.6864 0 13.5984 0H5.59844ZM15.2 3.2C15.6416 3.2 16 3.5584 16 4C16 4.4416 15.6416 4.8 15.2 4.8C14.7584 4.8 14.4 4.4416 14.4 4C14.4 3.5584 14.7584 3.2 15.2 3.2ZM9.6 4.8C12.2472 4.8 14.4 6.9528 14.4 9.6C14.4 12.2472 12.2472 14.4 9.6 14.4C6.9528 14.4 4.8 12.2472 4.8 9.6C4.8 6.9528 6.9528 4.8 9.6 4.8ZM9.6 6.4C8.75131 6.4 7.93737 6.73714 7.33726 7.33726C6.73714 7.93737 6.4 8.75131 6.4 9.6C6.4 10.4487 6.73714 11.2626 7.33726 11.8627C7.93737 12.4629 8.75131 12.8 9.6 12.8C10.4487 12.8 11.2626 12.4629 11.8627 11.8627C12.4629 11.2626 12.8 10.4487 12.8 9.6C12.8 8.75131 12.4629 7.93737 11.8627 7.33726C11.2626 6.73714 10.4487 6.4 9.6 6.4Z"
        fill="#464646"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.56 0C4.728 0 0 4.728 0 10.56C0 15.8544 3.9 20.2258 8.98176 20.9894V13.3589H6.36912V10.583H8.98176V8.736C8.98176 5.67792 10.4717 4.33536 13.0133 4.33536C14.2306 4.33536 14.8742 4.4256 15.179 4.46688V6.88992H13.4453C12.3662 6.88992 11.9894 7.9128 11.9894 9.06576V10.583H15.1517L14.7226 13.3589H11.9894V21.012C17.1437 20.3126 21.12 15.9058 21.12 10.56C21.12 4.728 16.392 0 10.56 0Z"
        fill="#464646"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.6 0C4.2984 0 0 4.2984 0 9.6C0 11.401 0.505873 13.0801 1.36875 14.5203L0.0859375 19.2L4.86562 17.9453C6.26348 18.74 7.87719 19.2 9.6 19.2C14.9016 19.2 19.2 14.9016 19.2 9.6C19.2 4.2984 14.9016 0 9.6 0ZM6.31406 5.12188C6.47006 5.12188 6.63035 5.12092 6.76875 5.12813C6.93995 5.13213 7.12629 5.14466 7.30469 5.53906C7.51669 6.00786 7.9783 7.18393 8.0375 7.30312C8.0967 7.42233 8.13865 7.56275 8.05625 7.71875C7.97785 7.87875 7.93708 7.97559 7.82188 8.11719C7.70268 8.25479 7.57206 8.42569 7.46406 8.52969C7.34486 8.64889 7.22178 8.77959 7.35938 9.01719C7.49697 9.25479 7.97485 10.0337 8.68125 10.6625C9.58925 11.4737 10.3554 11.723 10.5938 11.8422C10.8321 11.9614 10.9702 11.9428 11.1078 11.7828C11.2494 11.6268 11.7025 11.0915 11.8625 10.8531C12.0185 10.6147 12.1778 10.656 12.3938 10.7344C12.613 10.8128 13.7819 11.3886 14.0203 11.5078C14.2587 11.627 14.415 11.686 14.475 11.7828C14.5366 11.8828 14.5367 12.3589 14.3391 12.9141C14.1415 13.4685 13.1711 14.0046 12.7359 14.0422C12.2967 14.083 11.8868 14.2396 9.88125 13.45C7.46205 12.4972 5.93639 10.0194 5.81719 9.85938C5.69799 9.70337 4.84844 8.57113 4.84844 7.40313C4.84844 6.23112 5.46293 5.65715 5.67812 5.41875C5.89733 5.18035 6.15406 5.12188 6.31406 5.12188Z"
        fill="#464646"
      />
    </svg>
  );
}

function NavigationList() {
  return (
    <>
      {NAV_ITEMS.map(function (item) {
        return (
          <li key={item.href}>
            <a href={item.href} title={item.title}>
              {item.label}
            </a>
          </li>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  return (
    <header id="header">
      <div className="container flex align-center justify-between">
        <span className="logo">
          <a href="/" title="Megli Negócios Imobiliários">
            <img src="/assets/img/logo.svg" alt="Megli Negócios Imobiliários" />
          </a>
        </span>
        <nav>
          <ul className="flex align-center">
            <NavigationList />
          </ul>
        </nav>
        <span className="call">
          <a href="/contato/" title="Fale com a gente">
            <CallIcon /> Fale com a gente
          </a>
        </span>
        <span className="toggle"></span>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="grid">
          <div className="column">
            <span className="logo">
              <img src="/assets/img/logo.svg" alt="Megli" />
            </span>
            <p>
              A Megli Negócios Imobiliários conecta pessoas, imóveis e oportunidades com
              atendimento próximo, estratégico e transparente.
            </p>
            <span className="back">
              <a href="#header">
                Voltar ao topo <ArrowUpIcon />
              </a>
            </span>
          </div>
          <div className="column">
            <nav>
              <strong>Busca por cidades</strong>
              <ul>
                <li><a href="/imoveis/" title="Bela Vista">Bela Vista</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
              </ul>
            </nav>
          </div>
          <div className="column">
            <nav>
              <strong>Busca por bairros</strong>
              <ul>
                <li><a href="/imoveis/" title="Bela Vista">Bela Vista</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
                <li><a href="/imoveis/" title="Itaim Bibi">Itaim Bibi</a></li>
              </ul>
            </nav>
          </div>
          <div className="column">
            <nav>
              <strong>Busca de imóveis</strong>
              <ul>
                <li>
                  <a href="/imoveis/comprar/" title="Procure para comprar">Procure para comprar</a>
                </li>
                <li>
                  <a href="/imoveis/alugar/" title="Procure para alugar">Procure para alugar</a>
                </li>
                <li>
                  <a href="/imoveis/temporada/" title="Alugue por temporada">Alugue por temporada</a>
                </li>
              </ul>
              <strong>Explore</strong>
              <ul>
                <li><a href="/sobre/" title="Sobre nós">Sobre nós</a></li>
                <li><a href="/consultoria/" title="Consultoria">Consultoria</a></li>
              </ul>
            </nav>
          </div>
          <div className="column">
            <nav>
              <strong>Redes sociais</strong>
              <ul className="social">
                <li>
                  <a href={CONTACT.instagram} title="Instagram" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a href={CONTACT.facebook} title="Facebook" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsapp} title="Whatsapp" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                  </a>
                </li>
              </ul>
              <strong>Fale conosco</strong>
              <ul>
                {CONTACT.phones.map(function (phone) {
                  return (
                    <li key={phone.href}>
                      <a href={phone.href} title="Fale por telefone">
                        {phone.label}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a href={'mailto:' + CONTACT.email} title="Fale por email">
                    meglinegocios<wbr />imobiliarios@gmail.com
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="creci">
          <p>CRECI 031996J</p>
          <p className="devz">Desenvolvido por <a href="https://www.devzdesign.com.br" title="DevzDesign" target="_blank" rel="noopener noreferrer"><img src="/assets/img/logo-devz.svg" alt="DevzDesign" /></a></p>
        </div>
      </div>
    </footer>
  );
}

export function SiteSidebar() {
  return (
    <aside id="sidebar">
      <span className="logo">
        <a href="/" title="Megli Negócios Imobiliários">
          <img src="/assets/img/logo.svg" alt="Megli Negócios Imobiliários" />
        </a>
      </span>
      <nav>
        <ul className="flex align-center">
          <NavigationList />
        </ul>
      </nav>
      <span className="call">
        <a href="/contato/" title="Fale com a gente">
          <CallIcon /> Fale com a gente
        </a>
      </span>
    </aside>
  );
}
