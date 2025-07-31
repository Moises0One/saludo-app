// Esta función determina el tipo de saludo según la hora actual
function obtenerSaludoPorHora() {
    const hora = new Date().getHours(); // Obtenemos la hora actual

    if (hora >= 6 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 18) return "Buenas tardes";
    return "Buenas noches"; // Saludo nocturno
}

// Función principal que se ejecuta al hacer clic en "Saludar"
function saludar() {
    const inputNombre = document.getElementById("nombre"); // Obtenemos el input
    const nombre = inputNombre.value.trim(); // Quitamos espacios
    const saludo = document.getElementById("saludo"); // Donde va el resultado

    if (nombre === "") {
        // Si el campo está vacío mostramos advertencia
        saludo.textContent = "⚠️ Por favor, escribe tu nombre.";
        saludo.style.color = "red";
        return;
    }

    // Generamos el saludo completo según la hora
    const saludoHora = obtenerSaludoPorHora();
    const mensaje = `${saludoHora}, ${nombre}. ¡Qué gusto verte!`;

    // Mostramos el saludo en pantalla
    saludo.textContent = mensaje;
    saludo.style.color = "#0070f3";

    // Guardamos el nombre para recordarlo en futuras sesiones
    localStorage.setItem("nombreGuardado", nombre);

    // Agregamos el mensaje al historial
    agregarAlHistorial(mensaje);
}

// Agrega un mensaje al historial local y lo muestra
function agregarAlHistorial(mensaje) {
    // Obtenemos el historial actual (si no hay, usamos array vacío)
    let historial = JSON.parse(localStorage.getItem("historialSaludo")) || [];
    historial.unshift(mensaje); // Agregamos el nuevo saludo al inicio

    if (historial.length > 5) historial.pop(); // Máximo 5 elementos

    // Guardamos el historial actualizado
    localStorage.setItem("historialSaludo", JSON.stringify(historial));

    // Lo mostramos en pantalla
    mostrarHistorial();
}

// Muestra el historial en la lista HTML
function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialSaludo")) || [];
    const lista = document.getElementById("historial");
    lista.innerHTML = ""; // Limpiamos la lista

    // Recorremos los mensajes y los agregamos como <li>
    historial.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
}

// Limpia el input y el mensaje actual
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("saludo").textContent = "";
}

// Borra el historial completamente
function borrarHistorial() {
    localStorage.removeItem("historialSaludo");
    mostrarHistorial(); // Limpiamos la vista también
}

// Al cargar la página: cargamos nombre anterior y mostramos historial
window.onload = function () {
    const nombreGuardado = localStorage.getItem("nombreGuardado");

    if (nombreGuardado) {
        // Si ya había escrito un nombre antes, lo dejamos cargado
        document.getElementById("nombre").value = nombreGuardado;
    }

    // Mostramos historial almacenado
    mostrarHistorial();
};
