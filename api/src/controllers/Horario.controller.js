import Horario from "../models/Horario";
import Institucion from "../models/Institucion";

//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
export async function viewHorarios(req, res) {
    const horario = await Horario.findAll();
    console.log(req.body);
    res.json({
        data: horario
    });
}