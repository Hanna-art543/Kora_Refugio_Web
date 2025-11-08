import sqlite3

# Crear o conectar la base de datos
conexion = sqlite3.connect('mensajes.db')

# Crear una tabla llamada "mensajes"
conexion.execute('''
CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER,
    mensaje TEXT NOT NULL
)
''')

print("✅ Base de datos y tabla 'mensajes' creadas correctamente.")

conexion.close()
