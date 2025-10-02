// Esperamos a que toda la página cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el formulario
    const form = document.querySelector("form");
    
    // Escuchamos el evento de "submit" (cuando el usuario presiona enviar)
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        // Evita que el formulario se mande de verdad (lo haremos en Semana 4 con Python/Flask)

        // Obtenemos los valores de los campos
        const nombre = document.querySelector("#nombre").value.trim();
        const edad = document.querySelector("#edad").value.trim();
        const mensaje = document.querySelector("#mensaje").value.trim();

        // Validamos si hay campos vacíos
        if (!nombre || !edad || !mensaje) {
            alert("Por favor, completa todos los campos.");
        } else {
            alert("¡Mensaje enviado correctamente!");
            form.reset(); // Limpia el formulario después del envío
        }
    });
});