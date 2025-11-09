from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import mysql.connector
import os

# Configuración del servidor
HOST = "localhost"
PORT = 8000

# Carpeta base (donde están tus archivos HTML, CSS y JS)
BASE_DIR = os.path.join(os.path.dirname(__file__), "..")

class MiServidor(BaseHTTPRequestHandler):
    def do_GET(self):
        """Maneja las solicitudes GET (archivos HTML, CSS, JS, etc.)"""
        if self.path == "/":
            self.path = "/index.html"

        file_path = os.path.join(BASE_DIR, self.path.lstrip("/"))

        try:
            # Determinar tipo de contenido
            if self.path.endswith(".html"):
                content_type = "text/html"
            elif self.path.endswith(".css"):
                content_type = "text/css"
            elif self.path.endswith(".js"):
                content_type = "application/javascript"
            elif self.path.endswith(".jpg") or self.path.endswith(".jpeg"):
                content_type = "image/jpeg"
            elif self.path.endswith(".png"):
                content_type = "image/png"
            else:
                content_type = "text/plain"

            # Leer archivo solicitado
            with open(file_path, "rb") as file:
                contenido = file.read()
                self.send_response(200)
                self.send_header("Content-type", content_type)
                self.end_headers()
                self.wfile.write(contenido)

        except FileNotFoundError:
            self.send_response(404)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"<h1>404 - Pagina no encontrada</h1>")

    def do_POST(self):
        """Maneja las solicitudes POST (formulario de contacto)"""
        if self.path == "/contacto":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length).decode("utf-8")

            # Parsear los datos del formulario
            datos_parseados = urllib.parse.parse_qs(post_data)
            nombre = datos_parseados.get("nombre", [""])[0]
            edad = datos_parseados.get("edad", [""])[0]
            mensaje = datos_parseados.get("mensaje", [""])[0]

            print("\n📩 Nuevo mensaje recibido:")
            print(f"Nombre: {nombre}")
            print(f"Edad: {edad}")
            print(f"Mensaje: {mensaje}\n")

            try:
                # Conexión a MySQL
                conexion = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="Kora_Refugio_Web"
                )

                cursor = conexion.cursor()

                # Insertar los datos en la tabla mensajes
                cursor.execute(
                    "INSERT INTO mensajes (nombre, edad, mensaje) VALUES (%s, %s, %s)",
                    (nombre, edad, mensaje)
                )

                conexion.commit()
                conexion.close()

                # Respuesta exitosa al navegador (para fetch)
                self.send_response(200)
                self.send_header("Content-type", "text/plain; charset=utf-8")
                self.end_headers()
                self.wfile.write(b"OK")

            except Exception as e:
                print("❌ Error al guardar el mensaje:", e)
                self.send_response(500)
                self.send_header("Content-type", "text/plain; charset=utf-8")
                self.end_headers()
                self.wfile.write(b"ERROR")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Ruta no encontrada")

# Iniciar servidor
if __name__ == "__main__":
    servidor = HTTPServer((HOST, PORT), MiServidor)
    print(f"🚀 Servidor corriendo en http://{HOST}:{PORT}")
    print("Presiona CTRL + C para detenerlo.")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido correctamente.")
        servidor.server_close()
