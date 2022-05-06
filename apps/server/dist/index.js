"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Response_1 = require("./src/domain/Response");
const child_process_1 = require("child_process");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const domainsFromEnv = process.env.CORS_DOMAINS || "";
const whitelist = domainsFromEnv.split(",").map(it => it.trim());
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    (0, child_process_1.exec)(`dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:false`, (error, stdout, stderr) => {
        if (error) {
            return res.json((0, Response_1.failure)({
                code: 500,
                message: error.message
            }));
        }
        if (stderr) {
            return res.json((0, Response_1.failure)({
                code: 500,
                message: stderr
            }));
        }
        res.json((0, Response_1.success)({
            message: 'Executed successfully!'
        }));
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
