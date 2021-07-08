import express = require('express');
import * as console from 'console';
import * as jwt from 'jsonwebtoken';
import auth from '../services/AuthService';
import UserData from '../models/UserData';

const getToken = (req: express.Request) => {
    if (req.cookies.usr != undefined) {
        return req.cookies.usr;
    }
}

export default (requiredRole) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let user: UserData = jwt.verify(getToken(req), auth.JWTKey).user;
            if (user.role !== requiredRole) {
                console.error(user.role + ' !== ' + requiredRole);
                return res.status(403).end();
            } else {
                console.info(user.role);
                return next();
            }
        } catch { res.status(401).end(); }
    }
}