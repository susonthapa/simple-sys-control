import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import path from 'path';
import routes from './src/data/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = domainsFromEnv.split(",").map(it => it.trim())

const setupServer = () => {
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }

  const jsonParser = bodyParser.json()
  app.use(cors(corsOptions))
  app.use(express.static(path.resolve(__dirname, '../../react-native/web-build')))
  app.use(jsonParser)

  app.use('/', routes)
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../../react-native/web-build', 'index.html'))
  })
}

const startServer = () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
}

setupServer()
startServer()

