select count(email)
from institucion_disciplina natural join inscripciones
where institucion_disciplina.codinst = 2
group by codinst

select * from inscripciones,

SELECT COUNT(nombredisciplina)
FROM institucion_disciplina
WHERE
institucion_disciplina.codinst = 1

(select count(email)
from salas natural join dicta natural join asiste
where codinst = 1 and nombredisciplina = 'Zumba' and fecha = '2020-05-12' and inicio= '15:00:00')

select 
(select salas.capacidad
from salas
where codinst = 1 and salas.numerosala = 1)
-
(   SELECT COUNT(email)
	FROM salas NATURAL JOIN dicta natural join asiste
	WHERE 
		codinst = 1 AND
		nombredisciplina = 'Zumba' AND
		salas.numerosala = '1' AND
		fecha = '2020-05-12' AND
		inicio = '15:00:00'
);
