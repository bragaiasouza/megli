import { AreaIcon, BathIcon, BedIcon, GarageIcon } from './PropertyIcons.jsx';

function getIcon(icon) {
  if (icon === 'bath') return <BathIcon />;
  if (icon === 'bed') return <BedIcon />;
  if (icon === 'garage') return <GarageIcon />;
  return <AreaIcon />;
}

export default function PropertySpecs({ items, className = 'info flex align-center' }) {
  return (
    <div className={className}>
      {items.map(function (item) {
        return (
          <span key={item.label}>
            {getIcon(item.icon)} {item.label}
          </span>
        );
      })}
    </div>
  );
}
