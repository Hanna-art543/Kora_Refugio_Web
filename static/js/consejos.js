// Cargar JSON de consejos
async function cargarConsejos() {
    try {
        const resp = await fetch("/static/js/data/consejos.json");
        if (!resp.ok) throw new Error("No se pudo cargar el JSON");
        return await resp.json();
    } catch (error) {
        console.error("Error cargando consejos:", error);
        return { recursos: [], emociones: {} }; 
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const datos = await cargarConsejos();

    if (!datos || !datos.recursos) return;

    const botones = document.querySelectorAll(".emocion-btn");
    const contenedor = document.getElementById("contenedor-consejos");
    const contenedorRecursos = document.getElementById("lista-recursos");

    // 1. Mostrar recursos generales 
    if (contenedorRecursos) {
        contenedorRecursos.innerHTML = ""; 
        datos.recursos.forEach(r => {
            contenedorRecursos.innerHTML += `
                <p>
                    <strong>${r.nombre}</strong><br>
                    <a href="${r.url}" target="_blank">${r.url}</a>
                </p>
            `;
        });
    }

    // 2. Eventos de los botones de emociones
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const emocion = btn.dataset.emocion;
            const info = datos.emociones[emocion];

            if (info) {
                // Contenido de la tarjeta
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

                        <h3>Frases para recordar</h3>
                        <blockquote style="border-left: 5px solid #9b59b6; padding-left: 15px; font-style: italic;">
                            ${info.frases.map(f => `<p>"${f}"</p>`).join("")}
                        </blockquote>

                        <h3>Videos recomendados</h3>
                        <div class="lista-videos">
                            ${info.videos.map(v => {
                                // CORRECCIÓN DE URLS PARA IFRAME
                                let urlEmbed = v.url
                                    .replace("watch?v=", "embed/")
                                    .replace("youtu.be/", "www.youtube.com/embed/");

                                return `
                                    <div class="video-item" style="margin-bottom: 25px;">
                                        <p><strong>${v.titulo}</strong></p>
                                        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                                            <iframe 
                                                src="${urlEmbed}" 
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; border: none;"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>
                `;
            }
        });
    });
});