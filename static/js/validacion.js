document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-contacto");
    const contenedorRespuesta = document.querySelector("#respuesta-servidor");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const edad = document.querySelector("#edad").value.trim();
        const mensaje = document.querySelector("#mensaje").value.trim();

        if (!nombre || !edad || !mensaje) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ nombre, edad, mensaje }),
            });

            if (response.ok) {
                contenedorRespuesta.innerHTML = `
                    <p style="
                        background-color: #b28be3;
                        color: white;
                        padding: 10px;
                        border-radius: 10px;
                        text-align: center;
                        font-weight: bold;
                        margin-top: 15px;
                    ">
                        💜 Mensaje recibido correctamente. ¡Gracias por compartir!
                    </p>
                `;
                form.reset();
            } else {
                contenedorRespuesta.innerHTML = `<p style="color:red;">Hubo un problema al enviar el mensaje.</p>`;
            }
        } catch (error) {
            console.error("Error:", error);
            contenedorRespuesta.innerHTML = `<p style="color:red;">Error de conexión con el servidor.</p>`;
        }
    });
});
