import express  from 'express';
import cors from "cors";
import * as routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/convertData', routes.dataConversionRouter);

export default app;