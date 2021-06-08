import Usuario from "../models/Usuario";

export async function viewUsuarios(req, res) {
    const usuarios = await Usuario.findAll();
    console.log(req.body);
    res.json({
        data: usuarios
    });
}