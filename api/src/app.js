import express, {json} from 'express';
import morgan from 'morgan';

//routes import
import usuariosRoutes from './routes/Usuarios';

//conection import
import db from './core/conection';

//init
const app = express();

//middleware
app.use(morgan('dev'));
app.use(json());

//routes
app.use('/api/users',usuariosRoutes);

export default app; 