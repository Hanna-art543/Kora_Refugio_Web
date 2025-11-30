let historias = {};

async function cargarHistorias() {
    try {
        // CAMBIO IMPORTANTE: Ruta absoluta a static
        const respuesta = await fetch("/static/js/data/historias.json");
        if (!respuesta.ok) throw new Error("Error de red al cargar JSON");
        historias = await respuesta.json();
    } catch (error) {
        console.error("Error cargando historias:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarHistorias();
});

// Función para mostrar los títulos
function mostrarHistoria(emocion) {
    const contenedor = document.getElementById("historia");
    contenedor.innerHTML = "";

    if (!historias[emocion]) {
        contenedor.innerHTML = "<p>Selecciona una emoción o espera a que carguen las historias...</p>";
        return;
    }

    // Crear cuadros horizontales
    historias[emocion].forEach((h, index) => {
        const card = document.createElement("div");
        card.className = "card";
        
        // Estilo extra para que parezca botón
        card.style.cursor = "pointer";
        card.style.margin = "10px auto";

        // Nota: Asegúrate de que en tu JSON las imágenes tengan ruta "/static/imagenes/..."
        // O si son enlaces de internet, déjalos como están.
        card.innerHTML = `
            <img src="${h.imagen}" alt="${h.titulo}" style="max-width:100%; border-radius:10px;">
            <h4>${h.titulo}</h4>
        `;

        card.onclick = () => mostrarHistoriaCompleta(emocion, index);

        contenedor.appendChild(card);
    });
}

function mostrarHistoriaCompleta(emocion, index) {
    const h = historias[emocion][index];
    const contenedor = document.getElementById("historia");

    contenedor.innerHTML = `
        <div class="historia-completa card">
            <h3>${h.titulo}</h3>
            <img src="${h.imagen}" alt="${h.titulo}" class="img-historia">
            <p style="text-align: left; margin-top: 15px;">${h.contenido}</p>
            <br>
            <button onclick="mostrarHistoria('${emocion}')" style="background:#9b59b6; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer;">⟵ Volver a la lista</button>
        </div>
    `;
}