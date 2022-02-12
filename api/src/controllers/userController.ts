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
        if (req.cookies.usr != undefined) {
            return req.cookies.usr;
        }
        return "";
    }

    public getActiveUser(req : Request) : UserData {
        let token : string = this.getToken(req);
        if (token != "") {
            let cookie : CookieData = jwtManager.verify(token);
            let user : UserData = cookie.user;
            return user;
        }
        return null;
    }

    public login(res : Response, user_login: string, user_password: string): boolean {
        let hashPassword = passwordManager.hash(user_password);
        let user = this.userRepository.auth(user_login, hashPassword.toString());
        if (user != null) {
            let cookie = jwtManager.create(user);
            res.cookie("usr", cookie);
            return true;
        }
        return false;
    }
}