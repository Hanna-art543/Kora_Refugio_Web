// Cargar JSON de consejos
async function cargarConsejos() {
    // CAMBIO IMPORTANTE: Agregamos "/static/" al principio
    try {
        const resp = await fetch("/static/js/data/consejos.json");
        if (!resp.ok) throw new Error("No se pudo cargar el JSON");
        return await resp.json();
    } catch (error) {
        console.error("Error cargando consejos:", error);
        return { recursos: [], emociones: {} }; // Retorna objeto vacío para evitar errores
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const datos = await cargarConsejos();

    // Si no cargó bien, paramos aquí para que no explote
    if (!datos || !datos.recursos) return;

    const botones = document.querySelectorAll(".emocion-btn");
    const contenedor = document.getElementById("contenedor-consejos");
    const contenedorRecursos = document.getElementById("lista-recursos");

    // Mostrar recursos generales
    datos.recursos.forEach(r => {
        contenedorRecursos.innerHTML += `
            <p>
                <strong>${r.nombre}</strong><br>
                <a href="${r.url}" target="_blank">${r.url}</a>
            </p>
        `;
    });

    // Eventos de botones
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const emocion = btn.dataset.emocion;
            const info = datos.emociones[emocion];

            if (info) {
                contenedor.innerHTML = `
                    <div class="card">
                        <h2>${info.titulo}</h2>
                        <p>${info.descripcion}</p>

                        <h3>Consejos</h3>
                        <ul>
                            ${info.consejos.map(c => `<li>${c}</li>`).join("")}
                        </ul>

                        <h3>Qué evitar</h3>
                        <ul>
                            ${info.no_hacer.map(n => `<li>${n}</li>`).join("")}
                        </ul>

                        <h3>Frases</h3>
                        <blockquote>
                            ${info.frases.map(f => `<p>"${f}"</p>`).join("")}
                        </blockquote>

                        <h3>Videos recomendados</h3>
                        ${info.videos.map(v => `
                            <p><strong>${v.titulo}</strong></p>
                            <iframe src="${v.url}" allowfullscreen></iframe>
                        `).join("")}
                    </div>
                `;
            }
        });
    });
});