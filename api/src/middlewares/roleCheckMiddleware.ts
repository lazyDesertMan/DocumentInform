import express = require('express');
import { CookieData } from '../models/cookieData';
import { UserData } from '../models/userData';
import { jwtManager } from '../services/jwtManager';

/*
 * \brief Получение токена из cookie
 */
function getToken (req: express.Request) : string {
    if (req.cookies.usr != undefined) {
        return req.cookies.usr;
    }
    return null;
}

/**
 * Получение данных пользователя из куки
 * @param req Данные запроса
 * @returns Данные пользователя
 */
function getUser(req: express.Request) {
    let cookie : CookieData = jwtManager.verify(getToken(req));
    return cookie.user;
}

/*
 * Проверка, что текущий пользователь находится в указанной роли
 */
export default (requiredRole : string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let user : UserData = getUser(req);
            let access : boolean = false;
            for (let idx = 0; !access && idx < requiredRole.length; idx++)
                if (requiredRole[idx] == user.role)
                    access = true;
            if (access)
                return next();
            else
                return res.status(403).end();  // 403 - Нет прав доступа
        } catch {
            return res.status(401).end();      // 401 - Не авторизован
        }
    }
}

export {
    getUser
}

