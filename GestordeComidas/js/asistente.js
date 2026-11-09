

const tiempo = document.getElementById("tiempo");
const presupuesto = document.getElementById("presupuesto");

const valorTiempo = document.getElementById("valor-tiempo");
const valorPresupuesto = document.getElementById("valor-presupuesto");

const estadoPlan = document.getElementById("estado-plan");
const afinidad = document.getElementById("afinidad");

const chipsTiempo = document.querySelectorAll("#chips-tiempo .chip");
const chipsPresupuesto = document.querySelectorAll("#chips-presupuesto .chip");

const antojos = document.querySelectorAll(".opcion-antojo");
const porciones = document.querySelectorAll(".opcion-porcion");

const interruptores = document.querySelectorAll(".interruptor input");

let presupuestoAnterior = 8.5;



function pintarRelleno(barra) {

    const porcentaje = (barra.value - barra.min) * 100 / (barra.max - barra.min);

    barra.style.setProperty("--relleno", porcentaje + "%");
}


function marcarChips(chips, valor) {

    chips.forEach(function(chip) {

        if (valor >= chip.dataset.min && valor <= chip.dataset.max) {
            chip.classList.add("activo");
        } else {
            chip.classList.remove("activo");
        }

    });
}


function actualizarAfinidad() {

    let a = 99
        - Math.abs(tiempo.value - 25) / 5
        - Math.abs(presupuesto.value - 8.5) / 3;

    a = Math.max(80, Math.min(99, Math.round(a)));

    afinidad.textContent = a;
}


function actualizarTiempo() {

    valorTiempo.textContent = tiempo.value;

    pintarRelleno(tiempo);

    marcarChips(chipsTiempo, +tiempo.value);

    actualizarAfinidad();
}


function actualizarPresupuesto() {

    const v = +presupuesto.value;

    valorPresupuesto.textContent = "$" + v.toFixed(2);

    pintarRelleno(presupuesto);

    marcarChips(chipsPresupuesto, v);

    const dentro = v <= 15;

    if (dentro) {
        estadoPlan.textContent = "Dentro del plan";
        estadoPlan.style.background = "#dff3e8";
        estadoPlan.style.color = "#1f7a5a";
    } else {
        estadoPlan.textContent = "Sobre tu promedio";
        estadoPlan.style.background = "#fde3e8";
        estadoPlan.style.color = "#b5174b";
    }

    actualizarAfinidad();
}


function elegir(lista, elemento) {

    lista.forEach(function(x) {
        x.classList.remove("activo");
    });

    elemento.classList.add("activo");
}


function actualizarFila(interruptor) {

    const fila = interruptor.closest(".fila-ingrediente");

    if (interruptor.checked) {
        fila.classList.add("encendida");
    } else {
        fila.classList.remove("encendida");
    }

    if (interruptor.id === "caducar") {

        const etiqueta = document.getElementById("estado-caducar");

        if (interruptor.checked) {
            etiqueta.textContent = "ACTIVO";
            etiqueta.classList.remove("apagado");
        } else {
            etiqueta.textContent = "INACTIVO";
            etiqueta.classList.add("apagado");
        }
    }
}




tiempo.addEventListener("input", actualizarTiempo);

presupuesto.addEventListener("input", actualizarPresupuesto);




chipsTiempo.forEach(function(chip) {

    chip.addEventListener("click", function() {

        tiempo.value = chip.dataset.valor;

        actualizarTiempo();
    });

});




chipsPresupuesto.forEach(function(chip) {

    chip.addEventListener("click", function() {

        presupuesto.value = chip.dataset.valor;

        actualizarPresupuesto();
    });

});




antojos.forEach(function(antojo) {

    antojo.addEventListener("click", function() {

        elegir(antojos, antojo);
    });

});

porciones.forEach(function(porcion) {

    porcion.addEventListener("click", function() {

        elegir(porciones, porcion);
    });

});

interruptores.forEach(function(interruptor) {

    interruptor.addEventListener("change", function() {

        actualizarFila(interruptor);

        if (interruptor.id === "ahorro") {

            if (interruptor.checked) {

                presupuestoAnterior = +presupuesto.value;

                presupuesto.value = 4;

            } else {

                presupuesto.value = presupuestoAnterior;
            }

            actualizarPresupuesto();
        }

    });

});


const enlacesTiempo = document.querySelectorAll(".enlaces-tiempo a");

enlacesTiempo.forEach(function(enlace) {

    enlace.addEventListener("click", function(evento) {

        evento.preventDefault();

        enlacesTiempo.forEach(function(x) {
            x.classList.remove("activo");
        });

        enlace.classList.add("activo");
    });

});



document.getElementById("boton-limpiar").addEventListener("click", function() {

    tiempo.value = 25;

    presupuesto.value = 8.5;

    presupuestoAnterior = 8.5;

    elegir(antojos, antojos[0]);

    elegir(porciones, porciones[0]);

    interruptores.forEach(function(interruptor) {

        interruptor.checked = true;

        actualizarFila(interruptor);

    });

    actualizarTiempo();

    actualizarPresupuesto();
});



const recetas = {

    " Salado y caliente": [
        "Crema de zanahoria con huevo pochado",
        "Cremosa, tibia y lista con lo que ya tienes en tu despensa."
    ],

    "Fresco y ligero": [
        "Bowl Mediterráneo",
        "oCmbinación de tomates frescos, aceitunas, pepino y cebolla morada sobre quinua, complementado con garbanzos y queso parmesano."
    ],

    "Crujiente y Picante": [
        "Tacos saludables de pollo crocante",
        "Tacos de pechuga crocante, lechuga, guacamole y aderezo de yogur griego."
    ],

    "Dulce y energético": [
        "Avena cremosa con frutas",
        "Avena sin gluten, banano, fresas y un toque de canela."
    ],

    "Sabores intensos": [
        "Curry suave de garbanzos",
        "Hierbas aromáticas con arroz."
    ]

};


function mostrarResultado() {

    const antojo = document.querySelector(".opcion-antojo.activo").dataset.nombre;

    const porcion = document.querySelector(".opcion-porcion.activo").textContent.trim();

    const receta = recetas[antojo];

    document.getElementById("resultado-titulo").textContent = receta[0];

    document.getElementById("resultado-descripcion").textContent = receta[1];

    document.getElementById("resultado-resumen").textContent =
        "⏱ Hasta " + tiempo.value +
        " min · 💲 Hasta $" +
        (+presupuesto.value).toFixed(2) +
        " · 🍽 " + porcion;

    new bootstrap.Modal(
        document.getElementById("modalResultado")
    ).show();
}


document.getElementById("boton-decidir").addEventListener("click", mostrarResultado);



document.querySelectorAll(".boton-sorpresa").forEach(function(boton) {

    boton.addEventListener("click", function() {


        function azar(lista) {
            return lista[Math.floor(Math.random() * lista.length)];
        }

        tiempo.value = 10 + 5 * Math.floor(Math.random() * 11);

        presupuesto.value =
            3 + 0.5 * Math.floor(Math.random() * 45);

        elegir(antojos, azar(antojos));

        elegir(porciones, azar(porciones));

        actualizarTiempo();

        actualizarPresupuesto();

        mostrarResultado();
    });

});



actualizarTiempo();

actualizarPresupuesto();