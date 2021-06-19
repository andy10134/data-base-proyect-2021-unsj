from flask import Flask,render_template, request, flash, redirect, url_for, session, escape

import json
import requests

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def index():
    
    if 'email' in session:
        headersAPI = {'Authorization': 'Bearer '+session['token']}
        r = requests.get('https://reqres.in/api/users', headers=headersAPI)
        data = r.json()
        return render_template('index.html', disciplinas = data['data'], sesion = session)
    else:
        return render_template('home.html')


@app.route('/disc-usuarios', methods=["GET", "POST"])
def listarUsuarios():
    r = requests.get('/usuarios')
    return render_template('disc-usuarios.html', usuarios = data['data'], sesion = session)

@app.route('/asistencias', methods=["GET", "POST"])
def listarAsitencias():
    r = requests.get('/asistencias')
    return render_template('asistencias.html', asistencias = data['data'], sesion = session)

@app.route('/cupo', methods=["GET", "POST"])
def mostrarCupo():
    r = requests.get()
    return render_template('cupo.html', cupo = data['data'], sesion = session)

@app.route('/disciplinas-entrenadores-horarios', methods=["GET", "POST"])
def listarDEH():
    return render_template('disciplinas-entrenadores-horarios.html', deh = data['data'], sesion = session)

@app.route('/disciplinas-entrenadores-horarios', methods=["POST"])
def handledata4():
    if request.method == 'POST' :
        if(request.form['disciplina'] and request.form['sala'] and request.form['inicio'] and request.form['fin'] and request.form['fecha']):
            try:
                #r = el get va aca
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica que todos los campos esten completos')
                return redirect(url_for('listarDEH')) 
            else:
                #calcular todo lo de cupo
                return redirect(url_for('mostrarcupo'))
        else:
            flash('Verifica que todos los campos esten completos')
            return redirect(url_for('listarDEH'))
    else:
        return redirect(url_for('listarDEH'))

@app.route('/registrarse')
def registrar():
    if not ('email' in session):
        return render_template('sing-up.html')
    else:
        return redirect(url_for('index'))

@app.route('/registrarse', methods = ['POST'])
def handledata2():
    if request.method == 'POST' :
        if(request.form['name'] and request.form['lastname'] and request.form['nick'] and request.form['date'] and request.form['phone'] and request.form['email'] and request.form['password']):
            try:
                #r = el get va aca
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica que todos los campos esten completos')
                return redirect(url_for('registrar')) 
            else:
                #aca guardar todo lo de sesion del usuario y token
                return redirect(url_for('registrarInst'))
        else:
            flash('Verifica que todos los campos esten completos')
            return redirect(url_for('registrar'))
    else:
        return redirect(url_for('registrar'))

@app.route('/registrarIns')
def registrarInst():
    if not ('email' in session):
        return render_template('registrarInst.html')
    else:
        return redirect(url_for('index'))

@app.route('/registrarIns', methods = ['POST'])
def handledata3():
    if request.method == 'POST' :
        if(request.form['nameInst'] and request.form['adress'] and request.form['phoneInst']):
            try:
                #r = el get va aca
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica que todos los campos esten completos y los datos sean correctos')
                return redirect(url_for('ingresar')) 
            else:
                #aca guardar todo lo de sesion de la institucion
                return redirect(url_for('index'))
        else:
            flash('Verifica que todos los campos esten completos y los datos sean correctos')
            return redirect(url_for('ingresar'))
    else:
        return redirect(url_for('ingresar'))

@app.route('/ingresar')
def ingresar():
    if not ('email' in session):
        return render_template('login.html')
    else:
        return redirect(url_for('index'))

@app.route('/ingresar', methods = ['POST'])
def handledata():
    if request.method == 'POST':
        if(request.form['email'] and request.form['password']):
            
            try:
                params = {'email' : request.form['email'], 'password' : request.form['password']}
                r = requests.post("", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica tus credenciales de acceso, DNI o contraseña inválidos')
                return redirect(url_for('ingresar')) 
            else:
                datos = r.json(())
                session['email'] = request.form['email']
                session['password'] = request.form['password']
                session['nomInst'] = datos['data']['nombre']
                session['adress'] = datos['data']['direccion']
                session['phone'] = datos['data']['telefono']
                session['numUsu'] = datos['data']['clientes']
                session['numEntr'] = datos['data']['entrenadores']
                session['numDisc'] = datos['data']['disciplinas']
                session['token'] = datos['token']
                return redirect(url_for('index'))
        else:
            flash('Verifica tus credenciales de acceso, DNI o contraseña inválidos')
            return redirect(url_for('ingresar'))
    else:
        return redirect(url_for('ingresar'))

if __name__ == '__main__': 
    app.run(debug=True)
