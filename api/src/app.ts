import * as express from 'express';
import * as path from 'path';
import * as console from 'console';
import bodyParser = require('body-parser');
import * as cookieParser from 'cookie-parser';
import http = require('http');
import * as cors from 'cors';

import authRouter from './routes/authRouter';
import taskRouter from './routes/taskRouter';
import documentRouter from './routes/documentRouter';

const app = express();
const server = http.createServer(app);

let corsOptions : cors.CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/api/login', authRouter);
app.use('/api/task', taskRouter);
app.use('/api/document', documentRouter);

server.listen(1337, 'localhost', async function () {
    console.info('Starting listen an port 1337\n');
});