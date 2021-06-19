"use strict";

var _Usuario = _interopRequireDefault(require("./Usuario"));

var _Genero = _interopRequireDefault(require("./Genero"));

var _Institucion = _interopRequireDefault(require("./Institucion"));

var _Disciplina = _interopRequireDefault(require("./Disciplina"));

var _Horario = _interopRequireDefault(require("./Horario"));

var _Dia = _interopRequireDefault(require("./Dia"));

var _Institucion_disciplina = _interopRequireDefault(require("./Institucion_disciplina"));

var _Sala = _interopRequireDefault(require("./Sala"));

var _Inscripcion = _interopRequireDefault(require("./Inscripcion"));

var _Dicta = _interopRequireDefault(require("./Dicta"));

var _Asiste = _interopRequireDefault(require("./Asiste"));

var _Redes_sociales = _interopRequireDefault(require("./Redes_sociales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//1:1 Usuario - Genero
_Genero["default"].hasOne(_Usuario["default"], {
  foreignKey: "nombregenero"
});

_Usuario["default"].belongsTo(_Genero["default"], {
  foreignKey: "nombregenero"
}); //1:n Institucion - Usuario


_Institucion["default"].hasMany(_Usuario["default"], {
  foreignKey: "codinst",
  as: "administradores"
});

_Usuario["default"].belongsTo(_Institucion["default"], {
  foreignKey: "codinst",
  as: "administrador"
}); //n:n Disciplina - Usuario


_Usuario["default"].belongsToMany(_Disciplina["default"], {
  through: "entrenador_disciplina",
  foreignKey: "email"
});

_Disciplina["default"].belongsToMany(_Usuario["default"], {
  through: "entrenador_disciplina",
  foreignKey: "nombredisciplina"
}); //Horario asssotiacion n:n Dia - Institucion


_Horario["default"].belongsTo(_Dia["default"], {
  foreignKey: "nombredia"
});

_Horario["default"].belongsTo(_Institucion["default"], {
  foreignKey: "codinst"
}); //institucion_disciplina n:n Disciplina - Institucion


_Institucion_disciplina["default"].belongsTo(_Institucion["default"], {
  foreignKey: "codinst",
  as: "institucion"
});

_Institucion_disciplina["default"].belongsTo(_Disciplina["default"], {
  foreignKey: "nombredisciplina"
});

_Institucion["default"].belongsToMany(_Disciplina["default"], {
  through: "institucion_disciplina",
  foreignKey: "codinst"
});

_Disciplina["default"].belongsToMany(_Institucion["default"], {
  through: "institucion_disciplina",
  foreignKey: "nombredisciplina"
}); //n:1 Sala - Institucion


_Sala["default"].belongsTo(_Institucion["default"], {
  foreignKey: "codinst"
});

_Institucion["default"].hasMany(_Sala["default"], {
  foreignKey: "codinst"
}); //Inscripcion n:n Institucion_disciplina - Usuario
//User.belongsToMany(InstitucionDisciplina, {through: Inscripcion, foreignKey: "email"});
//InstitucionDisciplina.belongsToMany(User, {through: Inscripcion});  //Consultar con profesoras


_Inscripcion["default"].belongsTo(_Usuario["default"], {
  foreignKey: "email"
});

_Usuario["default"].hasMany(_Inscripcion["default"], {
  foreignKey: 'email'
});

_Inscripcion["default"].belongsTo(_Institucion_disciplina["default"], {
  foreignKey: "idinstdisc"
});

_Institucion_disciplina["default"].hasMany(_Inscripcion["default"], {
  foreignKey: 'idinstdisc'
});

_Institucion_disciplina["default"].belongsTo(_Institucion["default"], {
  foreignKey: 'codinst'
});

_Institucion["default"].hasMany(_Institucion_disciplina["default"], {
  foreignKey: 'codinst'
}); //InstitucionDisciplina.belongsToMany(User, {through: 'inscripcion', foreignKey: 'idinstdisc'});
//User.belongsToMany(InstitucionDisciplina, {through: 'inscripcion', foreignKey: 'email'});
//Dicta


_Dicta["default"].belongsTo(_Usuario["default"], {
  foreignKey: "email",
  as: 'entrenador'
}); //User.hasMany(Dicta);


_Dicta["default"].belongsTo(_Dia["default"], {
  foreignKey: "nombredia"
});

_Dicta["default"].belongsTo(_Sala["default"], {
  foreignKey: "salaid"
});

_Dicta["default"].belongsTo(_Disciplina["default"], {
  foreignKey: "nombredisciplina"
});

_Dicta["default"].belongsTo(_Sala["default"], {
  foreignKey: 'salaid'
});

_Sala["default"].hasMany(_Dicta["default"], {
  foreignKey: 'salaid'
}); //Asiste


_Usuario["default"].belongsToMany(_Dicta["default"], {
  foreignKey: 'emailcliente',
  otherKey: 'dictaid',
  through: 'asiste',
  as: 'disciplinasAsistidas'
});

_Dicta["default"].belongsToMany(_Usuario["default"], {
  foreignKey: 'dictaid',
  otherKey: 'emailcliente',
  through: 'asiste',
  as: 'cliente'
});

_Asiste["default"].belongsTo(_Usuario["default"], {
  foreignKey: "emailcliente"
});

_Usuario["default"].hasMany(_Asiste["default"], {
  foreignKey: 'emailcliente'
});

_Asiste["default"].belongsTo(_Dicta["default"], {
  foreignKey: "dictaid",
  as: 'asistencias'
});

_Dicta["default"].hasMany(_Asiste["default"], {
  foreignKey: 'dictaid',
  as: 'asistio'
}); //Redes sociales 


_Institucion["default"].hasMany(_Redes_sociales["default"], {
  foreignKey: "codinst",
  as: "institucion"
});

_Redes_sociales["default"].belongsTo(_Institucion["default"], {
  foreignKey: "codinst",
  as: "institucion"
}); //import InstitucionDisciplina from "./Institucion_disciplina";
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