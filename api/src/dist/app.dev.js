"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _auth = require("./core/auth");

var _Usuarios = _interopRequireDefault(require("./routes/Usuarios"));

var _Asiste = _interopRequireDefault(require("./routes/Asiste"));

var _Disciplinas = _interopRequireDefault(require("./routes/Disciplinas"));

var _Instituciones = _interopRequireDefault(require("./routes/Instituciones"));

var _Horarios = _interopRequireDefault(require("./routes/Horarios"));

var _Test = _interopRequireDefault(require("./routes/Test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//routes import
//test
//init
var app = (0, _express["default"])();

var formData = require("express-form-data"); //middleware
// Put this statement near the top of your module


app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)()); // delete from the request all empty files (size == 0)

app.use(formData.format()); //routes

app.use('/api/users', _Usuarios["default"]);
app.use('/api/attendances', _Asiste["default"]);
app.use('/api/disciplines', _Disciplinas["default"]);
app.use('/api/institutions', _Instituciones["default"]);
app.use('/api/attention-schedule', _Horarios["default"]);
app.use('/api/test', _Test["default"]);
var _default = app;
exports["default"] = _default;