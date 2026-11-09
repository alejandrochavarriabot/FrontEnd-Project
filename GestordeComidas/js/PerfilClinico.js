document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const toast = bootstrap.Toast.getOrCreateInstance($("#appToast"), { delay: 2500 });
  const notify = (msg) => { $("#appToastBody").textContent = msg; toast.show(); };

  // Barras de progreso animadas
  requestAnimationFrame(() => {
    document.querySelectorAll(".progress-bar[data-value]").forEach((b) => (b.style.width = b.dataset.value + "%"));
  });

  // Contador de restricciones
  const updateCount = () => {
    const n = document.querySelectorAll("[data-restriction]").length;
    $("#restrictionCount").textContent = `${n} registrada${n === 1 ? "" : "s"}`;
  };
  updateCount();

  // Tolerancia cero trazas
  $("#zeroTraces").addEventListener("change", (e) => {
    $("#zeroTracesLabel").innerHTML = e.target.checked
      ? '<i class="bi bi-patch-check me-1"></i>Tolerancia cero trazas (&lt; 5 ppm)'
      : '<i class="bi bi-exclamation-circle me-1"></i>Trazas permitidas: desactivar solo con indicación médica';
  });

  // Etiquetas: eliminar (delegación) y añadir
  const tagList = $("#tagList");
  tagList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) btn.closest(".nd-tag").remove();
  });
  $("#tagForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#tagInput");
    const name = input.value.trim();
    if (!name) return input.focus();
    const tag = document.createElement("span");
    tag.className = "nd-tag";
    const icon = document.createElement("i");
    icon.className = "bi bi-slash-circle nd-text-secondary";
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Eliminar " + name);
    btn.innerHTML = '<i class="bi bi-x-lg"></i>';
    tag.append(icon, document.createTextNode(name), btn); // textContent seguro: evita inyectar HTML
    tagList.append(tag);
    input.value = "";
  });

  // Registro de síntomas
  const levels = {
    ok:     { cls: "", icon: "bi bi-check-circle-fill nd-text-green fs-4", title: "Todo en orden • Digestión ligera", text: "0 molestias ni hinchazón postprandial registradas.", streak: "7 días sin incidentes" },
    mild:   { cls: "is-mild", icon: "bi bi-exclamation-circle-fill text-warning fs-4", title: "Molestia leve registrada", text: "Revisa si hubo contaminación cruzada o ingredientes nuevos.", streak: "Racha reiniciada" },
    severe: { cls: "is-severe", icon: "bi bi-exclamation-triangle-fill nd-text-primary fs-4", title: "Síntomas fuertes registrados", text: "Contacta a tu gastroenteróloga y conserva el detalle de lo que comiste.", streak: "Racha reiniciada" },
  };
  $("#symptomOptions").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-level]");
    if (!btn) return;
    const l = levels[btn.dataset.level];
    $("#digestiveStatus").className = "nd-status d-flex align-items-center gap-3 p-3 " + l.cls;
    $("#statusIcon").className = l.icon;
    $("#statusTitle").textContent = l.title;
    $("#statusText").textContent = l.text;
    $("#streakLabel").innerHTML = '<span class="nd-dot nd-dot-green"></span> ' + l.streak;
    bootstrap.Modal.getInstance($("#symptomModal")).hide();
    notify("Registro guardado en tu bitácora.");
  });

  // Acciones de demostración
  $("#surpriseBtn").addEventListener("click", () => {
    const ideas = ["Bowl de quinoa y aguacate", "Salmón al romero con batata", "Crema de calabaza y jengibre"];
    notify("Prueba hoy: " + ideas[Math.floor(Math.random() * ideas.length)]);
  });
  $("#exportBtn").addEventListener("click", () => notify("Ficha nutricional lista para descargar (demo)."));
  $("#addRestrictionBtn").addEventListener("click", () => { $("#tagInput").scrollIntoView({ behavior: "smooth", block: "center" }); $("#tagInput").focus(); });

  // Filtro rápido en el buscador: resalta etiquetas que coincidan
  $("#searchInput").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll(".nd-tag").forEach((t) => {
      t.style.outline = q && t.textContent.toLowerCase().includes(q) ? "2px solid var(--nd-primary)" : "";
    });
  });

  // Navegación activa (demo)
  document.querySelectorAll(".nd-sidebar .nav .nd-nav").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".nd-sidebar .nav .nd-nav").forEach((x) => { x.classList.remove("active"); x.removeAttribute("aria-current"); });
      a.classList.add("active"); a.setAttribute("aria-current", "page");
    })
  );
});