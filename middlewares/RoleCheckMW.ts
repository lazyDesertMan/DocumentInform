import express = require('express');
import * as jwt from 'jsonwebtoken';
import auth from '../services/AuthService';
import { UserData } from '../models/UserData';

/*
 * \brief Получение токена из cookie
 */
function getToken (req: express.Request) {
    if (req.cookies.usr != undefined) {
        return req.cookies.usr;
    }
}

function getUser(req: express.Request) {
    let user: UserData = jwt.verify(getToken(req), auth.JWTKey).user;
    return user;
}

/*
 * \brief Проверка, что текущий пользователь находится в указанной роли
 */
export default (requiredRole) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let user: UserData = getUser(req);
            if (user.role !== requiredRole) {
                return res.status(403).end();
            } else {
                return next();
            }
        } catch { res.status(401).end(); }
    }
}

export {
    getUser
}

