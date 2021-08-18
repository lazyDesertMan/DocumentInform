import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser'
import * as express from 'express';
import * as path from 'path';
import * as console from 'console';
import auth from './routes/AuthAPI';
import user from './routes/UserAPI';
import report from './routes/ReportAPI';
import { DBContext } from './services/DBContext';
import { GroupHierarchyRepository } from './services/repositories/groups/GroupHierarchyRepository';
import { GroupRepository } from './services/repositories/groups/GroupRepository';
import { PositionRepository } from './services/repositories/groups/PositionRepository';
import { UserGroupRepository } from './services/repositories/groups/UserGroupRepository';
import { DocumentRepository } from './services/repositories/documents/DocumentRepository';
import { ReadFactRepository } from './services/repositories/documents/ReadFactRepository';
import { ReplaceRepository } from './services/repositories/documents/ReplaceRepository';
import { ResendFactRepository } from './services/repositories/documents/ResendFactRepository';
import { TaskRepository } from './services/repositories/documents/TaskRepository';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', auth);
app.use('/', user);
app.use('/', report);

app.use(async function (req, res, next) {
    console.warn((new Date()).toLocaleString('ru') + ': Unknow address \'' + req.url + '\'');
    res.status(404);
    res.json({error: 'Not found'});
    return;
});

app.listen(1337, async function () {
    await DBContext.authenticate();
    await DBContext.sync();

    // Принудительное создание таблиц (на время разработки)
    GroupHierarchyRepository.findAll();
    GroupRepository.findAll();
    PositionRepository.findAll();
    UserGroupRepository.findAll();

    DocumentRepository.findAll();
    ReadFactRepository.findAll();
    ReplaceRepository.findAll();
    ResendFactRepository.findAll();
    TaskRepository.findAll();

    console.info('Starting listen an port 1337\n');
});