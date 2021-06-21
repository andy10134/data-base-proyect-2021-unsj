from flask import Flask,render_template, request, flash, redirect, url_for, session, escape

import json
import requests

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def index():
    if 'email' in session:
        headersAPI = {'Authorization': 'Bearer '+session['token']}
        r = requests.get('localhost:400/api/institutions/disciplines', headers=headersAPI)
        if r.status_code == 401:
            try:
                params = {'email' : session['email'], 'password' : session['password']}
                r = requests.post("localhost:400/api/users/login", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Ocurrio un error en la conexión')
                session.delete()
                return render_template('home.html')
            else:
                datos = r.json()
                session['token'] = datos['token']
                return redirect(url_for('index'))
        else:
            if (r.status_code == 200):
                data = r.json() #ver el json del andy
                return render_template('index.html', disciplinas = data['data'], sesion = session)
            else:
                flash('Ocurrio un error en la conexión')
                return render_template('home.html')
    else:
        return render_template('home.html')


@app.route('/disc-usuarios', methods=["GET", "POST"])
def listarUsuarios():
    if 'email' in session:
        headersAPI = {'Authorization': 'Bearer '+session['token']}
        r = requests.get('localhost:400/api/institutions/customers', headers=headersAPI)
        if r.status_code == 401:
            try:
                params = {'email' : session['email'], 'password' : session['password']}
                r = requests.post("localhost:400/api/users/login", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Ocurrio un error en la conexión')
                session.delete()
                return render_template('home.html')
            else:
                datos = r.json()
                session['token'] = datos['token']
                return redirect(url_for('listarUsuarios'))
        else:
            if (r.status_code == 200):
                data = r.json() #ver el json del andy
                return render_template('disc-usuarios.html', usuarios = data['data'], sesion = session)
            else:
                flash('Ocurrio un error en la conexión')
                return render_template('home.html')
    else:
        return render_template('home.html')


@app.route('/asistencias', methods=["GET", "POST"])
def listarAsitencias():
    if 'email' in session:
        if request.method == 'POST' :
            if request.form['email'] :
                url = "localhost:400/api/users/inscriptions/" + str(request.form['email'])
                headersAPI = {'Authorization': 'Bearer '+session['token']}
                r = requests.get(url, headers=headersAPI)
                if r.status_code == 401:
                    try:
                        params = {'email' : session['email'], 'password' : session['password']}
                        r = requests.post("localhost:400/api/users/login", json=params)
                        r.raise_for_status()
                    except requests.exceptions.RequestException: 
                        flash('Ocurrio un error en la conexión')
                        session.delete()
                        return render_template('home.html')
                    else:
                            datos = r.json()
                            session['token'] = datos['token']
                            return redirect(url_for('index'))
                else:
                    if (r.status_code == 200):
                        data = r.json() #ver el json del andy
                        return render_template('asistencias.html', asistencias = data['data'], sesion = session)
                    else:
                        flash('Ocurrio un error en la conexión')
                        return render_template('home.html')
            else:
                flash('Verifica que todos los campos esten completos')
                return redirect(url_for('index'))
        else:
            return redirect(url_for('index'))
    else:
        return render_template('home.html')


@app.route('/cupo/<datos>', methods=["GET", "POST"])
def mostrarCupo(datos):

    if 'email' in session:
        return render_template('cupo.html', cupo = datos, sesion = session)
    else:
        return render_template('home.html')


@app.route('/disciplinas-entrenadores-horarios', methods=["GET", "POST"])
def listarDEH():
    if 'email' in session:
        headersAPI = {'Authorization': 'Bearer '+session['token']}
        r = requests.get('localhost:400/api/institutions/trainners', headers=headersAPI)
        if r.status_code == 401:
            try:
                params = {'email' : session['email'], 'password' : session['password']}
                r = requests.post("localhost:400/api/users/login", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Ocurrio un error en la conexión')
                session.delete()
                return render_template('home.html')
            else:
                datos = r.json()
                session['token'] = datos['token']
                return redirect(url_for('listarDEH'))
        else:
            if (r.status_code == 200):
                data = r.json() #ver el json del andy
                return render_template('disciplinas-entrenadores-horarios.html', deh = data['data'], sesion = session)
            else:
                flash('Ocurrio un error en la conexión')
                return render_template('home.html')
    else:
        return render_template('home.html')


@app.route('/disciplinas-entrenadores-horarios', methods=["POST"])
def handledata4():
    if request.method == 'POST' :
        if(request.form['email'] and request.form['disciplina'] and request.form['sala'] and request.form['inicio'] and request.form['fin'] and request.form['fecha']):
            url= 'localhost:400/api/institutions/' + str(request.form['disciplina']) + '/' + str(request.form['sala'])
            headersAPI = {'Authorization': 'Bearer '+session['token']}
            r = requests.get(url, headers=headersAPI)
            if r.status_code == 401:
                try:
                    params = {'email' : session['email'], 'password' : session['password']}
                    r = requests.post("localhost:400/api/users/login", json=params)
                    r.raise_for_status()
                except requests.exceptions.RequestException: 
                    flash('Ocurrio un error en la conexión')
                    session.delete()
                    return render_template('home.html')
                else:
                    datos = r.json()
                    session['token'] = datos['token']
                    return redirect(url_for('listarDEH'))
            else:
                if (r.status_code == 200):
                    data = r.json() #ver el json del andy
                    #calcular todo lo de cupo
                    dat={
                        'email' : request.form['email'],
                        'disciplina' : request.form['disciplina'],
                        'sala' : request.form['sala'],
                        'inicio' : request.form['inicio'],
                        'fin' : request.form['fin'],
                        'fecha' : request.form['fecha'],
                        'cupo' : data['cupo'] # modificar con respecto a lo q se devuelva
                    }
                    return redirect(url_for('mostrarcupo',datos=dat))
                else:
                    flash('Verifica que todos los datos sean correctos')
                    return redirect(url_for('listarDEH')) 
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
                params = {'email' : request.form['email'], 
                'password' : request.form['password'], 
                'name' : request.form['name'], 
                'lastname' : request.form['lastname'],
                'date' : request.form['date'],
                'phone' : request.form['phone'],
                'nick' : request.form['nick']
                }
                r = requests.post("", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica que todos los campos esten completos')
                return redirect(url_for('registrar')) 
            else:
                #aca guardar todo lo de sesion del usuario
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
                params = {'nameInst' : request.form['nameInst'], 
                'adress' : request.form['adress'], 
                'phoneInst' : request.form['phoneInst']
                }
                r = requests.post("", json=params) 
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica que todos los campos esten completos y los datos sean correctos')
                return redirect(url_for('ingresar')) 
            else:
                #aca guardar todo lo de sesion de la institucion y token
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
                r = requests.post("localhost:400/api/users/login", json=params)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica tus credenciales de acceso, DNI o contraseña inválidos')
                return redirect(url_for('ingresar')) 
            else:
                datos = r.json()
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


@app.route('/cambiarcontra')
def cambiarcontra():
    if not ('email' in session):
        return render_template('home.html')
    else:
        return render_template('cambiar-contraseña.html', sesion = session)

@app.route('/cambiarcontra', methods = ['POST'])
def handledata5():
    if request.method == 'POST':
        if(request.form['contraseñavieja'] and request.form['contraseñaactual']):
            
            try:
                headersAPI = {'Authorization': 'Bearer '+session['token']}
                params = {'email' : session['email'], 'contraseña' : request.form['contraseñavieja'], 'nuevacontraseña' : request.form['contraseñaactual']}
                r = requests.post("localhost:400/api/users/update/password", json=params, headers=headersAPI)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Verifica los datos ingresados, contraseña inválida')
                return redirect(url_for('cambiarcontra')) 
            else:
                datos = r.json()
                session['password'] = request.form['contraseñaactual']
                session['token'] = datos['token']
                return redirect(url_for('index'))
        else:
            flash('Verifica los datos ingresados, contraseña inválida')
            return redirect(url_for('cambiarcontra'))
    else:
        return redirect(url_for('cambiarcontra'))


@app.route('/modificarD/<nombre>')
def modificarD(nombre):
    if not ('email' in session):
        return render_template('home.html')
    else:
        return render_template('modificarD.html', nombreDisc = nombre,sesion = session)

@app.route('/modificarD/<nombre>', methods = ['POST'])
def handledata7(nombre):
    if request.method == 'POST':
        if(request.form['precio'] and request.form['descripcion']):
            
            try:
                params = {'precioclase' : session['precio'], 'descripcion' : request.form['descripcion']}
                url= 'localhost:400/api/institutions/' + str(nombre)
                headersAPI = {'Authorization': 'Bearer '+session['token']}
                r = requests.post(url, json=params, headers=headersAPI)
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Error al procesar la solicitud')
                return redirect(url_for('modificarD')) 
            else:
                return redirect(url_for('index'))
        else:
            flash('Todos los campos deben estar completos')
            return redirect(url_for('modificarD'))
    else:
        return redirect(url_for('modificarD'))


@app.route('/eliminarD/<nombre>')
def eliminarD(nombre):
    if not ('email' in session):
        return render_template('home.html')
    else:
        return render_template('eliminarD.html', nombreDisc = nombre,sesion = session)

@app.route('/eliminarD/<nombre>', methods = ['POST'])
def handledata6(nombre):
    if request.method == 'POST':
        if(request.form['contraseña']):
            
            try:
                headersAPI = {'Authorization': 'Bearer '+session['token']}
                r = requests.post("", headers=headersAPI) # eliminar relacion con disciplina
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Error al procesar la solicitud')
                return redirect(url_for('eliminarD')) 
            else:
                return redirect(url_for('index'))
        else:
            flash('Verifica los datos ingresados, contraseña inválida')
            return redirect(url_for('eliminarD'))
    else:
        return redirect(url_for('eliminarD'))

@app.route('/eliminarInst')
def eliminarInst():
    if not ('email' in session):
        return render_template('home.html')
    else:
        return render_template('eliminarInst.html', sesion = session)

@app.route('/eliminarInst', methods = ['POST'])
def handledata8():
    if request.method == 'POST':
        if(request.form['contraseña']):
            
            try:
                headersAPI = {'Authorization': 'Bearer '+session['token']}
                r = requests.post("", headers=headersAPI) # eliminar inst
                r.raise_for_status()
            except requests.exceptions.RequestException: 
                flash('Error al procesar la solicitud')
                return redirect(url_for('eliminarInst')) 
            else:
                session.delete()
                return redirect(url_for('index'))
        else:
            flash('Verifica los datos ingresados, contraseña inválida')
            return redirect(url_for('eliminarInst'))
    else:
        return redirect(url_for('eliminarInst'))

@app.route('/salir')
def salir():
    if not ('email' in session):
        return render_template('home.html')
    else:
        session.delete()
        return redirect(url_for('index'))

if __name__ == '__main__': 
    app.run(debug=True)
