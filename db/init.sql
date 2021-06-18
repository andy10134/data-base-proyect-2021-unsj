select * from usuariosa



insert into generos values ('Masculino'), ('Femenino');
insert into instituciones values (1, 'Puro Fitness', 'Los girasoles 181 norte', '4239985'),
(2, 'Mundo GYM', 'Mendoza 201 sur', '4232143');
insert into usuarios values ('gabrielmol@gmail.com', 'Gabriel', 'Molina', '2645468465', 'Gabrich', 'Gabrich123', '1996-06-06',
						   'Masculino', 'Administrador', 1),
						   
						   ('javisilva@gmail.com', 'Javier', 'Silva', '2643491034', 'Javi', 'silvaSoy', '1994-10-11',
						   'Masculino', 'usuarios', null),
						   
						   ('montegue@hotmail.com', 'Federico', 'Montaner', '2640129391', 'Montaner', 'montaNer1993', '1993-02-01',
						   'Masculino', 'Entrenador', null);

insert into redes_sociales values (1, 'Facebook'), (2, 'Twitter'), (1,'Instagram');
insert into dias values ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo');
insert into horarios values ('Lunes', 1, '13:00:00', '20:30:00'),
('Martes', 2, '14:00:00', '21:00:00');
insert into disciplinas values ('MMA'), ('Zumba');
insert into entrenador_disciplina values ('montegue@hotmail.com', 'Zumba');
insert into institucion_disciplina (codinst, nombredisciplina, precioclase, descripcion) values (1, 'MMA', 200, 'Golpes fuertes'), (2, 'Zumba', 250, 'Mucho movimiento'),
											(1, 'Zumba', 220, 'Mucho movimiento');
insert into salas (codinst, numerosala, capacidad )values (1, 1, 25), (2, 2, 30);
insert into dicta (email, nombredisciplina, nombredia, salaid, inicio, fin)values ('montegue@hotmail.com', 'Zumba', 'Martes', 1, '15:00:00', '16:00:00');
insert into dicta (email, nombredisciplina, nombredia, salaid, inicio, fin) values ('montegue@hotmail.com','Zumba','Lunes', 1, '15:00:00', '16:00:00');