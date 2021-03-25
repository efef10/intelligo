import express  from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import * as routes from './routes';

const app = express();

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/convertData', routes.dataConversionRouter);

export default app;