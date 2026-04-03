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
        <div className="container">
          <div className="filter-main flex align-end justify-between">
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
          <div className="filter-buttons-group">
            <div className="filter-buttons-item">
              <strong>Quartos</strong>
              <div className="filter-buttons flex align-center gap-12">
                <button type="button" className="filter-btn" data-filter="quarto" data-value="0">Qualquer</button>
                <button type="button" className="filter-btn" data-filter="quarto" data-value="1">1+</button>
                <button type="button" className="filter-btn" data-filter="quarto" data-value="2">2+</button>
                <button type="button" className="filter-btn" data-filter="quarto" data-value="3">3+</button>
                <button type="button" className="filter-btn" data-filter="quarto" data-value="4">4+</button>
              </div>
            </div>
            <div className="filter-buttons-item">
              <strong>Banheiros</strong>
              <div className="filter-buttons flex align-center gap-12">
                <button type="button" className="filter-btn" data-filter="banheiro" data-value="0">Qualquer</button>
                <button type="button" className="filter-btn" data-filter="banheiro" data-value="1">1+</button>
                <button type="button" className="filter-btn" data-filter="banheiro" data-value="2">2+</button>
                <button type="button" className="filter-btn" data-filter="banheiro" data-value="3">3+</button>
                <button type="button" className="filter-btn" data-filter="banheiro" data-value="4">4+</button>
              </div>
            </div>
            <div className="filter-buttons-item">
              <strong>Vagas</strong>
              <div className="filter-buttons flex align-center gap-12">
                <button type="button" className="filter-btn" data-filter="vaga" data-value="0">Qualquer</button>
                <button type="button" className="filter-btn" data-filter="vaga" data-value="1">1+</button>
                <button type="button" className="filter-btn" data-filter="vaga" data-value="2">2+</button>
                <button type="button" className="filter-btn" data-filter="vaga" data-value="3">3+</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="estate">
        <div className="container">
          <div className="results-info flex align-center justify-between">
            <span id="results-count"></span>
            <select id="sort-select" aria-label="Ordenar por">
              <option value="relevance">Mais relevantes</option>
              <option value="newest">Mais recentes</option>
              <option value="price-low">Menor valor</option>
              <option value="price-high">Maior valor</option>
            </select>
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
