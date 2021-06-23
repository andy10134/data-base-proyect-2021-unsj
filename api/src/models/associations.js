import User from "./Usuario";
import Genero from "./Genero";
import Institucion from "./Institucion";
import Disciplina from "./Disciplina";
import Horario from "./Horario";
import Dia from "./Dia";
import InstitucionDisciplina from "./Institucion_disciplina";
import Sala from "./Sala";
import Inscripcion from "./Inscripcion";
import Dicta from "./Dicta";
import Asistencia from "./Asiste";
import Red_social from "./Redes_sociales";


//1:1 Usuario - Genero
Genero.hasOne(User, {foreignKey: "nombregenero"});
User.belongsTo(Genero, {foreignKey: "nombregenero"});

//1:n Institucion - Usuario
Institucion.hasMany(User, {foreignKey: "codinst", as:"administradores"});
User.belongsTo(Institucion, {foreignKey: "codinst", as:"administrador"});

//n:n Disciplina - Usuario
User.belongsToMany(Disciplina, {through: "entrenador_disciplina", foreignKey: "email"});
Disciplina.belongsToMany(User, {through: "entrenador_disciplina", foreignKey: "nombredisciplina"});

//Horario asssotiacion n:n Dia - Institucion
Horario.belongsTo(Dia, {foreignKey: "nombredia"});
Horario.belongsTo(Institucion, {foreignKey: "codinst"});

//institucion_disciplina n:n Disciplina - Institucion
InstitucionDisciplina.belongsTo(Institucion, {foreignKey: "codinst", as: "institucion"});
InstitucionDisciplina.belongsTo(Disciplina, {foreignKey: "nombredisciplina"});

Institucion.belongsToMany(Disciplina, {through: "institucion_disciplina", foreignKey:"codinst"});
Disciplina.belongsToMany(Institucion, {through: "institucion_disciplina", foreignKey:"nombredisciplina"});

//n:1 Sala - Institucion
Sala.belongsTo(Institucion, {foreignKey: "codinst"});
Institucion.hasMany(Sala, {foreignKey: "codinst"});

//Inscripcion n:n Institucion_disciplina - Usuario
//User.belongsToMany(InstitucionDisciplina, {through: Inscripcion, foreignKey: "email"});
//InstitucionDisciplina.belongsToMany(User, {through: Inscripcion});  //Consultar con profesoras
Inscripcion.belongsTo(User, {foreignKey: "email", onDelete:'cascade'});
User.hasMany(Inscripcion, {foreignKey: 'email', onDelete:'cascade'});
Inscripcion.belongsTo(InstitucionDisciplina, {foreignKey: "idinstdisc", onDelete: 'cascade'});
InstitucionDisciplina.hasMany(Inscripcion, {foreignKey: 'idinstdisc', onDelete: 'cascade'});

InstitucionDisciplina.belongsTo(Institucion, {foreignKey: 'codinst', onDelete: 'cascade'});
Institucion.hasMany(InstitucionDisciplina, {foreignKey: 'codinst'});

//InstitucionDisciplina.belongsToMany(User, {through: 'inscripcion', foreignKey: 'idinstdisc'});
//User.belongsToMany(InstitucionDisciplina, {through: 'inscripcion', foreignKey: 'email'});

//Dicta
Dicta.belongsTo(User, {foreignKey: "email", as: 'entrenador'});
//User.hasMany(Dicta);
Dicta.belongsTo(Dia, {foreignKey: "nombredia"});
Dicta.belongsTo(Sala, {foreignKey: "salaid"});
Dicta.belongsTo(Disciplina, {foreignKey: "nombredisciplina"});
Dicta.belongsTo(Sala, {foreignKey: 'salaid'});
Sala.hasMany(Dicta, {foreignKey: 'salaid'});

//Asiste
User.belongsToMany(Dicta, {foreignKey:'emailcliente', otherKey: 'dictaid', through:'asiste', as: 'disciplinasAsistidas'});
Dicta.belongsToMany(User, {foreignKey:'dictaid', otherKey: 'emailcliente', through:'asiste', as: 'cliente'});

Asistencia.belongsTo(User,{foreignKey:"emailcliente"});
User.hasMany(Asistencia, {foreignKey: 'emailcliente'});
Asistencia.belongsTo(Dicta,{foreignKey:"dictaid", as: 'asistencias'});
Dicta.hasMany(Asistencia, {foreignKey: 'dictaid', as:'asistio'});

//Redes sociales 
Institucion.hasMany(Red_social, {foreignKey: "codinst", as: "institucion"});
Red_social.belongsTo(Institucion, {foreignKey: "codinst", as: "institucion"});

//import InstitucionDisciplina from "./Institucion_disciplina";
//import Horario from "./Horario";
//import Genero from "./Genero";
//import Disciplina from "./Disciplina";
//import Dicta from "./Dicta";
//import Dia from "./Dia";
//import Asiste from "./Asiste";

// 1:n entrenadores - dicta 
//User.hasMany(Dicta, {foreignKey: 'email'});
//Dicta.belongsTo(User, {foreignKey: 'email', as :'entrenador'});
//
//1:n disciplina - dicta 
//Disciplina.hasMany(Dicta, {foreignKey: 'nombredisciplina'});
//Dicta.belongsTo(Disciplina, {foreignKey: 'nombredisciplina'});
//
//1:n sala - dicta
//Sala.hasMany(Dicta, {foreignKey: 'codinst', foreignKey: 'numerosala'});
//Dicta.belongsTo(Sala, {foreignKey: 'codinst', foreignKey: 'numerosala'});
//
//1:n dia - dicta
//Dia.hasMany(Dicta, {foreignKey: 'nombredia'});
//Dicta.belongsTo(Dia, {foreignKey: 'nombredia'});
//
//User.belongsToMany(Dicta, {through: 'asiste', uniqueKey: 'fecha', foreignKey : 'email'});
//Dicta.belongsToMany(User, {through: 'asiste', uniqueKey: 'fecha', foreignKey: 'emailcliente', as: 'cliente'});
// 
//Associations disciplina-usuario
//Disciplina.belongsToMany(User, {as: 'entrenador', foreignKey: 'nombredisciplina', through: 'entrenador_disciplina'});
//User.belongsToMany(Disciplina, {foreignKey: 'email', through: 'entrenador_disciplina'});
// 
//Asistencia.belongsTo(Disciplina, {foreignKey: 'nombredisciplina'});
//Disciplina.hasOne(Asistencia, {foreignKey: 'nombredisciplina'})
//
//Horario.belongsTo(Dia, {foreignKey: 'nombredia'});
//Dia.hasOne(Horario, {foreignKey: 'nombredia'});
//
//Horario.belongsTo(Institucion, {foreignKey: 'codinst'});
//Institucion.hasOne(Horario, {foreignKey: 'codinst'});
//
// 1:N Association bettwen InstitucionDisciplina - Institucion
//Institucion.hasOne(InstitucionDisciplina, {foreignKey: 'codinst'});
//InstitucionDisciplina.belongsTo(Institucion, {foreignKey: 'codinst'});
//
// 1:N Association bettwen InstitucionDisciplina - Disciplina
//Disciplina.hasOne(InstitucionDisciplina, {foreignKey: 'nombredisciplina'});
//InstitucionDisciplina.belongsTo(Disciplina, {foreignKey: 'nombredisciplina'});
//
// N:M Association bettwen InstitucionDisciplina (Aggregation from Institucion-Disciplina)
//InstitucionDisciplina.belongsToMany(User, {foreignKey: 'nombredisciplina', foreignKey: 'codinst',through: 'inscripciones'});
//User.belongsToMany(InstitucionDisciplina, {foreignKey: 'email', through: 'inscripciones'});
// Map table inscripciones
//
//
//Associations sala-institucion
//Sala.belongsTo(Institucion, {foreignKey: 'codinst'});
//Institucion.hasMany(Sala, {foreignKey: 'codinst'});
//
//
//Asistencia.belongsTo(Disciplina, {foreignKey: 'nombredisciplina'});
//Disciplina.hasOne(Asistencia, {foreignKey: 'nombredisciplina'})
//
//associate https://stackoverflow.com/questions/53882278/sequelize-association-called-with-something-thats-not-a-subclass-of-sequelize-m
//Asistencia.belongsTo(User, {as: 'cliente',foreignKey: 'emailcliente', targetKey: 'email'});
//Asistencia.belongsTo(User, {as: 'entrenador',foreignKey: 'email', targetKey: 'email'});
//
//User.hasOne(Asistencia, {foreignKey: 'email', targetKey: 'emailcliente'}); // for costumers
//User.hasOne(Asistencia, {foreignKey: 'email', targetKey: 'email'});        // for trainers
//
//Genero.belongsTo(User, {foreignKey: 'nombregenero', targetKey: 'nombregenero'});
//User.hasOne(Genero, {foreignKey: 'nombregenero', targetKey: 'nombregenero'});