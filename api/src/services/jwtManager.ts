import * as jwt from 'jsonwebtoken';
import { CookieData } from "../models/cookieData";
import { UserData } from "../models/userData";

/**
 * Класс, отвечающий за создание и верификацию JWT
 */
class jwtManager {
    private static readonly JWTKey = 'SecretKey';

    /**
     * Создание токена
     * @param user Данные о пользователе, помещаемые в токен
     * @returns JWT
     */
    public static create(user: UserData) : string {
        let cookie : CookieData = new CookieData();
        cookie.user = user;
        return jwt.sign({cookie}, jwtManager.JWTKey, { expiresIn: '7d' });
    }

    /**
     * Верификация jwt
     * @param token Верифицируемый токен
     * @returns Данные токена
     */
    public static verify(token : string) : CookieData {
        let verifiedToken : any = jwt.verify(token, jwtManager.JWTKey);
        return verifiedToken.cookie as CookieData
    }
}

export {
    jwtManager
}
