import { Link } from "react-router-dom";

export default function Breadcrumbs({ trail }: { trail: Array<{ label: string; to?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {trail.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < trail.length - 1 && <span className="sep">/</span>}
        </span>
      ))}
    </nav>
  );
}
