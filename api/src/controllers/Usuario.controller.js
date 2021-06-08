import User from "../models/Usuario";

//
export async function viewUsuarios(req, res) {
    const users = await User.findAll();
    console.log(req.body);
    res.json({
        data: users
    });
}