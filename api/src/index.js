import app from './app';

//testing
import sequelize from "./db/db";
require('./models/Associations');

async function main(){
    const port = 4000;
    /*await app.listen(port); 
    console.log("Servidor corriendo :D");*/
    app.listen(port, function () {
        console.log(`La app ha arrancado en`);
    
        // Conectase a la base de datos
        // Force true: DROP TABLES
        sequelize.sync({ force: false }).then(() => {
            console.log("Nos hemos conectado a la base de datos");
        }).catch(error => {
            console.log('Se ha producido un error', error);
        })
    
    });

}

main();