import { Link } from 'react-router-dom';
import { useNotify } from '../context/NotifyContext.jsx';

// Botón de hamburguesa (solo se ve en pantallas chicas)
export function MenuButton({ onClick }) {
  return (
    <button className="btn btn-light d-lg-none" onClick={onClick} aria-label="Abrir menú">
      <i className="bi bi-list fs-5"></i>
    </button>
  );
}

export function SearchBox({ placeholder, value, onChange, onKeyDown, maxWidth }) {
  return (
    <div className="nd-search position-relative" style={maxWidth ? { maxWidth } : undefined}>
      <i className="bi bi-search"></i>
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        aria-label="Buscar"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export function BellButton() {
  const notify = useNotify();
  return (
    <button className="btn nd-icon-btn" aria-label="Notificaciones" onClick={() => notify('No tienes notificaciones nuevas')}>
      <i className="bi bi-bell"></i>
      <span className="nd-ping"></span>
    </button>
  );
}

export function HeartLink() {
  return (
    <Link className="btn nd-icon-btn" to="/favoritos" aria-label="Favoritos">
      <i className="bi bi-heart"></i>
    </Link>
  );
}

// Enlace de la barra superior (Hoy / Semanario / Despensa)
// Sin "href" (ej: Despensa) solo muestra un aviso, porque esa vista todavía no existe.
export function TopLink({ children, activo, href }) {
  const notify = useNotify();
  if (activo) {
    return <span className="nd-toplink active" aria-current="page">{children}</span>;
  }
  if (href) {
    return <a href={href} className="nd-toplink">{children}</a>;
  }
  return (
    <a href="#" className="nd-toplink" onClick={(e) => { e.preventDefault(); notify(`"${children}" todavía no existe en el proyecto`); }}>
      {children}
    </a>
  );
}
