import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Layout from '../components/Layout.jsx';
import { BellButton, HeartLink, MenuButton, SearchBox, TopLink } from '../components/TopbarParts.jsx';
import { useNotify } from '../context/NotifyContext.jsx';
import { CATEGORIAS, GASTADO, LIMITE_INICIAL, SEMANA } from '../data/presupuesto.js';
import { PLATOS } from '../data/favoritos.js';
import { PAGINAS_HTML } from '../components/Layout.jsx';

const dinero = (n) => '$' + n.toFixed(2);
const PERIODOS = ['Esta Semana', 'Mes Actual', 'Histórico'];

// Recetas de menos de $5, tomadas de los favoritos (así los precios nunca se contradicen)
const RECETAS_ECONOMICAS = PLATOS.filter((p) => p.precio < 5).sort((a, b) => a.precio - b.precio);

export default function Presupuesto() {
  const notify = useNotify();

  // Todo lo que cambia en pantalla vive en estos "estados"
  const [limite, setLimite] = useState(LIMITE_INICIAL);
  const [periodo, setPeriodo] = useState(PERIODOS[0]);
  const [verLimite, setVerLimite] = useState(false);
  const [verRecetas, setVerRecetas] = useState(false);
  const [borrador, setBorrador] = useState(String(LIMITE_INICIAL));
  const [errorLimite, setErrorLimite] = useState(false);

  // Todo lo demás se calcula a partir del límite
  const pct = Math.floor(Number(((GASTADO / limite) * 100).toFixed(6))); // 64.58 -> 64 (como en el diseño)
  const libre = limite - GASTADO;
  const dentro = libre >= 0;
  const objetivo = Math.floor(limite / 7); // 120 / 7 = 17.14 -> la línea punteada va en $17
  const escala = Math.max(22, objetivo + 5);
  const borradorNum = parseFloat(borrador);

  const abrirLimite = () => { setBorrador(String(limite)); setErrorLimite(false); setVerLimite(true); };

  const guardarLimite = (e) => {
    e.preventDefault();
    if (!(borradorNum >= 10 && borradorNum <= 5000)) { setErrorLimite(true); return; }
    setLimite(borradorNum);
    setVerLimite(false);
    notify('Límite semanal actualizado a ' + dinero(borradorNum));
  };

  const cambiarPeriodo = (p) => {
    setPeriodo(p);
    if (p !== PERIODOS[0]) notify(`Vista "${p}": aún sin datos en el prototipo`);
  };

  const topbar = (abrirMenu) => (
    <header className="nd-topbar sticky-top">
      <div className="d-flex align-items-center justify-content-between gap-3 px-3 px-lg-4 py-2">
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          <MenuButton onClick={abrirMenu} />
          <SearchBox
            placeholder="Buscar gastos, ingredientes o recetas..."
            maxWidth="22rem"
            onKeyDown={(e) => e.key === 'Enter' && notify('Búsqueda de gastos: próximamente')}
          />
          <nav className="d-none d-xl-flex gap-4 ms-3" aria-label="Vistas">
            <TopLink href={PAGINAS_HTML.asistente}>Hoy</TopLink>
            <TopLink activo>Semanario</TopLink>
            <TopLink>Despensa</TopLink>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="nd-budget d-none d-md-inline-flex">
            <span className="nd-dot"></span> Restante: <strong>{dinero(Math.max(libre, 0))}</strong> <span>/ ${Math.round(limite)}</span>
          </span>
          <HeartLink />
          <BellButton />
        </div>
      </div>
    </header>
  );

  return (
    <Layout
      insignia={<small className="nd-text-green fw-semibold"><span className="nd-dot"></span>Plan Vital Saludable</small>}
      sorpresaIcono="bi-stars"
      sorpresaTexto="Sorpréndeme"
      topbar={topbar}
    >
      {/* Encabezado */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3">
        <div>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <h2 className="nd-h1 mb-0">Gestión de Presupuesto</h2>
            <span className="badge nd-badge-green">Semana 18: Saludable &amp; Eficiente</span>
          </div>
          <p className="text-body-secondary mb-0">Equilibrio entre nutrición de alta calidad y control de gastos conscientes.</p>
        </div>
        <ul className="nav pp-periods" aria-label="Periodo">
          {PERIODOS.map((p) => (
            <li className="nav-item" key={p}>
              <button type="button" className={'nav-link' + (p === periodo ? ' active' : '')} onClick={() => cambiarPeriodo(p)}>{p}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tres tarjetas resumen */}
      <section className="row g-3" aria-label="Resumen del presupuesto">
        <div className="col-lg-4">
          <article className="nd-panel p-3 p-xl-4 h-100 d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <div className="nd-cap mb-2">Presupuesto semanal</div>
                <div className="pp-amount">{dinero(GASTADO)} <small>/ {dinero(limite)}</small></div>
              </div>
              <span className={'badge text-wrap text-start ' + (dentro ? 'nd-badge-green' : 'nd-badge-red')} style={{ maxWidth: '9rem' }}>
                {dentro ? 'Dentro de lo planificado' : 'Límite superado'}
              </span>
            </div>
            <div>
              <div className="progress pp-track" role="progressbar" aria-label="Presupuesto utilizado" aria-valuenow={Math.min(pct, 100)} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar pp-bar-red" style={{ width: Math.min(pct, 100) + '%' }}></div>
              </div>
              <div className="d-flex justify-content-between pp-sub mt-2">
                <span>{pct}% utilizado</span>
                <span className={dentro ? 'nd-text-green' : 'nd-text-primary'}>
                  {dentro ? `${dinero(libre)} disponible` : `Excedido por ${dinero(-libre)}`}
                </span>
              </div>
            </div>
            <div className="pp-divider pt-3 mt-auto d-flex justify-content-between align-items-center pp-sub">
              <span>Meta: {dinero(limite / 7)}/día</span>
              <button type="button" className="pp-link" onClick={abrirLimite}>Ajustar Límite <i className="bi bi-sliders ms-1"></i></button>
            </div>
          </article>
        </div>

        <div className="col-lg-4">
          <article className="nd-panel p-3 p-xl-4 h-100 d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="nd-cap mb-2">Ahorro vs. comer fuera</div>
                <div className="pp-amount nd-text-green">+$84.20 <span className="badge nd-badge-green fw-semibold align-middle ms-1" style={{ fontSize: '.75rem' }}>Ahorrado</span></div>
              </div>
              <span className="nd-icon-box nd-ib-green"><i className="bi bi-piggy-bank-fill"></i></span>
            </div>
            <div className="pp-note d-flex align-items-center gap-3 p-3">
              <i className="bi bi-cup-hot nd-text-secondary fs-5"></i>
              <span><strong>4 comidas caseras optimizadas nutricionalmente esta semana.</strong></span>
            </div>
            <div className="pp-divider pt-3 mt-auto d-flex justify-content-between pp-sub">
              <span>Impacto mensual estimado</span><span className="text-body">~$336.80</span>
            </div>
          </article>
        </div>

        <div className="col-lg-4">
          <article className="nd-panel p-3 p-xl-4 h-100 d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="nd-cap mb-2">Costo promedio por ración</div>
                <div className="pp-amount">$3.85 <small>/plato</small></div>
              </div>
              <span className="nd-icon-box nd-ib-coral"><i className="bi bi-pie-chart"></i></span>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between pp-sub"><span className="text-body">NutriDecide casero</span><span className="nd-text-green">$3.85</span></div>
              <div className="progress pp-track" style={{ height: '.45rem' }} role="progressbar" aria-label="Costo casero frente a delivery" aria-valuenow="27" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar pp-bar-green" style={{ width: '27%' }}></div>
              </div>
              <div className="d-flex justify-content-between pp-sub"><span>Promedio Delivery/Restaurante</span><span>$14.50</span></div>
            </div>
            <div className="pp-divider pt-3 mt-auto d-flex justify-content-between pp-sub">
              <span>Ratio de eficiencia</span><span className="nd-text-primary fw-bold">3.7x más económico</span>
            </div>
          </article>
        </div>
      </section>

      {/* Gráfico semanal */}
      <section className="nd-panel p-3 p-xl-4" aria-labelledby="chartTitle">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
          <div>
            <h3 className="nd-h3 mb-1" id="chartTitle">Evolución de Gastos vs. Límite Diario</h3>
            <p className="text-body-secondary small mb-0">Seguimiento de compras de ingredientes y preparaciones diarias.</p>
          </div>
          <div className="pp-legend d-flex flex-wrap align-items-start gap-3">
            <span><span className="pp-swatch" style={{ background: '#38654a' }}></span>Dentro de meta</span>
            <span><span className="pp-swatch" style={{ background: '#a92a4d' }}></span>Día pico</span>
            <span><span className="pp-swatch-dash"></span>Objetivo diario ({dinero(objetivo)})</span>
          </div>
        </div>

        <div
          className="pp-plot"
          style={{ '--lim': objetivo, '--max': escala }}
          role="img"
          aria-label={'Gasto diario: ' + SEMANA.map((d) => `${d.dia} ${d.valor.toFixed(2)}`).join(', ') + '. Domingo aún sin gastos.'}
        >
          <div className="pp-limit"><span>Límite Diario: {dinero(objetivo)}</span></div>
          <div className="pp-cols">
            {SEMANA.map(({ dia, valor }) => (
              <div key={dia} className={'pp-col' + (valor > objetivo ? ' is-peak' : '')} title={`${dia}: ${dinero(valor)}`}>
                <span className="pp-val">{dinero(valor)}</span>
                <div className="pp-bar" style={{ '--v': valor }}></div>
              </div>
            ))}
            <div className="pp-col is-today" title="Hoy">
              <span className="pp-val">Hoy</span>
              <div className="pp-bar" style={{ '--v': 1.6 }}></div>
            </div>
          </div>
        </div>
        <div className="pp-days" aria-hidden="true">
          {SEMANA.map(({ dia, valor }) => (
            <span key={dia} className={valor > objetivo ? 'is-peak' : ''}>{dia}</span>
          ))}
          <span>Dom</span>
        </div>
      </section>

      {/* Categorías + micro-asistente */}
      <div className="row g-3">
        <section className="col-lg-7" aria-labelledby="catTitle">
          <div className="nd-panel p-3 p-xl-4 h-100 d-flex flex-column gap-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h3 className="nd-h3 mb-1" id="catTitle">Gastos por Categoría Culinaria</h3>
                <p className="text-body-secondary small mb-0">Distribución equilibrada para nutrición óptima.</p>
              </div>
              <button className="btn nd-icon-btn" aria-label="Filtrar categorías" onClick={() => notify('Filtros de categoría: próximamente')}>
                <i className="bi bi-sliders2"></i>
              </button>
            </div>
            <div className="d-flex flex-column gap-3 mt-auto">
              {CATEGORIAS.map((c) => (
                <div className="pp-cat" key={c.nombre} style={{ '--c': c.color }}>
                  <div className="d-flex justify-content-between align-items-baseline gap-3 mb-1">
                    <span className="fw-semibold"><span className="pp-cat-dot"></span>{c.nombre}</span>
                    <span className="text-nowrap"><strong>{dinero(c.monto)}</strong> <span className="text-body-secondary">({c.pct}%)</span></span>
                  </div>
                  <div className="progress" role="progressbar" aria-label={c.nombre} aria-valuenow={c.pct} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: c.pct + '%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-lg-5" aria-labelledby="assistTitle">
          <div className="nd-panel pp-assist p-3 p-xl-4 h-100 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="nd-icon-box nd-ib-red" style={{ width: 32, height: 32, fontSize: '1rem' }}><i className="bi bi-lightbulb-fill"></i></span>
              <span className="pp-assist-eyebrow">Micro-asistente de ahorro</span>
            </div>
            <h3 className="nd-h3 mb-0" id="assistTitle" style={{ fontSize: '1.3rem' }}>Próxima Decisión Culinaria</h3>
            <p className="pp-assist-box p-3 mb-0">
              Tienes <strong>quinoa y calabacín</strong> en despensa. Si tu próxima comida cuesta menos de <span className="nd-text-green">$4.50</span>, terminarás la semana ahorrando <span className="nd-text-primary">$12 adicionales</span>.
            </p>
            <button className="btn nd-btn-primary w-100 mt-2" onClick={() => setVerRecetas(true)}>
              <i className="bi bi-fork-knife me-2"></i>{'Ver 3 recetas ultra-económicas (< $5)'}
            </button>
            <p className="text-center text-body-secondary small mb-0">Calculado según tus ingredientes sin gluten en despensa</p>
          </div>
        </aside>
      </div>

      {/* Ventana: ajustar límite */}
      <Modal show={verLimite} onHide={() => setVerLimite(false)} centered contentClassName="nd-modal" aria-labelledby="limitTitle">
        <form onSubmit={guardarLimite} noValidate>
          <Modal.Header closeButton className="border-0">
            <Modal.Title as="h5" className="fw-bold" id="limitTitle">Ajustar límite semanal</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <label htmlFor="limitInput" className="form-label fw-semibold">Nuevo límite (USD por semana)</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                id="limitInput"
                type="number"
                className={'form-control' + (errorLimite ? ' is-invalid' : '')}
                min="10" max="5000" step="0.5"
                value={borrador}
                onChange={(e) => { setBorrador(e.target.value); setErrorLimite(false); }}
                required
              />
              <div className="invalid-feedback">Escribe un monto entre 10 y 5000.</div>
            </div>
            <p className="small text-body-secondary mt-2 mb-0">{borradorNum > 0 ? `Meta diaria resultante: ${dinero(borradorNum / 7)}` : ''}</p>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <button type="button" className="btn nd-btn-light" onClick={() => setVerLimite(false)}>Cancelar</button>
            <button type="submit" className="btn nd-btn-primary">Guardar límite</button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Ventana: recetas ultra-económicas */}
      <Modal show={verRecetas} onHide={() => setVerRecetas(false)} centered contentClassName="nd-modal" aria-labelledby="recipesTitle">
        <Modal.Header closeButton className="border-0">
          <Modal.Title as="h5" className="fw-bold" id="recipesTitle">{'Recetas ultra-económicas (< $5)'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0 d-flex flex-column gap-2">
          {RECETAS_ECONOMICAS.map((r) => (
            <div className="nd-soft p-3 d-flex justify-content-between align-items-center" key={r.id}>
              <span className="fw-semibold">{r.titulo}</span>
              <span className="badge nd-badge-green">{dinero(r.precio)}</span>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Link to="/favoritos" className="btn nd-btn-primary">Ver en Favoritos</Link>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
