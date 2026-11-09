// Estrellas: 5.0 = cinco llenas; menos de 5 = cuatro llenas y una a medias
function Estrellas({ rating }) {
  const llenas = rating >= 5 ? 5 : 4;
  return (
    <span className="fv-stars" aria-hidden="true">
      {Array.from({ length: llenas }, (_, i) => <i key={i} className="bi bi-star-fill"></i>)}
      {rating < 5 && <i className="bi bi-star-half"></i>}
    </span>
  );
}

export default function PlatoCard({ plato, favorito, alCorazon, alCocinar, alAviso }) {
  const { titulo, img, min, precio, match, kcal, dieta, veces, rating, sensacion } = plato;
  return (
    <article className="fv-card">
      <div className="fv-img">
        {img ? (
          <img src={img} alt={titulo} loading="lazy" />
        ) : (
          <div className="fv-ph" aria-hidden="true"><i className="bi bi-egg-fried"></i></div>
        )}
        <span className="fv-chip-img fv-time">{min} min</span>
        <span className="fv-chip-img fv-price">${precio.toFixed(2)} / ración</span>
        <button
          className="fv-heart"
          type="button"
          aria-pressed={favorito}
          aria-label={(favorito ? 'Quitar ' : 'Agregar ') + titulo + (favorito ? ' de favoritos' : ' a favoritos')}
          onClick={() => alCorazon(plato)}
        >
          <i className={favorito ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
        </button>
        <span className="fv-chip-img fv-match">{match}</span>
        <span className="fv-chip-img fv-kcal">{kcal} kcal</span>
      </div>

      <div className="fv-body">
        <div className="d-flex justify-content-between gap-2">
          <span className="fv-diet"><i className="bi bi-shield-check"></i><span>{dieta}</span></span>
          <span className="fv-times">Cocinado<br />{veces}x</span>
        </div>
        <h4 className="fv-title">{titulo}</h4>
        <div className="d-flex justify-content-between align-items-center gap-2">
          <span className="d-flex align-items-center gap-1"><Estrellas rating={rating} /><strong className="small">{rating.toFixed(1)}</strong></span>
          <span className="fv-feel"><span className="nd-dot" style={{ background: 'var(--nd-muted)', width: 4, height: 4 }}></span>{sensacion}</span>
        </div>
        <div className="fv-actions">
          <button className="btn nd-btn-primary" type="button" onClick={() => alCocinar(plato)}>
            <i className="bi bi-cup-hot me-1"></i>Cocinar de nuevo
          </button>
          <button className="btn btn-ic" type="button" aria-label="Ajustar receta" onClick={() => alAviso('Ajustes de receta: próximamente')}>
            <i className="bi bi-sliders"></i>
          </button>
          <button className="btn btn-ic" type="button" aria-label="Guardar en colección" onClick={() => alAviso('Guardado en tu colección')}>
            <i className="bi bi-folder2"></i>
          </button>
        </div>
      </div>
    </article>
  );
}
