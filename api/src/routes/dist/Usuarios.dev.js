"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _Usuario = require("../controllers/Usuario.controller");

var authorize = require("../core/auth");

var router = (0, _express.Router)();
router.get('/', authorize, _Usuario.viewUsuarios);
router.post('/login', [(0, _expressValidator.check)('email').isEmail().not().isEmpty().isLength({
  min: 3
}), (0, _expressValidator.check)('contraseña', 'Password should be between 5 to 8 characters long').not().isEmpty().isLength({
  min: 5,
  max: 10
})], _Usuario.loginUsuarios); // Sign-up

router.post("/register", [(0, _expressValidator.check)('nombredeusuario').not().isEmpty().isLength({
  min: 3
}).withMessage('Name must be atleast 3 characters long'), (0, _expressValidator.check)('email', 'Email is required').not().isEmpty(), (0, _expressValidator.check)('contraseña', 'Password should be between 5 to 8 characters long').not().isEmpty().isLength({
  min: 5,
  max: 8
})], // agregar mas checks xd
_Usuario.createUsuarios);
router.get('/:email/inscriptions', (0, _expressValidator.check)('email', 'Email is required').not().isEmpty().isEmail(), _Usuario.viewInscripciones);
router.post('/update/password', [(0, _expressValidator.check)('email').isEmail().not().isEmpty().isLength({
  min: 3
}), (0, _expressValidator.check)('contraseña', 'Password should be between 5 to 8 characters long').not().isEmpty().isLength({
  min: 5,
  max: 10
}), (0, _expressValidator.check)('nuevacontraseña', 'Password should be between 5 to 8 characters long').not().isEmpty().isLength({
  min: 5,
  max: 20
})], authorize, _Usuario.updatePassword);
var _default = router;
exports["default"] = _default;