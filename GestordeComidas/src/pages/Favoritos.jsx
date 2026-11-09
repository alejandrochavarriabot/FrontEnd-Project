import { useState } from 'react';
import Layout from '../components/Layout.jsx';
import PlatoCard from '../components/PlatoCard.jsx';
import { BellButton, MenuButton, SearchBox } from '../components/TopbarParts.jsx';
import { useNotify } from '../context/NotifyContext.jsx';
import { AVATAR_CHICO } from '../data/assets.js';
import { FILTROS, HISTORIAL, PLATOS, TABS } from '../data/favoritos.js';
import { Link } from 'react-router-dom';
import { PAGINAS_HTML } from '../components/Layout.jsx';

// Baja suavemente hasta una sección (respeta "reducir movimiento")
const irA = (id) => {
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' });
};

export default function Favoritos() {
  const notify = useNotify();

  const [tab, setTab] = useState('favoritos');
  const [seccion, setSeccion] = useState('favoritos-sec');
  const [chips, setChips] = useState([]);                       // ej: ['eco', 'fast']
  const [texto, setTexto] = useState('');
  const [favs, setFavs] = useState(() => PLATOS.map((p) => p.id)); // ids que tienen el corazón puesto

  // Platos que se muestran según pestaña, filtros y buscador
  const visibles = PLATOS.filter((p) => {
    if (!p.titulo.toLowerCase().includes(texto.trim().toLowerCase())) return false;
    if (!chips.every((id) => FILTROS.find((f) => f.id === id).cumple(p))) return false;
    if (tab === 'express' && !(p.min < 15)) return false;
    return true;
  });

  const elegirTab = (id) => {
    setTab(id);
    irA(id === 'recientes' ? 'historial' : 'favoritos-sec');
  };
  const elegirSeccion = (estado, id) => { setSeccion(estado); irA(id); };
  const alternarChip = (id) => setChips((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const alternarCorazon = (plato) => {
    const estaba = favs.includes(plato.id);
    setFavs((f) => (estaba ? f.filter((x) => x !== plato.id) : [...f, plato.id]));
    notify(estaba ? 'Quitado de favoritos' : 'Agregado a favoritos');
  };

  const topbar = (abrirMenu) => (
    <header className="nd-topbar sticky-top">
      <div className="d-flex align-items-center justify-content-between gap-3 px-3 px-lg-4 py-2">
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          <MenuButton onClick={abrirMenu} />
          <SearchBox
            placeholder="Buscar en platos guardados, ingredientes o historial..."
            maxWidth="34rem"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/presupuesto" className="nd-budget d-none d-md-inline-flex text-decoration-none py-1">
            <i className="bi bi-wallet2 nd-text-secondary fs-5"></i>
            <span className="lh-1">
              <span className="d-block nd-cap" style={{ fontSize: '.62rem' }}>Presupuesto restante</span>
              <strong>$42.50</strong> <span className="text-body-secondary">/ $120.00</span>
            </span>
          </Link>
          <BellButton />
          <span className="nd-text-primary fs-5 px-1" aria-label="Favoritos"><i className="bi bi-heart-fill"></i></span>
          <img className="nd-avatar-sm" alt="Valentina" src={AVATAR_CHICO} />
        </div>
      </div>

      {/* Pestañas con contador */}
      <div className="fv-tabs px-3 px-lg-4 py-2 overflow-x-auto">
        <ul className="nav flex-nowrap gap-1" aria-label="Filtro principal">
          {TABS.map((t) => (
            <li className="nav-item" key={t.id}>
              <button type="button" className={'nav-link' + (tab === t.id ? ' active' : '')} onClick={() => elegirTab(t.id)}>
                {t.icono && <i className={`bi ${t.icono}`}></i>}{t.label} <span className="fv-count">{t.n}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );

  return (
    <Layout
      insignia={<span className="badge nd-badge-green" style={{ fontSize: '.7rem', padding: '.2rem .5rem' }}>Libre de Gluten</span>}
      sorpresaIcono="bi-dice-5"
      sorpresaTexto="¡Sorpréndeme!"
      topbar={topbar}
    >
      {/* Encabezado */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3">
        <div style={{ maxWidth: '42rem' }}>
          <span className="fv-eyebrow mb-2"><i className="bi bi-journal-richtext"></i>Repertorio Personalizado &amp; Nutrición Sin Estrés</span>
          <h2 className="nd-h1 mb-2">Favoritos e Historial Culinario</h2>
          <p className="text-body-secondary fs-6 mb-0">Tus recetas estrella guardadas y el registro de comidas que resolvieron tu día sin complicaciones ni estrés.</p>
        </div>
        <button className="btn nd-btn-primary fv-btn-plan px-4 py-3" type="button" onClick={() => notify('Menú semanal en construcción con tus favoritos')}>
          <i className="bi bi-calendar-week me-2"></i>Planificar Menú Semanal con Favoritos
        </button>
      </div>

      {/* Filtros */}
      <section className="fv-filters p-3" aria-label="Filtros">
        <ul className="nav fv-seg d-inline-flex mb-3">
          <li className="nav-item">
            <button type="button" className={'nav-link' + (seccion === 'favoritos-sec' ? ' active' : '')} onClick={() => elegirSeccion('favoritos-sec', 'favoritos-sec')}>Mis Favoritos Guardados (12)</button>
          </li>
          <li className="nav-item">
            <button type="button" className={'nav-link' + (seccion === 'historial' ? ' active' : '')} onClick={() => elegirSeccion('historial', 'historial')}>Historial de Elecciones (16)</button>
          </li>
        </ul>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="fv-chip is-on"><i className="bi bi-shield-check"></i>Sin Gluten (100%)</span>
          {FILTROS.map((f) => (
            <button key={f.id} type="button" aria-pressed={chips.includes(f.id)} className={'fv-chip' + (chips.includes(f.id) ? ' is-on-red' : '')} onClick={() => alternarChip(f.id)}>
              <i className={`bi ${f.icono}`}></i>{f.label}
            </button>
          ))}
          <button type="button" className="fv-chip-link" onClick={() => irA('patron')}><i className="bi bi-bar-chart-line me-1"></i>Ver Estadísticas de Acierto</button>
        </div>
      </section>

      {/* Platos estrella */}
      <section id="favoritos-sec" aria-labelledby="starTitle">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            <span className="fv-sec-icon"><i className="bi bi-star"></i></span>
            <div>
              <h3 className="nd-h3 mb-0" id="starTitle">Tus Platos Estrella</h3>
              <small className="text-body-secondary">Las recetas más repetidas y con mejor balance médico/emocional</small>
            </div>
          </div>
          <small className="text-body-secondary text-end" aria-live="polite">Mostrando {visibles.length} de 12 recetas guardadas</small>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-xxl-4 g-3">
          {visibles.map((p) => (
            <div className="col fv-col" key={p.id}>
              <PlatoCard
                plato={p}
                favorito={favs.includes(p.id)}
                alCorazon={alternarCorazon}
                alCocinar={(pl) => notify(`¡A cocinar! "${pl.titulo}" agregado a tu plan de hoy`)}
                alAviso={notify}
              />
            </div>
          ))}
        </div>
        {visibles.length === 0 && (
          <p className="text-center text-body-secondary py-4 mb-0">Ningún plato coincide con tu búsqueda o filtros.</p>
        )}
      </section>

      {/* Historial + panel lateral */}
      <div className="row g-4">
        <section className="col-xl-8" id="historial" aria-labelledby="histTitle">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div className="d-flex align-items-center gap-3">
              <span className="fv-sec-icon is-grey"><i className="bi bi-graph-up-arrow"></i></span>
              <div>
                <h3 className="nd-h3 mb-0" id="histTitle">Historial de Decisiones Recientes</h3>
                <small className="text-body-secondary">Momentos en que NutriDecide desbloqueó tu comida sin fricción</small>
              </div>
            </div>
            <button type="button" className="btn btn-link nd-text-primary fw-bold small text-decoration-none p-0 text-nowrap" onClick={() => window.print()}>
              <i className="bi bi-download me-1"></i>Exportar PDF
            </button>
          </div>

          <div className="fv-timeline">
            {HISTORIAL.map((e) => (
              <article className="fv-event" key={e.id} style={{ '--dot': e.color }}>
                <div className="d-flex flex-wrap justify-content-between gap-2">
                  <span className="fv-when" style={e.cuandoColor ? { color: e.cuandoColor } : undefined}><i className={`bi ${e.icono} me-1`}></i>{e.cuando}</span>
                  <span className={`fv-tag ${e.tagClase}`}>{e.tag}</span>
                </div>
                <h4 className="fv-evtitle">{e.titulo}</h4>
                <p className="text-body-secondary mb-3">{e.texto}</p>
                <div className="fv-evbox">
                  {e.items.map((it) => (
                    <span key={it.texto}>{it.icono && <i className={`bi ${it.icono}`}></i>}{it.texto}</span>
                  ))}
                  {e.extra && <span className="w-100 fw-normal">{e.extra}</span>}
                </div>
              </article>
            ))}
          </div>

          <button className="fv-more mt-4" type="button" onClick={() => notify('Aún no hay más registros en el prototipo')}>
            <i className="bi bi-clock-history me-2"></i>Cargar historial anterior (Últimos 30 días)
          </button>
        </section>

        <aside className="col-xl-4 d-flex flex-column gap-4">
          <section className="nd-panel p-3 p-xl-4" id="patron" aria-labelledby="patTitle">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="nd-h3 mb-0" id="patTitle"><i className="bi bi-bullseye nd-text-primary me-2"></i>Tu Patrón de Decisión</h3>
              <span className="badge" style={{ background: 'var(--nd-chip)', color: 'var(--nd-muted)' }}>Este Mes</span>
            </div>
            <p className="text-body-secondary">Cómo la inteligencia culinaria de NutriDecide reduce la fatiga mental y protege tu presupuesto familiar:</p>
            <div className="d-flex flex-column gap-3">
              <div className="fv-stat">
                <span className="nd-icon-box" style={{ background: '#ffdad3', color: 'var(--nd-primary)' }}><i className="bi bi-lightning-charge"></i></span>
                <div>
                  <div className="fv-stat-big">88%<small>{'de decisiones en < 1 min'}</small></div>
                  <p className="small text-body-secondary mb-0 mt-1">Eliminando la parálisis por análisis ante la nevera y el estrés de última hora.</p>
                </div>
              </div>
              <div className="fv-stat">
                <span className="nd-icon-box nd-ib-green"><i className="bi bi-basket3"></i></span>
                <div>
                  <div className="nd-cap" style={{ fontSize: '.66rem' }}>Ingrediente predilecto</div>
                  <div className="fw-bold">Quinoa &amp; Aguacate Fresco</div>
                  <p className="small text-body-secondary mb-0">Presente en el 42% de tus almuerzos con reporte de digestión óptima.</p>
                </div>
              </div>
              <div className="fv-stat">
                <span className="nd-icon-box nd-ib-coral"><i className="bi bi-bank"></i></span>
                <div>
                  <div className="fv-stat-big">+$284.50<small>Ahorro acumulado</small></div>
                  <p className="small text-body-secondary mb-0 mt-1">Comparado con alternativas de comida a domicilio o pedidos imprevistos.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="fv-pro p-3 p-xl-4" aria-labelledby="proTitle">
            <div className="d-flex align-items-center gap-2 mb-3 nd-text-primary fw-bold small text-uppercase"><i className="bi bi-lightbulb"></i>Recomendación proactiva</div>
            <h3 className="nd-h3 mb-3" id="proTitle" style={{ fontSize: '1.35rem', lineHeight: 1.3 }}>¿Quieres variar tu repertorio culinario esta semana?</h3>
            <p className="text-body-secondary">Descubrimos 3 recetas nuevas 100% compatibles con tu celiaquía y con ingredientes que ya tienes en tu despensa.</p>
            <a href={PAGINAS_HTML.descubrir} className="btn nd-btn-primary mt-2">
              Explorar Nuevos Sabores <i className="bi bi-arrow-right ms-1"></i>
            </a>
          </section>
        </aside>
      </div>
    </Layout>
  );
}
