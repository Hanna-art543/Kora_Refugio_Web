let historias = {};

async function cargarHistorias() {
    try {
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


function mostrarHistoria(emocion) {
    const contenedor = document.getElementById("historia");
    contenedor.innerHTML = "";

    if (!historias[emocion]) {
        contenedor.innerHTML = "<p>Selecciona una emoción o espera a que carguen las historias...</p>";
        return;
    }

    historias[emocion].forEach((h, index) => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.style.cursor = "pointer";
        card.style.margin = "10px auto";

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
        <div class="historia-completa" style="width: 100%; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4b2c61; margin-bottom: 20px;">${h.titulo}</h2>
            
            <img src="${h.imagen}" alt="${h.titulo}" 
                 style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 15px; margin-bottom: 20px;">
            
            <div style="text-align: left; line-height: 1.6; font-size: 1.1em;">
                <p>${h.contenido}</p>
            </div>

            <br>
            <button onclick="mostrarHistoria('${emocion}')" 
                    style="background:#9b59b6; color:white; padding:12px 25px; border:none; border-radius:8px; cursor:pointer; font-weight: bold;">
                ⟵ Volver a la lista
            </button>
        </div>
    `;
}