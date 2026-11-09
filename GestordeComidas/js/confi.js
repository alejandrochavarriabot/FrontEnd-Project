document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const toast = bootstrap.Toast.getOrCreateInstance($("#obToast"), { delay: 2500 });
  const notify = (msg) => { $("#obToastBody").textContent = msg; toast.show(); };

  const grid = $("#allergyGrid");
  const none = $("#noneOption");
  const allergies = () => $$('#allergyGrid input[type="checkbox"]:not(#noneOption)');

  // "Ninguna alergia" es excluyente con el resto
  grid.addEventListener("change", (e) => {
    if (e.target === none && none.checked) {
      allergies().forEach((c) => (c.checked = false));
    } else if (e.target !== none && e.target.checked) {
      none.checked = false;
    }
  });

  // Enfoque nutricional: selección única
  const pills = $$("#dietPills .ob-pill");
  $("#dietPills").addEventListener("click", (e) => {
    const pill = e.target.closest(".ob-pill");
    if (!pill) return;
    pills.forEach((p) => {
      const on = p === pill;
      p.classList.toggle("active", on);
      p.setAttribute("aria-checked", on);
      const icon = p.querySelector("i");
      if (icon) icon.remove();
      if (on) p.insertAdjacentHTML("afterbegin", '<i class="bi bi-check-lg"></i>');
    });
  });

  // Condiciones personalizadas
  const collapse = new bootstrap.Collapse($("#customCollapse"), { toggle: false });
  const toggleCustom = $("#toggleCustom");
  toggleCustom.addEventListener("click", () => {
    const open = toggleCustom.getAttribute("aria-expanded") === "true";
    open ? collapse.hide() : (collapse.show(), setTimeout(() => $("#customInput").focus(), 200));
    toggleCustom.setAttribute("aria-expanded", String(!open));
  });
  $("#customForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#customInput");
    const name = input.value.trim();
    if (!name) return input.focus();
    none.checked = false;
    const chip = document.createElement("span");
    chip.className = "ob-custom-chip";
    chip.dataset.custom = name;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Quitar " + name);
    btn.innerHTML = '<i class="bi bi-x-lg"></i>';
    btn.addEventListener("click", () => chip.remove());
    chip.append(document.createTextNode(name), btn); // texto plano: evita inyectar HTML
    $("#customList").append(chip);
    input.value = "";
    input.focus();
  });

  // Recolectar respuestas del paso
  const collect = () => ({
    alergias: $$('#allergyGrid input:checked').map((c) => c.value),
    otras: $$("[data-custom]").map((c) => c.dataset.custom),
    enfoque: $("#dietPills .active")?.textContent.trim() ?? null,
    ceroTrazas: $("#zeroTraces").checked,
  });

  // Continuar (simulación; sustituye por tu lógica real)
  const next = $("#nextBtn");
  next.addEventListener("click", () => {
    const data = collect();
    if (!data.alergias.length && !data.otras.length) {
      notify("Selecciona al menos una opción o marca «Ninguna alergia clínica».");
      return;
    }
    try { sessionStorage.setItem("nutridecide:onboarding:paso2", JSON.stringify(data)); } catch (_) {}
    next.disabled = true;
    $(".spinner-border", next).classList.remove("d-none");
    $(".arrow", next).classList.add("d-none");
    $(".label", next).textContent = "Guardando…";
    setTimeout(() => {
      next.disabled = false;
      $(".spinner-border", next).classList.add("d-none");
      $(".arrow", next).classList.remove("d-none");
      $(".label", next).textContent = "Continuar a Presupuesto y Tiempo";
      notify("Paso 2 guardado. Aquí iría el paso 3.");
    }, 900);
  });

  $("#backBtn").addEventListener("click", () => notify("Volverías al paso 1 (Objetivo)."));
  $("#saveExit").addEventListener("click", () => {
    try { sessionStorage.setItem("nutridecide:onboarding:paso2", JSON.stringify(collect())); } catch (_) {}
    notify("Progreso guardado. Puedes retomarlo cuando quieras.");
  });
});