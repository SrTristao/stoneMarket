import { router as API } from './api';
import * as config from './config';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Request, Response } from 'express';
import { cors } from './middlewares/cors';

//front
const publicDir = __dirname + '/../dist';

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(publicDir));

app.use('/api', API);

app.listen(config.PORT, () => console.log(`server started: PORT: ${config.PORT} | ENV: ${config.ENV}`));