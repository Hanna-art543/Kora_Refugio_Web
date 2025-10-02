function mostrarHistoria(emocion) {
    const contenedor = document.getElementById("historia");
    let historia = "";

    // Diccionario de historias organizadas
    const historias = {
        feliz: {
            titulo: "El día del paraguas amarillo",
            texto: "En un pueblo donde siempre llovía, una chica encuentra un paraguas amarillo que al abrirlo hace que todo se vuelva colorido: las flores bailan, los pájaros cantan y la gente empieza a sonreír. Ella salta entre charcos con música alegre de fondo, contagiando su felicidad a todos."
        },
        triste: {
            titulo: "La nota en la botella",
            texto: "Un chico se siente solo en la playa y lanza al mar una carta pidiendo un amigo. Días después, la botella regresa con una respuesta escrita: “No estás solo”. Él mira el horizonte y ve a otra persona saludando desde la orilla. La música es suave y esperanzadora, mostrando que incluso en la tristeza hay luz."
        },
        enojado: {
            titulo: "El dragón y la chispa",
            texto: "En un mundo de fantasía, un joven guerrero está tan enojado que despierta a un dragón de fuego. Él se enfrenta al dragón, pero al final descubre que la criatura era la representación de su propia ira. Aprende a calmarla respirando profundo, y el dragón se convierte en un ave fénix brillante que vuela libre."
        },
        motivado: {
            titulo: "La colina infinita",
            texto: "Una chica ve una colina enorme que todos dicen que es imposible de subir. Ella comienza con pasos pequeños. Se cae, se levanta, vuelve a intentar. Con cada paso, aparecen luces y símbolos de ánimo a su alrededor. Al llegar a la cima, la colina se transforma en un camino hacia un horizonte infinito lleno de estrellas."
        }
    };

    // Verificación: si la emoción existe, mostramos la historia
    if (historias[emocion]) {
        historia = `
            <h3>${historias[emocion].titulo}</h3>
            <p>"${historias[emocion].texto}"</p>
        `;
    } else {
        // Si no existe, mostramos un mensaje de error
        historia = `
            <h3> Emoción no encontrada</h3>
            <p>No tenemos una historia para esa emoción todavía.</p>
        `;
    }

    // Insertamos el resultado en el div
    contenedor.innerHTML = historia;
}