import sqlite3

# Crear la base de datos y la tabla si no existen
def crear_tabla():
    conexion = sqlite3.connect("mensajes.db")
    cursor = conexion.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS mensajes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            edad INTEGER,
            mensaje TEXT NOT NULL
        )
    """)
    conexion.commit()
    conexion.close()

# Guardar un nuevo mensaje
def guardar_mensaje(nombre, edad, mensaje):
    conexion = sqlite3.connect("mensajes.db")
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO mensajes (nombre, edad, mensaje) VALUES (?, ?, ?)",
                   (nombre, edad, mensaje))
    conexion.commit()
    conexion.close()

# Obtener todos los mensajes
def obtener_mensajes():
    conexion = sqlite3.connect("mensajes.db")
    cursor = conexion.cursor()
    cursor.execute("SELECT nombre, edad, mensaje FROM mensajes")
    datos = cursor.fetchall()
    conexion.close()
    return datos

# Si ejecutas este archivo directamente, crea la tabla
if __name__ == "__main__":
    crear_tabla()
    print("✅ Base de datos creada correctamente.")
