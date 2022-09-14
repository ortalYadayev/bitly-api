import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from "path";
import * as express from 'express';

import shortLinkRoute from "./routes/shortLink.route";

const PREFIX_ROUTE = '/api';

const createExpressInstance = () => {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    const app = express();

    app.use(cors())

    app.use(bodyParser.json())

    app.use((_, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        next();
    });

    // Routes
    app.use(PREFIX_ROUTE, shortLinkRoute);

    return app
}

export default createExpressInstance