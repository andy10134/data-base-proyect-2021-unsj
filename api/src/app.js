import express, {json} from 'express';
import morgan from 'morgan';
import { auth } from "./core/auth";

//routes import
import usuariosRoutes from './routes/Usuarios';
import asistenciaRoutes from './routes/Asiste';
import disciplinasRoutes from './routes/Disciplinas';
import institucionesRoutes from './routes/Instituciones';
import horariosRoutes from './routes/Horarios';


//test
import testRoutes from './routes/Test';

//init
const app = express();
const formData = require("express-form-data");

//middleware
// Put this statement near the top of your module
app.use(morgan('dev'));
app.use(json());
// delete from the request all empty files (size == 0)
app.use(formData.format());


//routes
app.use('/api/users', usuariosRoutes);
app.use('/api/attendances', asistenciaRoutes);
app.use('/api/disciplines', disciplinasRoutes);
app.use('/api/institutions', institucionesRoutes);
app.use('/api/attention-schedule', horariosRoutes);
app.use('/api/test', testRoutes);

export default app; 