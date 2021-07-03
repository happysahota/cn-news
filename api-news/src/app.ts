import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { PORT } from './utils/secrets';

// Controllers imports
import * as homeController from './controllers/homeController';

// Routes Import
import newsRoute from './routes/newsRoute';

// Middleware Import
import * as authenticationMW from './middlewares/authenticationMW';

dotenv.config();
const app = express();

// Express configuration
app.set("port", PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);


// @TODO: enable only for specific domains or add authorization using auth token...
app.use(cors());

app.get('/', homeController.index);
app.use('/news', authenticationMW.jwtFunction, newsRoute);

app.use(function(req, res, next) {
    res.status(404).json([{ msg: 'Something missing, please try again later.' }]);
});


export default app;