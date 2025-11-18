let historias = {};
async function cargarHistorias () {
    try {
        const respuesta = await fetch ("js/data/historias.json");
        historias = await respuesta.json();
    } catch (error) {
        console.error("Error cargando historias:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarHistorias();
});

//Función para mostrar los títulos
function mostrarHistoria (emocion) {
    const contenedor = document.getElementById("historia");
    contenedor.innerHTML = "";

    if(!historias[emocion]) {
        contenedor.innerHTML("<p>No hay historias para esta emoción todavía<p>");
        return;
    }

    //Crear cuadros horizontales
    historias[emocion].forEach((h, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${h.imagen}" alt="${h.titulo}">
            <h4>${h.titulo}</h4>
        `;

        card.onclick = () => mostrarHistoriaCompleta (emocion, index);

        contenedor.appendChild(card);
    });
}


function mostrarHistoriaCompleta (emocion, index) {
    const h = historias[emocion][index];
    const contenedor = document.getElementById("historia");

    contenedor.innerHTML = `
        <div class="historia-completa">
            <h3>${h.titulo}</h3>
            <img src="${h.imagen}" alt="${h.titulo}" class="img-historia">
            <p>${h.contenido}</p>
            <button onclick="mostrarHistoria('${emocion}')">⟵ Volver</button>
        </div>
    `;
}