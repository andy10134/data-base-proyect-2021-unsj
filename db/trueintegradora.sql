/* patch notes V2: -todas las tablas en plural
				-ejemplos arreglados parcialmente
				-nombre de variables cambiadas para mayor entendimiento
				-eliminaci�n del atributo monto en inscripciones
				-mismo formato para todas las variables
				
patch notes V3: -cambiado valor de 30 a 255 en tama�o de strings
				-agregado consultas
				-agregada vista*/

create table generos(
	nombregenero varchar(255) not null primary key
);

insert into generos values ('Masculino'), ('Femenino');

create table instituciones(
	codinst integer not null primary key,
	nombre varchar(255),
	direccion varchar(255),
	telefono varchar(255)
);

insert into instituciones values (1, 'Puro Fitness', 'Los girasoles 181 norte', '4239985'),
(2, 'Mundo GYM', 'Mendoza 201 sur', '4232143');

create table usuarios(
	email varchar(255) not null primary key,
	nombre varchar(255),
	apellido varchar(255),
	numerotelefono varchar(255),
	nombredeusuario varchar(255),
	contrase�a varchar(255),
	fechanacimiento date,
	nombregenero varchar(255),
	tipousuario varchar(255),
	codinst integer,
	foreign key(nombregenero) references generos(nombregenero),
	foreign key(codinst) references instituciones(codinst)
);

insert into usuarios values ('gabrielmol@gmail.com', 'Gabriel', 'Molina', '2645468465', 'Gabrich', 'Gabrich123', '1996-06-06',
						   'Masculino', 'Administrador', 1),
						   
						   ('javisilva@gmail.com', 'Javier', 'Silva', '2643491034', 'Javi', 'silvaSoy', '1994-10-11',
						   'Masculino', 'usuarios', null),
						   
						   ('montegue@hotmail.com', 'Federico', 'Montaner', '2640129391', 'Montaner', 'montaNer1993', '1993-02-01',
						   'Masculino', 'Entrenador', null);

create table redes_sociales(
	codinst integer not null,
	redess varchar(255) not null,
	primary key(codinst, redesS),
	foreign key(codinst) references instituciones(codinst)
);

insert into redes_sociales values (1, 'Facebook'), (2, 'Twitter'), (1,'Instagram');

create table salas(
	numerosala integer not null,
	codinst integer not null,
	capacidad integer,
	primary key(numerosala, codinst),
	foreign key(codinst) references instituciones(codinst)
);

insert into salas values (1, 1, 25), (2, 2, 30);

create table dias(
	nombredia varchar(255) not null primary key
);

insert into dias values ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo');

create table horarios(
	nombredia varchar(255) not null,
	codinst integer not null,
	inicio time not null,
	fin time not null,
	primary key(nombredia, codinst, inicio, fin),
	foreign key(codinst) references instituciones(codinst),
	foreign key(nombredia) references dias(nombredia)
);

insert into horarios values ('Lunes', 1, '13:00:00', '20:30:00'),
('Martes', 2, '14:00:00', '21:00:00');

create table disciplinas(
	nombredisciplina varchar(255) not null primary key
);

insert into disciplinas values ('MMA'), ('Zumba');

create table entrenador_disciplina(
	nombredisciplina varchar(255) not null,
	email varchar(255) not null,
	primary key(nombredisciplina, email),
	foreign key(nombredisciplina) references disciplinas(nombredisciplina),
	foreign key(email) references usuarios(email)
);

insert into entrenador_disciplina values ('Zumba', 'montegue@hotmail.com');

create table institucion_disciplina(
	codinst integer not null,
	nombredisciplina varchar(255) not null,
	precioclase integer,
	descripcion varchar(255),
	primary key(codinst, nombredisciplina),
	foreign key(codinst) references instituciones(codinst),
	foreign key(nombredisciplina) references disciplinas(nombredisciplina)
);

insert into institucion_disciplina values (1, 'MMA', 200, 'Golpes fuertes'), (2, 'Zumba', 250, 'Mucho movimiento'),
											(1, 'Zumba', 220, 'Mucho movimiento');

create table inscripciones(
	nombredisciplina varchar(255) not null,
	codinst integer not null,
	email varchar(255) not null,
	numinsc integer not null,
	diaexpiracion date,
	fechapago date,
	cantclases integer,
	primary key(nombredisciplina, codinst, email, numinsc),
	foreign key(email) references usuarios(email),
	foreign key(codinst, nombredisciplina) references institucion_disciplina(codinst, nombredisciplina)
);

insert into inscripciones values ('Zumba', 2, 'javisilva@gmail.com', 1, '2021-07-20', '2021-06-20', 4);

create table dicta(
	email varchar(255) not null,
	nombredisciplina varchar(255) not null,
	nombredia varchar(255) not null,
	numerosala integer not null,
	codinst integer not null,
	inicio time not null,
	fin time not null,
	primary key(email, nombredisciplina, nombredia, numerosala, codinst, inicio, fin),
	foreign key(email) references usuarios(email),
	foreign key(nombredisciplina) references disciplinas(nombredisciplina),
	foreign key(nombredia) references dias(nombredia),
	foreign key(numerosala, codinst) references salas(numerosala, codinst)
);

insert into dicta values ('montegue@hotmail.com', 'Zumba', 'Martes', 1, 1, '15:00:00', '16:00:00');

create table asiste(
	emailcliente varchar(255) not null,
	email varchar(255) not null,
	nombredisciplina varchar(255) not null,
	nombredia varchar(255) not null,
	numerosala integer not null,
	codinst integer not null,
	inicio time not null,
	fin time not null,
	fecha date not null,
	primary key(emailcliente, email, nombredisciplina, nombredia, numerosala, codinst, inicio, fin, fecha),
	foreign key(email, nombredisciplina, nombredia, numerosala, codinst, inicio, fin) references dicta(email, nombredisciplina, nombredia, numerosala, codinst, inicio, fin),
	foreign key(emailcliente) references usuarios(email)
);

insert into asiste values ('javisilva@gmail.com', 'montegue@hotmail.com', 'Zumba', 'Martes', 1, 1, '15:00:00', '16:00:00', '2021-05-03');

-- Consultas

-- 1. Todas las disciplina asociadas a una instituci�n con su respectiva sala (ingresado un codigo de institucion)

select nombredisciplina, numerosala as numeroDeSala
from institucion_disciplina natural join salas
where codinst=1;

-- 2. Clases asistidas por un cliente (ingresado un email de cliente)

select fecha
from asiste
where emailcliente = 'javisilva@gmail.com';

-- 3. Clientes de una instituci�n y disciplina en la que se encuentran inscriptos (ingresado un codinst)

select email as emailCliente, nombredisciplina
from inscripciones
where codinst = 2;

-- 4. Inscripciones abonadas por clientes de una instituci�n
select numinsc, email as emailcliente
from inscripciones;

-- Cupo disponible en un dicta aaaaa (fecha clase) (clase dicta -> codinst -> nombredisciplina) consultar asiste group by (codinst,nombredisciplina) -> dictaid count  

-- 5. Todos los horarios y profesores de todas las disciplinas de una instituci�n (ingresado un codinst)

select inicio as horarioinicio, fin as horariofin, email as emailentrenador, nombredisciplina
from dicta
where codinst = 1;

-- Vista, la cual poseeria el recepcionista.

create view horariosEntrenadores_precios as
select email as emailentrenador, nombredisciplina, nombredia, inicio, fin, precioclase
from dicta natural join institucion_disciplina;

-- 

