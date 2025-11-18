import sqlite3

# Conectamos (si no existe, se crea)
conexion = sqlite3.connect("mensajes.db")

# Crear cursor
cursor = conexion.cursor()

# Crear tabla si no existe
cursor.execute("""
CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER,
    mensaje TEXT NOT NULL
)
""")

# Guardar cambios y cerrar
conexion.commit()
conexion.close()

print("✅ Base de datos y tabla creadas correctamente.")
