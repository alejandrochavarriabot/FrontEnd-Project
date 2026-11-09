/* Vista 7 - Favoritos e Historial */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const cols = $$("#dishGrid .fv-col");
  const estado = { tab: "favoritos", chips: new Set(), texto: "" };

  const reglas = {
    eco:  (c) => parseFloat(c.dataset.price) < 6,   // Económicos (< $6)
    fast: (c) => parseInt(c.dataset.min, 10) < 20,  // Rápidos (< 20 min)
    hot:  (c) => c.dataset.hot === "1"              // Antojo caliente
  };

  function aplicar() {
    let visibles = 0;
    cols.forEach((c) => {
      let ok = c.dataset.title.includes(estado.texto);
      estado.chips.forEach((f) => { if (!reglas[f](c)) ok = false; });
      if (estado.tab === "express" && !(parseInt(c.dataset.min, 10) < 15)) ok = false;
      c.hidden = !ok;
      if (ok) visibles++;
    });
    $("#showingCount").textContent = `Mostrando ${visibles} de 12 recetas guardadas`;
    $("#emptyMsg").hidden = visibles !== 0;
  }

  const irA = (sel) => {
    const el = $(sel);
    if (!el) return;
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
  };

  // Pestañas de arriba
  $("#topTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    $$("#topTabs .nav-link").forEach((b) => b.classList.toggle("active", b === btn));
    estado.tab = btn.dataset.tab;
    aplicar();
    if (estado.tab === "recientes") irA("#historial");
    else irA("#favoritos-sec");
  });

  // Pestañas dentro de la caja de filtros + enlace de estadísticas
  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (!go) return;
    if (go.closest("#segTabs")) $$("#segTabs .nav-link").forEach((b) => b.classList.toggle("active", b === go));
    irA(go.dataset.go);
  });

  // Chips de filtro (se pueden combinar)
  $("#chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    const f = chip.dataset.filter;
    const activo = !estado.chips.has(f);
    activo ? estado.chips.add(f) : estado.chips.delete(f);
    chip.classList.toggle("is-on-red", activo);
    chip.setAttribute("aria-pressed", activo);
    aplicar();
  });

  // Buscador por nombre de plato
  $("#searchInput").addEventListener("input", (e) => {
    estado.texto = e.target.value.trim().toLowerCase();
    aplicar();
  });

  // Corazón: quitar / volver a poner en favoritos
  $("#dishGrid").addEventListener("click", (e) => {
    const heart = e.target.closest(".fv-heart");
    if (heart) {
      const on = heart.getAttribute("aria-pressed") !== "true";
      heart.setAttribute("aria-pressed", on);
      heart.querySelector("i").className = on ? "bi bi-heart-fill" : "bi bi-heart";
      ndNotify(on ? "Agregado a favoritos" : "Quitado de favoritos");
      return;
    }
    const cook = e.target.closest("[data-cook]");
    if (cook) ndNotify(`¡A cocinar! "${cook.dataset.cook}" agregado a tu plan de hoy`);
  });

  $("#exportBtn").addEventListener("click", () => window.print());
  $("#moreBtn").addEventListener("click", () => ndNotify("Aún no hay más registros en el prototipo"));

  aplicar();
});
