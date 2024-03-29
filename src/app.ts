import express, { Express, Request, Response } from "express";
import appRoute from './routes';
import cors from 'cors';

const app: Express = express();
const port = 8080;

app.use(appRoute);

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
