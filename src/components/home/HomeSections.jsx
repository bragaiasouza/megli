import PropertyCard from '../property/PropertyCard.jsx';

function SectionArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.666626 5.33341H9.99996M9.99996 5.33341L5.33329 0.666748M9.99996 5.33341L5.33329 10.0001" stroke="#FFD14E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

var FEATURED_PROPERTIES = Array.from({ length: 4 }, function (_, index) {
  return {
    id: index,
    href: '',
    locality: 'São Paulo - Higienópolis',
    type: 'Apartamento',
    code: 'COD. 0000',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies ligula sit amet tortor.',
    image: { src: '/assets/img/_temp/1.png', alt: 'Foto do imóvel' },
    specs: [
      { icon: 'area', label: '100m2' },
      { icon: 'bath', label: '01' },
      { icon: 'bath', label: '02' },
      { icon: 'garage', label: '03' },
    ],
  };
});

function QuickAccessCard({ href, title, description, icon }) {
  return (
    <article>
      <a href={href} title={title}>
        <figure>{icon}</figure>
        <strong>{title}</strong>
        <p>{description}</p>
      </a>
    </article>
  );
}

export function HeroSection() {
  return (
    <section id="hero">
      <article>
        <small>Megli Negócios Imobiliários</small>
        <h2>Os melhores imóveis para <strong className="hero-rotator" data-hero-texts="morar com qualidade|investir com segurança|locação por temporada"><span className="hero-rotator__current">alugar por temporada</span><span className="hero-rotator__sizer" aria-hidden="true">alugar com tranquilidade</span></strong></h2>
        <p>Seja para morar ou investir, da consultoria à gestão de short stay, cuidamos do seu patrimônio com toda a atenção que você merece.</p>
        <div className="box">
          <strong className="flex align-center"><span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.34437 8.40031C4.20631 8.25637 4.09884 8.08595 4.02845 7.89933C3.95806 7.71272 3.92621 7.51377 3.93482 7.31451C3.94343 7.11524 3.99231 6.91979 4.07853 6.73993C4.16475 6.56008 4.28651 6.39956 4.43647 6.26806C4.58643 6.13655 4.76148 6.0368 4.95105 5.9748C5.14062 5.91281 5.34079 5.88986 5.53947 5.90735C5.73815 5.92484 5.93124 5.9824 6.10706 6.07655C6.28289 6.17071 6.43782 6.29951 6.5625 6.45519C6.68778 6.30114 6.84285 6.17394 7.01842 6.0812C7.194 5.98846 7.38647 5.93208 7.58434 5.91544C7.78221 5.89881 7.98139 5.92225 8.16999 5.98437C8.35859 6.04648 8.53272 6.146 8.68197 6.27697C8.83121 6.40794 8.95251 6.56766 9.03861 6.74659C9.1247 6.92552 9.17383 7.11997 9.18304 7.31832C9.19225 7.51667 9.16136 7.71484 9.09221 7.90098C9.02307 8.08711 8.91709 8.25739 8.78063 8.40163L7.05731 10.2759C6.99583 10.3467 6.91987 10.4034 6.83456 10.4423C6.74925 10.4812 6.65659 10.5014 6.56283 10.5014C6.46907 10.5014 6.3764 10.4812 6.29109 10.4423C6.20578 10.4034 6.12982 10.3467 6.06834 10.2759L4.34437 8.40031Z" stroke="#FFD14E" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round" /><path d="M0.65625 5.90656C0.656204 5.71564 0.697813 5.527 0.778173 5.35382C0.858534 5.18063 0.975711 5.02706 1.12153 4.90381L5.71528 0.966315C5.95218 0.766098 6.25233 0.65625 6.5625 0.65625C6.87267 0.65625 7.17282 0.766098 7.40972 0.966315L12.0035 4.90381C12.1493 5.02706 12.2665 5.18063 12.3468 5.35382C12.4272 5.527 12.4688 5.71564 12.4688 5.90656V11.8128C12.4688 12.1609 12.3305 12.4948 12.0843 12.7409C11.8382 12.987 11.5043 13.1253 11.1562 13.1253H1.96875C1.62065 13.1253 1.28681 12.987 1.04067 12.7409C0.794531 12.4948 0.65625 12.1609 0.65625 11.8128V5.90656Z" stroke="#FFD14E" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Encontre o que é melhor para você</strong>
          <div className="list grid">
            <span>Comprar</span>
            <span>Alugar</span>
            <span>Locação por temporada</span>
          </div>
          <button>Busque por todos imóveis <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.708374 6.70831L3.70837 3.70831L0.708374 0.708313" stroke="#FFD14E" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
      </article>
      <figure><img src="/assets/img/_temp/1.png" alt="Megli Negócios Imobiliários" /></figure>
    </section>
  );
}

export function FeaturedCarouselSection() {
  return (
    <section id="carousel">
      <div className="container">
        <header className="head">
          <small>Oportunidades</small>
          <strong>Imóveis <b>em destaque</b></strong>
        </header>
        <section className="slide splide" aria-label="Imoveis em destaque">
          <div className="splide__track">
            <ul className="splide__list">
              {FEATURED_PROPERTIES.map(function (property) {
                return <PropertyCard key={property.id} property={property} listItemClassName="splide__slide" />;
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

export function BannerSection() {
  return (
    <section id="banner">
      <article>
        <small>Sobre a Megli</small>
        <p>Desde 2018, a Megli Negócios Imobiliários atua com foco em qualidade, transparência e excelência no atendimento, oferecendo soluções completas para morar, investir ou rentabilizar.</p>
        <span><a href="/sobre/">Quem somos <SectionArrow /></a></span>
      </article>
      <img src="/assets/img/_temp/2.png" alt="Banner Megli" />
    </section>
  );
}

export function HelpSection() {
  return (
    <section id="help">
      <div className="container">
        <article>
          <div className="info">
            <header className="head">
              <small>Precisa de ajuda?</small>
              <strong>Quer saber mais?</strong>
            </header>
            <ul>
              <li>Megli Vendas</li>
              <li>Megli Gestão</li>
              <li>Megli Locação por temporada</li>
              <li>Megli Consultoria</li>
            </ul>
            <span><a href="/contato/">Entre em contato <SectionArrow /></a></span>
          </div>
          <figure><img src="/assets/img/help-side.png" alt="Ajuda Megli" /></figure>
        </article>
      </div>
    </section>
  );
}

export function QuickAccessSection() {
  return (
    <section id="fast">
      <div className="container">
        <header className="head align-center">
          <small>Facilidades</small>
          <strong>Acessos rápidos <b>para você</b></strong>
        </header>
        <div className="grid">
          <QuickAccessCard href="/imoveis/comprar/" title="Compre um imóvel" description="Imóveis para morar ou investir, com opções para todos os perfis (HIS, HMP, R2V, NR). Temos parceria com as maiores incorporadoras." icon={<svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9072 7.90553V2.23753H22.7072V9.50553V9.67113L22.824 9.78873L24.7072 11.6711L24.1416 12.2375L23.3896 11.4855L22.7072 10.8015V11.7679V12.2375C22.7072 12.7495 22.5152 13.2159 22.1984 13.5703L21.9592 13.8367L22.1976 14.1039C22.4896 14.4295 22.6752 14.8503 22.7032 15.3135L22.7072 15.4431V16.2375C22.7072 16.7495 22.5152 17.2159 22.1984 17.5703L21.9592 17.8367L22.1976 18.1039C22.4896 18.4295 22.6752 18.8503 22.7032 19.3135L22.7072 19.4431V20.2375C22.7072 21.3007 21.8776 22.1703 20.8304 22.2335L20.7016 22.2375H4.70715C3.64395 22.2375 2.77435 21.4079 2.71115 20.3607L2.70715 20.2311V19.4375C2.70715 18.9247 2.89915 18.4583 3.21595 18.1039L3.45515 17.8375L3.21595 17.5703C2.92475 17.2447 2.73915 16.8239 2.71115 16.3607L2.70715 16.2311V15.4375C2.70715 14.9247 2.89915 14.4583 3.21595 14.1039L3.45515 13.8375L3.21595 13.5703C2.93275 13.2535 2.74875 12.8463 2.71355 12.3967L2.70715 12.2295V11.7679V10.8023L2.02395 11.4855L1.27275 12.2375L0.707153 11.6719L11.2928 1.08553C12.0408 0.337532 13.2352 0.306332 14.02 0.991132L14.1256 1.09033L21.224 8.18873L21.9072 8.87113V7.90553Z" fill="#DB9F02" /></svg>} />
          <QuickAccessCard href="/imoveis/alugar/" title="Gestão de Short Stay" description="Soluções completas para gestão de Short Stay (Locação por temporada)." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.2857 4.28571H15.4286V1.71429C15.4277 1.26 15.2469 0.823715 14.9254 0.502286C14.6049 0.181714 14.1686 0.000857489 13.7143 0H1.71429C1.26 0.000857489 0.823715 0.180858 0.502286 0.502286C0.180858 0.823715 0.000857489 1.26 0 1.71429V22.2857C0.000857489 22.74 0.181714 23.1763 0.502286 23.4969C0.823715 23.8183 1.26 23.9991 1.71429 24H22.2857C22.74 23.9991 23.1754 23.8183 23.4969 23.4969C23.8183 23.1754 23.9991 22.74 24 22.2857V6C23.9991 5.54571 23.8183 5.10943 23.4969 4.788C23.1763 4.46743 22.74 4.28657 22.2857 4.28571Z" fill="#DB9F02" /></svg>} />
          <QuickAccessCard href="/imoveis/temporada/" title="Alugue por temporada" description="Para cada motivo de viagem (lazer, trabalho, estudo, saúde, eventos), temos as melhores opções de apartamentos de locação por temporada para uma experiência perfeita." icon={<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.056 4.82636C17.056 4.88346 17.0552 4.94056 17.0544 4.99766L17.0536 5.06386V5.07379V5.08372L17.0577 5.30136V5.30881V5.31626L17.0809 5.71016L17.0825 5.7532L17.0949 5.7954C17.2629 6.41109 17.6246 6.94567 18.2113 7.328C18.7533 7.68053 19.465 7.88824 20.348 7.93623V8.7646C19.2316 8.70667 18.352 8.41538 17.6974 7.97347L17.0519 7.53736V8.31607V10.8442V11.258H17.4657H18.2932C18.4248 11.258 18.5473 11.3209 18.625 11.4243L18.6639 11.4864L24.4501 22.2336C24.5891 22.4909 24.4236 22.8013 24.1455 22.8393L24.0752 22.8435H0.914959C0.622839 22.8435 0.427541 22.5505 0.526018 22.2882L0.556636 22.2236L6.34359 11.4756C6.41145 11.3498 6.52234 11.2803 6.64399 11.2629L6.67543 11.258H15.8106H16.2244V10.8442L16.226 8.3169V7.53819L15.5805 7.97347C14.926 8.41538 14.0471 8.70667 12.9308 8.7646V7.93623C13.7782 7.88989 14.4667 7.69708 14.9996 7.3702C15.6252 6.98705 16.01 6.43591 16.1838 5.7954L16.1946 5.75733L16.1979 5.71844L16.2103 5.56617V5.55955V5.55293L16.2211 5.31129V5.29971L16.2244 5.09779V5.09117L16.226 4.18915V3.28548L15.5416 3.87552C14.8945 4.43328 14.0314 4.79905 12.9308 4.8727V4.04268C13.7782 3.97482 14.475 3.69677 15.0137 3.22838C15.6335 2.68883 16.0034 1.93329 16.178 1.06934L16.1797 1.0619L16.1813 1.05445L16.1979 0.947697L16.1995 0.941076V0.935284C16.2136 0.830187 16.2227 0.720952 16.226 0.618337V0.600959V0.584409L16.2227 0.519033V0.5H17.0519V0.678747H17.056C17.0602 0.765639 17.0685 0.85253 17.0792 0.935284V0.941076L17.0809 0.947697L17.0982 1.05445L17.0999 1.0619L17.1007 1.06934C17.2687 1.9035 17.6188 2.6367 18.2022 3.17211C18.7475 3.67277 19.4658 3.97234 20.348 4.04268V4.8727C19.2465 4.79905 18.3826 4.43162 17.7354 3.87386L17.0519 3.283V4.1875V4.45893V4.82636H17.056Z" fill="#DB9F02" /></svg>} />
          <QuickAccessCard href="/consultoria/" title="Confira nossa consultoria" description="Preparo estratégico da sua unidade para locação por temporada. Consultoria em short stay para administradoras e incorporadoras." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 21C1.99986 19.7062 2.31352 18.4316 2.91408 17.2857C3.51464 16.1397 4.38419 15.1565 5.44815 14.4203C6.51212 13.6842 7.73876 13.217 9.02288 13.059C10.307 12.901 11.6103 13.0568 12.821 13.513M21.378 16.626C21.7764 16.2276 22.0001 15.6874 22.0001 15.124C22.0001 14.5606 21.7764 14.0204 21.378 13.622C20.9796 13.2236 20.4394 12.9999 19.876 12.9999C19.3126 12.9999 18.7724 13.2236 18.374 13.622L14.364 17.634C14.1262 17.8716 13.9522 18.1653 13.858 18.488L13.021 21.358C12.9959 21.444 12.9944 21.5353 13.0166 21.6221C13.0389 21.7089 13.0841 21.7882 13.1474 21.8516C13.2108 21.9149 13.2901 21.9601 13.3769 21.9824C13.4637 22.0046 13.555 22.0031 13.641 21.978L16.511 21.141C16.8337 21.0468 17.1274 20.8728 17.365 20.635L21.378 16.626ZM15 8C15 10.7614 12.7614 13 10 13C7.23858 13 5 10.7614 5 8C5 5.23858 7.23858 3 10 3C12.7614 3 15 5.23858 15 8Z" stroke="#DB9F02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
          <QuickAccessCard href="/contato/" title="Entre em contato" description="Atendimento personalizado, com foto total no seu objetivo." icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z" stroke="#DB9F02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
        </div>
      </div>
    </section>
  );
}
