/* Vista 6 - Mi Presupuesto */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const money = (n) => "$" + n.toFixed(2);

  const GASTADO = 77.5;   // suma de los gastos de Lun a Sáb (11.50+8.20+14.00+9.50+19.30+15.00)
  let limite = 120;       // límite semanal

  // Pinta de rojo los días que pasan del objetivo diario y mueve la línea punteada
  function pintarGrafico() {
    const objetivo = Math.floor(limite / 7);          // 120 / 7 = 17.14 -> línea en $17
    const max = Math.max(22, objetivo + 5);
    const plot = $("#plot");
    plot.style.setProperty("--lim", objetivo);
    plot.style.setProperty("--max", max);
    document.querySelectorAll(".pp-col[data-v]").forEach((col) => {
      const pico = parseFloat(col.dataset.v) > objetivo;
      col.classList.toggle("is-peak", pico);
      const label = document.querySelector(`[data-day-label="${col.dataset.day}"]`);
      if (label) label.classList.toggle("is-peak", pico);
    });
    $("#limitLabel").textContent = `Límite Diario: ${money(objetivo)}`;
    $("#legendLimit").textContent = `Objetivo diario (${money(objetivo)})`;
  }

  // Actualiza todas las cifras que dependen del límite semanal
  function pintarResumen() {
    const pct = Math.floor(Number(((GASTADO / limite) * 100).toFixed(6)));   // 64.58 -> 64 (como en el diseño)
    const libre = limite - GASTADO;
    const dentro = libre >= 0;
    $("#wkLimit").textContent = money(limite);
    $("#topLimit").textContent = "/ $" + Math.round(limite);
    $("#topRemaining").textContent = money(Math.max(libre, 0));
    $("#wkPct").textContent = `${pct}% utilizado`;
    $("#wkBar").style.width = Math.min(pct, 100) + "%";
    $("#wkTrack").setAttribute("aria-valuenow", Math.min(pct, 100));
    const avail = $("#wkAvail");
    avail.textContent = dentro ? `${money(libre)} disponible` : `Excedido por ${money(-libre)}`;
    avail.className = dentro ? "nd-text-green" : "nd-text-primary";
    $("#wkDaily").textContent = `Meta: ${money(limite / 7)}/día`;
    const badge = $("#wkBadge");
    badge.textContent = dentro ? "Dentro de lo planificado" : "Límite superado";
    badge.className = "badge text-wrap text-start " + (dentro ? "nd-badge-green" : "nd-badge-red");
    pintarGrafico();
  }

  // Modal "Ajustar límite"
  const input = $("#limitInput");
  const hint = $("#limitHint");
  input.addEventListener("input", () => {
    const v = parseFloat(input.value);
    hint.textContent = v > 0 ? `Meta diaria resultante: ${money(v / 7)}` : "";
  });
  $("#limitForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = parseFloat(input.value);
    if (!(v >= 10 && v <= 5000)) { input.classList.add("is-invalid"); return; }
    input.classList.remove("is-invalid");
    limite = v;
    pintarResumen();
    bootstrap.Modal.getInstance($("#limitModal")).hide();
    ndNotify("Límite semanal actualizado a " + money(limite));
  });
  $("#limitModal").addEventListener("show.bs.modal", () => { input.value = limite; input.classList.remove("is-invalid"); });

  // Selector de periodo (solo la semana tiene datos en este prototipo)
  $("#periodTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-period]");
    if (!btn) return;
    document.querySelectorAll("#periodTabs .nav-link").forEach((b) => b.classList.toggle("active", b === btn));
    if (btn.dataset.period !== "Esta Semana") ndNotify(`Vista "${btn.dataset.period}": aún sin datos en el prototipo`);
  });

  // El buscador de esta página solo avisa (no hay lista que filtrar)
  $("#searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") ndNotify("Búsqueda de gastos: próximamente");
  });

  pintarResumen();
});
