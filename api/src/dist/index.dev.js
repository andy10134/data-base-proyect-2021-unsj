"use strict";

var _app = _interopRequireDefault(require("./app"));

var _db = _interopRequireDefault(require("./db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//testing
require('./models/Associations');

function main() {
  var port;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          port = 4000;
          /*await app.listen(port); 
          console.log("Servidor corriendo :D");*/

          _app["default"].listen(port, function () {
            console.log("La app ha arrancado en"); // Conectase a la base de datos
            // Force true: DROP TABLES

            _db["default"].sync({
              force: false
            }).then(function () {
              console.log("Nos hemos conectado a la base de datos");
            })["catch"](function (error) {
              console.log('Se ha producido un error', error);
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();