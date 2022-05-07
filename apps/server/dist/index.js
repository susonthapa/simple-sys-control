"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const child_process_1 = require("child_process");
const common_domain_1 = require("common-domain");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
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
const jsonParser = body_parser_1.default.json();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../react-native/web-build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../react-native/web-build', 'index.html'));
});
app.post('/action', jsonParser, (req, res) => {
    (0, child_process_1.exec)(`dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.${req.body.action} boolean:false`, (error, stdout, stderr) => {
        if (error) {
            return res.json((0, common_domain_1.failure)({
                code: 500,
                message: error.message
            }));
        }
        if (stderr) {
            return res.json((0, common_domain_1.failure)({
                code: 500,
                message: stderr
            }));
        }
        res.json((0, common_domain_1.success)({
            message: 'Executed successfully!'
        }));
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
