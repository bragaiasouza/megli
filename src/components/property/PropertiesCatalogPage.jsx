import PropertyCard from './PropertyCard.jsx';

var FILTER_GROUPS = [
  { title: 'Tipo de negócio', options: ['Todos', 'Comprar', 'Alugar', 'Por temporada'], active: 'Todos' },
  { title: 'Fase do empreendimento', options: ['Todos', 'Lançamento', 'Em obras', 'Prontos'], active: '' },
];

var PLACEHOLDER_PROPERTIES = Array.from({ length: 6 }, function (_, index) {
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

function FilterGroup({ group }) {
  return (
    <div className="item">
      <strong>{group.title}</strong>
      <div className="list flex align-center justify-between">
        {group.options.map(function (option) {
          return <span key={option} className={group.active === option ? 'on' : undefined}>{option}</span>;
        })}
      </div>
    </div>
  );
}

export default function PropertiesCatalogPage() {
  return (
    <>
      <section id="catalog-search">
        <div className="container">
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input type="text" placeholder="Buscar por nome ou código do imóvel..." />
          </div>
        </div>
      </section>
      <section className="filter-toggle-wrap">
        <button type="button" className="filter-toggle-button" aria-controls="filter" aria-expanded="false">Abrir filtro</button>
      </section>
      <section id="filter">
        <div className="container flex align-end justify-between">
          {FILTER_GROUPS.map(function (group) {
            return <FilterGroup key={group.title} group={group} />;
          })}
          <div className="item item-right flex align-end justify-between">
            <div className="item-2">
              <strong>Cidade</strong>
              <select><option value="">Todas</option></select>
            </div>
            <div className="item-2">
              <strong>Bairro</strong>
              <select><option value="">Todos</option></select>
            </div>
          </div>
        </div>
      </section>
      <section id="advanced-filters">
        <div className="container">
          <div className="filter-sliders flex align-center justify-between">
            <div className="slider-item">
              <label>
                <strong>Quartos</strong>
                <span className="slider-value"><span id="quarto-min">0</span> - <span id="quarto-max">5+</span></span>
              </label>
              <div className="slider-track">
                <input type="range" id="quarto-slider" className="slider" min="0" max="5" value="0" />
              </div>
            </div>
            <div className="slider-item">
              <label>
                <strong>Banheiros</strong>
                <span className="slider-value"><span id="banheiro-min">0</span> - <span id="banheiro-max">4+</span></span>
              </label>
              <div className="slider-track">
                <input type="range" id="banheiro-slider" className="slider" min="0" max="4" value="0" />
              </div>
            </div>
            <div className="slider-item">
              <label>
                <strong>Vagas</strong>
                <span className="slider-value"><span id="vaga-min">0</span> - <span id="vaga-max">4+</span></span>
              </label>
              <div className="slider-track">
                <input type="range" id="vaga-slider" className="slider" min="0" max="4" value="0" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="estate">
        <div className="container">
          <div className="results-info">
            <span id="results-count"></span>
          </div>
          <div>
            <ul className="grid">
              {PLACEHOLDER_PROPERTIES.map(function (property) {
                return <PropertyCard key={property.id} property={property} />;
              })}
            </ul>
          </div>
          <div className="pagination">
            <ul className="flex align-center">
              <li><a href=""><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 10.625L0.625 5.625L5.625 0.625" stroke="#464646" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg></a></li>
              <li className="on"><a href="">1</a></li>
              <li><a href="">2</a></li>
              <li>...</li>
              <li><a href="">10</a></li>
              <li><a href=""><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.625 0.625L5.625 5.625L0.625 10.625" stroke="#464646" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg></a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
