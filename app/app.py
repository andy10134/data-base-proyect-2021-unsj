from flask import Flask,render_template, request, flash, redirect, url_for, session, escape

app = Flask(__name__)

@app.route('/')
def index():
    #r = request.get()
    return render_template('index.html')

@app.route('/disc-usuarios')
def listarUsuarios():
    return render_template('disc-usuarios.html')

@app.route('/asistencias')
def listarAsitencias():
    return render_template('asistencias.html')

@app.route('/inscripciones')
def listarInscripciones():
    return render_template('inscripciones.html')

@app.route('/disciplinas-entrenadores-horarios')
def listarDEH():
    return render_template('disciplinas-entrenadores-horarios.html')


if __name__ == '__main__': 
    app.run(debug=True)
