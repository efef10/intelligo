import dotenv from 'dotenv';
import app from "./app";
import { connectDb } from './db/connect';

dotenv.config();
const port = process.env.PORT || 3000;

connectDb().then(async () => {

    console.log(`successfully connected to mongodb`)

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    );
  });
