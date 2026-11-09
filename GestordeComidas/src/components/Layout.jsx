import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CloseButton, Offcanvas } from 'react-bootstrap';
import { useNotify } from '../context/NotifyContext.jsx';
import { AVATAR_GRANDE } from '../data/assets.js';
import { PLATOS } from '../data/favoritos.js';

// "to" = página que ya existe en React (se navega sin recargar).
// "href" = página de tus compañeros que sigue en HTML (vive en /HTML y se abre normal).
export const PAGINAS_HTML = {
  descubrir: '/HTML/descubrir.html',
  asistente: '/HTML/asistente.html',
  dietas: '/HTML/PerfilClinico.html',
  ajustes: '/HTML/Confi.html',
  login: '/HTML/login.html',
};

const MENU = [
  { label: 'Descubrir', icono: 'bi-compass', href: PAGINAS_HTML.descubrir },
  { label: 'Asistente Inteligente', icono: 'bi-stars', href: PAGINAS_HTML.asistente },
  { label: 'Mis Dietas y Salud', icono: 'bi-shield-plus', href: PAGINAS_HTML.dietas },
  { label: 'Mi Presupuesto', icono: 'bi-cash-stack', to: '/presupuesto' },
  { label: 'Favoritos e Historial', icono: 'bi-bookmark', iconoActivo: 'bi-bookmark-fill', to: '/favoritos' },
];

function EnlaceMenu({ item, alPulsar }) {
  if (item.to) {
    return (
      <NavLink to={item.to} className={({ isActive }) => 'nd-nav' + (isActive ? ' active' : '')} onClick={alPulsar}>
        {({ isActive }) => (
          <>
            <i className={`bi ${isActive && item.iconoActivo ? item.iconoActivo : item.icono}`}></i>
            {item.label}
          </>
        )}
      </NavLink>
    );
  }
  return (
    <a href={item.href} className="nd-nav">
      <i className={`bi ${item.icono}`}></i>
      {item.label}
    </a>
  );
}

/**
 * Estructura común de las páginas: menú lateral + barra superior + contenido.
 * topbar: función que recibe "abrirMenu" y devuelve la barra superior de cada página.
 */
export default function Layout({ insignia, sorpresaIcono, sorpresaTexto, topbar, children }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const notify = useNotify();

  const sorprender = () => {
    const plato = PLATOS[Math.floor(Math.random() * PLATOS.length)];
    notify('¡Sorpresa! Hoy te toca: ' + plato.titulo);
  };

  return (
    <>
      {/* Menú lateral: fijo en escritorio, se desliza en móvil */}
      <Offcanvas responsive="lg" show={menuAbierto} onHide={() => setMenuAbierto(false)} className="nd-sidebar" aria-label="Navegación principal">
        <Offcanvas.Body className="d-flex flex-column justify-content-between p-3">
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3 px-2">
                <span className="nd-logo"><i className="bi bi-egg-fried"></i></span>
                <div>
                  <h1 className="nd-brand mb-0">NutriDecide</h1>
                  <small className="text-body-secondary fw-bold">Plan Consciente</small>
                </div>
              </div>
              <CloseButton className="d-lg-none" onClick={() => setMenuAbierto(false)} aria-label="Cerrar" />
            </div>

            <div className="nd-miniprofile d-flex align-items-center gap-3 p-3">
              <img className="nd-avatar-lg" alt="Valentina Ruiz" src={AVATAR_GRANDE} />
              <div className="min-w-0">
                <p className="fw-bold mb-0 text-truncate">Valentina Ruiz</p>
                {insignia}
              </div>
            </div>

            <nav className="nav flex-column gap-1" aria-label="Secciones">
              {MENU.map((item) => (
                <EnlaceMenu key={item.label} item={item} alPulsar={() => setMenuAbierto(false)} />
              ))}
            </nav>
          </div>

          <div className="pt-3 border-top">
            <button className="btn nd-btn-gradient w-100 mb-2" onClick={sorprender}>
              <i className={`bi ${sorpresaIcono} me-2`}></i>{sorpresaTexto}
            </button>
            <a href={PAGINAS_HTML.ajustes} className="nd-nav"><i className="bi bi-gear"></i>Ajustes</a>
            <a href={PAGINAS_HTML.login} className="nd-nav"><i className="bi bi-box-arrow-right"></i>Cerrar Sesión</a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="nd-content">
        {topbar(() => setMenuAbierto(true))}
        <main className="container-xxl px-3 px-lg-4 py-4 d-flex flex-column gap-4">{children}</main>
      </div>
    </>
  );
}
