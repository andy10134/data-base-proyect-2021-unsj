import app from './app';

async function main(){
    const port = 4000;
    await app.listen(port); 
    console.log("Servidor corriendo :D");
}

main();