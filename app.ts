import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser'
import * as express from 'express';
import * as path from 'path';
import * as console from 'console';
import auth from './routes/AuthAPI';
import user from './routes/UserAPI';
import { DBContext } from './services/DBContext';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', auth);
app.use('/', user);

app.use(function (req, res, next) {
    console.warn((new Date()).toLocaleString('ru') + ': Unknow address \'' + req.url + '\'');
    res.status(404);
    res.json({error: 'Not found'});
    return;
});

app.listen(1337, async function () {
    await DBContext.authenticate();
    await DBContext.sync();
    console.info('Starting listen an port 1337\n');
});