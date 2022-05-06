import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server with hot reload');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
