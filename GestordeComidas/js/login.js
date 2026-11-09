document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const remember = document.getElementById("remember");
  const submitBtn = document.getElementById("submitBtn");
  const alertBox = document.getElementById("formAlert");
  const toggleBtn = document.getElementById("togglePassword");
  const toastEl = document.getElementById("socialToast");
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Recordar correo
  try {
    const saved = localStorage.getItem("savorhealth:email");
    if (saved) email.value = saved;
  } catch (_) { /* almacenamiento no disponible */ }

  // Mostrar / ocultar contraseña
  toggleBtn.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    toggleBtn.querySelector("i").className = show ? "bi bi-eye-slash" : "bi bi-eye";
    toggleBtn.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
  });

  // Inicio con redes sociales (demo)
  document.querySelectorAll("[data-social]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("socialToastBody").textContent =
        `El acceso con ${btn.dataset.social} aún no está conectado.`;
      toast.show();
    });
  });

  // Envío del formulario con validación de Bootstrap
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alertBox.classList.add("d-none");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      return;
    }

    setLoading(true);

    // Simulación de petición; reemplázala por tu fetch() real
    setTimeout(() => {
      try {
        if (remember.checked) localStorage.setItem("savorhealth:email", email.value);
        else localStorage.removeItem("savorhealth:email");
      } catch (_) {}

      setLoading(false);
      alertBox.textContent = "Sesión iniciada. Cargando tu plan culinario…";
      alertBox.classList.remove("d-none");
    }, 1200);
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.querySelector(".spinner-border").classList.toggle("d-none", !on);
    submitBtn.querySelector(".btn-arrow").classList.toggle("d-none", on);
    submitBtn.querySelector(".btn-text").textContent = on ? "Ingresando…" : "Ingresar a mi plan culinario";
  }
});