

// 1. Menu lateral

const paginaActual = document.body.dataset.page;
const menu = document.getElementById("menu");

if (menu) {
    menu.innerHTML = `
        <a href="descubrir.html" class="logo">
            <i class="bi bi-cup-hot-fill"></i>
            <div>
                <b>NutriDecide</b>
                <small>Plan Consciente</small>
            </div>
        </a>

        <a href="descubrir.html" class="enlace-menu">
            <i class="bi bi-compass-fill"></i>
            Descubrir
        </a>

        <a href="asistente.html" class="enlace-menu">
            <i class="bi bi-stars"></i>
            Asistente Inteligente
        </a>

        <a href="dietas.html" class="enlace-menu">
            <i class="bi bi-shield-plus"></i>
            Mis Dietas y Salud
        </a>

        <a href="presupuesto.html" class="enlace-menu">
            <i class="bi bi-wallet2"></i>
            Mi Presupuesto
        </a>

        <a href="favoritos.html" class="enlace-menu">
            <i class="bi bi-bookmark"></i>
            Favoritos e Historial
        </a>
    `;
}

// 2. Barra superior

const barra = document.getElementById("barra-superior");

if (barra) {
    barra.innerHTML = `
        <div class="saludo">
            <h6>¡Hola, Luna! 👋</h6>
            <small>¿Qué te apetece comer hoy sin complicaciones?</small>
        </div>

        <div class="buscador">
            <i class="bi bi-search"></i>
            <input class="form-control" placeholder="Buscar por ingrediente, receta o ...">
        </div>

        <div class="presupuesto">
            <span class="cartera">
                <i class="bi bi-wallet2"></i>
            </span>

            <div class="flex-grow-1">
                <b>Presupuesto</b>
                &nbsp;
                <b>$10.000</b> / 25.000
                <div class="progreso">
                    <i></i>
                </div>
            </div>
        </div>

        <i class="bi bi-bell campana fs-5"></i>
        <i class="bi bi-heart fs-5"></i>
    `;
}

// 3. Antojos

const antojos = document.querySelectorAll(".antojo");

antojos.forEach(function(antojo) {
    antojo.addEventListener("click", function() {

        antojos.forEach(function(otroAntojo) {
            otroAntojo.classList.remove("seleccionado");
        });

        antojo.classList.add("seleccionado");
    });
});

// 4. Botón ¡Sorpréndeme!

const sorpresa = document.getElementById("boton-sorpresa");

if (sorpresa) {
    sorpresa.addEventListener("click", function(e) {

        e.preventDefault();

        const recetas = [
            "Bowl Mediterráneo",
            "Tacos Saludables de pollo",
            "Pasta Cremosa de tomate"
        ];

        const numero = Math.floor(Math.random() * recetas.length);

        alert("🎲 Hoy te toca: " + recetas[numero]);
    });
}

// 5. Imágenes

const imagenes = document.querySelectorAll(".imagen-receta img");

imagenes.forEach(function(imagen) {
    imagen.addEventListener("error", function() {
        imagen.style.visibility = "hidden";
    });
});