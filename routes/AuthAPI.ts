import express = require('express');
import AuthService from '../services/AuthService';
import Auth from '../middlewares/AuthMW';
import * as console from 'console';

const router = express.Router();

router.get('/api/auth', Auth('SomeRole'), async function (req: express.Request, res: express.Response) {
    res.send('ok');
});

/*
 * Обработка POST-запроса к api/auth. Авторизация пользователя в системе
 */
router.post('/api/auth', async function (req : express.Request, res : express.Response) {
    try {
        let login: string = req.body.login;
        let password: string = req.body.password;
        let auth = new AuthService();
        let data = await auth.Login(login, password);
        res.cookie('usr', '' + data);
        res.send(true);
        return;
    } catch (e) { console.error(e); }
    res.send(false);
});
export default router;