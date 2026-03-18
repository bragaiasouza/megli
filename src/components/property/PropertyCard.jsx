import PropertySpecs from './PropertySpecs.jsx';
import PropertyTagList from './PropertyTagList.jsx';

var DEFAULT_SPECS = [
  { icon: 'area', label: '100m2' },
  { icon: 'bath', label: '01' },
  { icon: 'bath', label: '02' },
  { icon: 'garage', label: '03' },
];

export default function PropertyCard({ property, listItemClassName, wrapInListItem = true }) {
  var content = (
    <a href={property.href} title={property.linkTitle || 'Acessar imóvel'}>
      <article>
        <figure>
          <PropertyTagList tags={property.tags} />
          <img src={property.image.src} alt={property.image.alt} />
        </figure>
        <span className="locality">{property.locality}</span>
        <div className="top flex align-center justify-between">
          <span className="type">{property.type}</span>
          <span className="code">{property.code}</span>
        </div>
        <h3>{property.title}</h3>
        <PropertySpecs items={property.specs || DEFAULT_SPECS} />
      </article>
    </a>
  );

  return wrapInListItem ? <li className={listItemClassName}>{content}</li> : content;
}
