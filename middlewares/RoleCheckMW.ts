import express = require('express');
import * as jwt from 'jsonwebtoken';
import auth from '../services/AuthService';
import { UserData } from '../models/UserData';

/*
 * \brief ѕолучение токена из cookie
 */
function getToken (req: express.Request) {
    if (req.cookies.usr != undefined) {
        return req.cookies.usr;
    }
}

/*
 * \brief ѕроверка, что текущий пользователь находитс€ в указанной роли
 */
export default (requiredRole) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let user: UserData = jwt.verify(getToken(req), auth.JWTKey).user;
            if (user.role !== requiredRole) {
                return res.status(403).end();
            } else {
                return next();
            }
        } catch { res.status(401).end(); }
    }
}