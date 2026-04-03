import PropertySpecs from './PropertySpecs.jsx';
import PropertyTagList from './PropertyTagList.jsx';
import { InfoIcon, LocationIcon } from './PropertyIcons.jsx';

var GALLERY_IMAGES = Array.from({ length: 5 }, function (_, index) {
  return { id: index, href: '/assets/img/_temp/1.png', src: '/assets/img/_temp/1.png', alt: 'Foto do imóvel' };
});

var SPECS = [
  { icon: 'area', label: '100m2' },
  { icon: 'bath', label: '01 banheiro' },
  { icon: 'bed', label: '02 quartos' },
  { icon: 'garage', label: '03 vagas' },
];

var FEATURED_ITEMS = ['Sala', 'Cozinha', 'Sala', 'Cozinha', 'Sala', 'Sala', 'Cozinha', 'Sala', 'Cozinha'];

function GallerySection() {
  return (
    <section id="gallery" className="splide" aria-label="Galeria do imovel">
      <div className="splide__track">
        <ul className="splide__list">
          {GALLERY_IMAGES.map(function (image) {
            return <li key={image.id} className="splide__slide"><a href={image.href}><img src={image.src} alt={image.alt} /></a></li>;
          })}
        </ul>
      </div>
    </section>
  );
}

function PropertySidebar() {
  return (
    <aside>
      <PropertyTagList className="tags flex align-center" />
      <div className="price"><strong>Temporada</strong><span className="price-view"><small>R$</small>300,00 <b>/noite</b></span></div>
      <div className="price"><strong>Aluguel</strong><span className="price-view"><small>R$</small>4.000,00</span></div>
      <div className="price"><strong>Venda</strong><span className="price-view"><small>R$</small>1.200.000,00</span></div>
      <div className="others">
        <span className="flex align-center justify-between"><b>Condomínio</b> <strong>R$400</strong></span>
        <span className="flex align-center justify-between"><b>IPTU</b> <strong>R$66</strong></span>
      </div>
      <div className="bts">
        <span className="whatsapp"><a href="" title="Whatsapp">Whatsapp</a></span>
        <span className="airbnb"><a href="" title="Reservar no AirBnb">Reservar no AirBnb</a></span>
        <span className="booking"><a href="" title="Reservar no Booking">Reservar no Booking</a></span>
        <p>Você será apenas redirecionado</p>
      </div>
    </aside>
  );
}

export default function PropertyDetailSections() {
  return (
    <>
      <div id="gallery-lightbox" className="lightbox" aria-hidden="true">
        <div className="lightbox__dialog">
          <img className="lightbox__image" src="" alt="" />
          <span className="lightbox__caption"></span>
          <button className="lightbox__close" aria-label="Fechar galeria"></button>
          <button className="lightbox__nav lightbox__nav--prev" aria-label="Imagem anterior"></button>
          <button className="lightbox__nav lightbox__nav--next" aria-label="Próxima imagem"></button>
        </div>
      </div>
      <GallerySection />
      <section id="single">
        <div className="container flex align-start">
          <article>
            <div className="top flex justify-between align-center">
              <span>Apartamento</span>
              <div className="right flex align-center">
                <span><a href="" title="Ver mapa"><LocationIcon /> Ver mapa</a></span>
                <span>
                  <a href="#" title="Todas as fotos" data-open-gallery>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15L17.914 11.914C17.5389 11.5391 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.5391 15.086 11.914L6 21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {' '}
                    Todas as fotos
                  </a>
                </span>
              </div>
            </div>
            <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, dolores voluptatem vero excepturi ipsum eos.</h1>
            <PropertySpecs items={SPECS} />
            <address><LocationIcon /> Rua Siqueira Bueno, 2003 - Belenzinho, São Paulo - SP</address>
            <span className="proximity"><InfoIcon /> Perto da Padaria Santa Branca</span>
            <div className="video" />
            <div className="about">
              <h2>Sobre o imóvel</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus numquam nesciunt animi dicta at aperiam et architecto veniam enim consequuntur libero cumque dolorem sed ipsam commodi ut, minus inventore consectetur?</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus numquam nesciunt animi dicta at aperiam et architecto veniam enim consequuntur libero cumque dolorem sed ipsam commodi ut, minus inventore consectetur?</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus numquam nesciunt animi dicta at aperiam et architecto veniam enim consequuntur libero cumque dolorem sed ipsam commodi ut, minus inventore consectetur?</p>
            </div>
            <div className="featured">
              <h2>O que esse lugar oferece</h2>
              <div className="list flex">
                {FEATURED_ITEMS.map(function (item, index) {
                  return <span key={item + index}>{item}</span>;
                })}
              </div>
            </div>
            <div className="more flex align-center">
              <div className="left">
                <h3>Quer mais informações</h3>
                <p>Fale com nossos especialistas.</p>
                <span><a href="" title="Entre em contato">Entre em contato</a></span>
              </div>
              <figure><img src="/assets/img/more-img.png" alt="Especialista Megli" /></figure>
            </div>
          </article>
          <PropertySidebar />
        </div>
      </section>
    </>
  );
}
