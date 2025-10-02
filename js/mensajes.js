// Esperamos a que la página cargue
document.addEventListener("DOMContentLoaded", () => {
    // Creamos un arreglo con frases motivacionales
    const frases = [
        "Cree en ti, eres más fuerte de lo que piensas.",
        "No estás solo, siempre hay alguien que te escucha.",
        "Cada día es una nueva oportunidad para brillar.",
        "Hablar de tus emociones es un signo de valentía.",
        "Tu historia importa, tu voz importa."
    ];

    // Creamos un párrafo nuevo 
    const contenedor = document.createElement("p");

    // Le damos estilo al párrafo 
    contenedor.style.fontSize = "1.2rem";
    contenedor.style.marginTop = "20px";
    contenedor.style.color = "#7d3c98";

    // Elegimos una frase aleatoria del arreglo
    const frase = frases[Math.floor(Math.random() * frases.length)];

    // Insertamos esa frase dentro del párrafo
    contenedor.textContent = frase;

    // Agregamos el párrafo al <main> de la página
    document.querySelector("main").appendChild(contenedor);
});