var DEFAULT_TAGS = [
  { className: 'tag-temporada', label: 'Temporada' },
  { className: 'tag-aluguel', label: 'Aluguel' },
  { className: 'tag-venda', label: 'Venda' },
  { className: 'tag-lancamento', label: 'Lançamento' },
];

export default function PropertyTagList({ tags = DEFAULT_TAGS, className = 'tags' }) {
  return (
    <div className={className}>
      {tags.map(function (tag) {
        return (
          <span key={tag.className + tag.label} className={tag.className}>
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}
