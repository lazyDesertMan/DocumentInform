import * as jwt from 'jsonwebtoken';
import UserData from '../models/UserData';

export default class AuthService {
    public static readonly JWTKey = 'SecretKey';

    private CreateJWT(user: UserData) {
        return jwt.sign({ user }, AuthService.JWTKey, { expiresIn: '7d' });
    }

    public async Login(login: string, password: string) : Promise<any> {
        if (login != 'test' || password != 'test') {
            throw new Error('Not login');
        }
        let userData = new UserData();
        userData.id = 1;
        userData.email = 'Mail@mail.mail';
        userData.group = 'Group';
        userData.name = 'Some Name';
        userData.role = 'Tests';
        return this.CreateJWT(userData);
    }
}