from flask import Flask, render_template, request, redirect, session, url_for
import mysql.connector

app = Flask(__name__)
app.secret_key = "super_secreto_kora"

# CONEXIÓN A BD
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",  
        database="kora_refugio_web"
    )

# RUTAS PÚBLICAS
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/consejos")
def consejos():
    return render_template("consejos.html")

@app.route("/historias")
def historias():
    return render_template("historias.html")

@app.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == "POST":
        nombre = request.form["nombre"]
        edad = request.form["edad"]
        mensaje = request.form["mensaje"]
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO mensajes (nombre, edad, mensaje) VALUES (%s, %s, %s)", (nombre, edad, mensaje))
        conn.commit()
        cursor.close()
        conn.close()
        return render_template("contacto.html", exito=True)
    return render_template("contacto.html")

# LOGIN Y REGISTRO
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        usuario = request.form["usuario"]
        password = request.form["password"]
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO register (usuario, password) VALUES (%s, %s)", (usuario, password))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for("login"))
        except:
            return "Error al registrar (usuario duplicado)"
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form["usuario"]
        password = request.form["password"]
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM register WHERE usuario=%s AND password=%s", (usuario, password))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            session["user_id"] = user["id"]
            session["usuario"] = user["usuario"]
            return redirect(url_for("diario"))
        else:
            return render_template("login.html", error="Datos incorrectos")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# ÁREA PRIVADA
@app.route("/diario")
def diario():
    if "user_id" not in session:
        return redirect(url_for("login"))
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT contenido, fecha FROM diario WHERE usuario_id=%s ORDER BY fecha DESC", (session["user_id"],))
    datos = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template("diario.html", datos=datos, usuario=session["usuario"])

@app.route("/diario/add", methods=["POST"])
def diario_add():
    if "user_id" in session:
        contenido = request.form["contenido"]
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO diario (usuario_id, contenido) VALUES (%s, %s)", (session["user_id"], contenido))
        conn.commit()
        cursor.close()
        conn.close()
    return redirect(url_for("diario"))

@app.route("/mensajes")
def mensajes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM mensajes ORDER BY fecha DESC")
    mensajes = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template("mensajes.html", mensajes=mensajes)

if __name__ == "__main__":
    app.run(debug=True)