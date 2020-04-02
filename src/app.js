import express  from 'express';
import bodyParser from "body-parser";
import cors from "cors";

// import * as routes from './routes';
import * as controllers from './controllers';

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use('/users', routes.UsersRoute);

app.get('/', (req, res) => res.send('Hello World!'));

export default app;