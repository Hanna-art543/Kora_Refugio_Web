from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse

# Definimos nuestro servidor
class MiServidor(BaseHTTPRequestHandler):

    # Método GET: mostrar archivos estáticos (HTML, CSS, JS)
    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"

        try:
            with open(self.path[1:], "rb") as file:
                if self.path.endswith(".html"):
                    content_type = "text/html"
                elif self.path.endswith(".css"):
                    content_type = "text/css"
                elif self.path.endswith(".js"):
                    content_type = "application/javascript"
                else:
                    content_type = "text/plain"

                self.send_response(200)
                self.send_header("Content-type", content_type)
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"404 - Archivo no encontrado")

    # Método POST: cuando se envía el formulario
    def do_POST(self):
        if self.path == "/contacto":
            longitud = int(self.headers['Content-Length'])
            datos = self.rfile.read(longitud).decode("utf-8")

            # Parseamos los datos recibidos
            datos_parseados = urllib.parse.parse_qs(datos)

            nombre = datos_parseados.get("nombre", [""])[0]
            edad = datos_parseados.get("edad", [""])[0]
            mensaje = datos_parseados.get("mensaje", [""])[0]

            print(f"📩 Nuevo mensaje recibido:\nNombre: {nombre}\nEdad: {edad}\nMensaje: {mensaje}\n")

            # Respuesta al navegador
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1 Mensaje recibido. Gracias!</h1>")

# Ejecutar el servidor en localhost:8000
if __name__ == "__main__":
    puerto = 8000
    servidor = HTTPServer(("localhost", puerto), MiServidor)
    print(f"🚀 Servidor corriendo en http://localhost:{puerto}")
    servidor.serve_forever()
