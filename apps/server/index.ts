import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'
import { exec } from 'child_process';
import { success, failure } from 'common-domain'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = domainsFromEnv.split(",").map(it => it.trim())

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
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  exec(`dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:false`, (error, stdout, stderr) => {
    if (error) {
      return res.json(failure({
        code: 500,
        message: error.message
      }))
    }

    if (stderr) {
      return res.json(failure({
        code: 500,
        message: stderr
      }))
    }
    res.json(success({
      message: 'Executed successfully!'
    }))
  })

});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
