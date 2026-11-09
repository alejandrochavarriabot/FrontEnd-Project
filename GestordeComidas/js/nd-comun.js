/* Funciones compartidas por presupuesto.html y favoritos.html */
(function () {
  const $ = (s, r = document) => r.querySelector(s);

  // Aviso emergente (toast) reutilizable: ndNotify("mensaje")
  window.ndNotify = function (msg) {
    const el = $("#appToast");
    if (!el) return;
    $("#appToastBody").textContent = msg;
    bootstrap.Toast.getOrCreateInstance(el, { delay: 2800 }).show();
  };

  // Botón "Sorpréndeme": sugiere un plato al azar de los favoritos
  const sugerencias = [
    "Salmón Glaseado al Limón con Espárragos",
    "Bowl Mediterráneo de Quinoa y Aguacate",
    "Tacos Saludables de Pollo y Yogur Griego",
    "Crema Suave de Calabaza & Semillas Tostadas"
  ];
  const btn = $("#surpriseBtn");
  if (btn) btn.addEventListener("click", () => {
    const pick = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    window.ndNotify("¡Sorpresa! Hoy te toca: " + pick);
  });

  // Botones que solo muestran un aviso (data-notify="texto")
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-notify]");
    if (t) window.ndNotify(t.dataset.notify);
  });
})();
