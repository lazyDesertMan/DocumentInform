import { Request, Response } from 'express';
import { CookieData } from '../models/cookieData';
import { UserData } from '../models/userData';
import DbgUserRepository from '../services/data/user/dbgUserRepository';
import IUserRepository from '../services/data/user/iUserRepository';
import { jwtManager } from '../services/jwtManager';
import passwordManager from '../services/passwordManager';

export default class UserController {
    protected userRepository : IUserRepository;

    constructor() {
        this.userRepository = new DbgUserRepository();
    }

    protected getToken (req: Request) : string {
        const token = String(req.cookies.usr)
        return token ? token : "";
    }

    public getActiveUser(req : Request) : UserData {
        const token : string = this.getToken(req);
        if (token != "") {
            const cookie : CookieData = jwtManager.verify(token);
            const user : UserData = cookie.user;
            return user;
        }
        return null;
    }

    public login(res : Response, user_login: string, user_password: string): boolean {
        const hashPassword = passwordManager.hash(user_password);
        const user = this.userRepository.auth(user_login, hashPassword.toString());
        if (user != null) {
            const cookie = jwtManager.create(user);
            res.cookie("usr", cookie, { maxAge: 10_000_000_000});
            return true;
        }
        return false;
    }

    public findUserByID(userID : number) : UserData {
        return this.userRepository.findByID(userID)
    }
}