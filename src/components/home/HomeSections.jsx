import PropertyCard from '../property/PropertyCard.jsx';
import { HomeBold, BedBold, Buildings2Bold, HandShakeBold, PhoneCallingBold } from 'solar-icon-set';

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
          <div className="search-wrap">
            <div className="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input type="text" placeholder="Buscar por nome ou código do imóvel..." />
            </div>
            <button type="button" className="search-btn">Buscar</button>
          </div>
          <button>Busque por todos imóveis <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.708374 6.70831L3.70837 3.70831L0.708374 0.708313" stroke="#FFD14E" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
      </article>
      <figure><img src="/assets/img/image-hero.jpeg" alt="Megli Negócios Imobiliários" /></figure>
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
          <QuickAccessCard href="/imoveis/comprar/" title="Compre um imóvel" description="Imóveis para morar ou investir, com opções para todos os perfis (HIS, HMP, R2V, NR). Temos parceria com as maiores incorporadoras." icon={<HomeBold size={26} color="#DB9F02" />} />
          <QuickAccessCard href="/imoveis/temporada/" title="Alugue por temporada" description="Para cada motivo de viagem (lazer, trabalho, estudo, saúde, eventos), temos as melhores opções de apartamentos de locação por temporada para uma experiência perfeita." icon={<BedBold size={26} color="#DB9F02" />} />
          <QuickAccessCard href="/imoveis/alugar/" title="Gestão de Short Stay" description="Soluções completas para gestão de Short Stay (Locação por temporada)." icon={<Buildings2Bold size={26} color="#DB9F02" />} />
          <QuickAccessCard href="/consultoria/" title="Confira nossa consultoria" description="Preparo estratégico da sua unidade para locação por temporada. Consultoria em short stay para administradoras e incorporadoras." icon={<HandShakeBold size={26} color="#DB9F02" />} />
          <QuickAccessCard href="/contato/" title="Entre em contato" description="Atendimento personalizado, com foto total no seu objetivo." icon={<PhoneCallingBold size={26} color="#DB9F02" />} />
        </div>
      </div>
    </section>
  );
}
