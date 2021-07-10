import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { UserData } from '../models/UserData';
import { RoleRepository } from './repositories/RoleRepository';
import { UserRepository } from './repositories/UserRepository';

export default class AuthService {
    public static readonly JWTKey = 'SecretKey';

    private CreateJWT(user: UserData) {
        return jwt.sign({ user }, AuthService.JWTKey, { expiresIn: '7d' });
    }

    public async Hash(str: string) {
        return await argon2.hash(str, {
            hashLength: 64,
            type: argon2.argon2i
        });
    }

    public async Login(user_login: string, user_password: string): Promise<any> {
        let user = await UserRepository.findOne({ where: { login: user_login }});
        if (user !== null) {
            let isCorrect: boolean = await argon2.verify(user.password, user_password, { type: argon2.argon2i, hashLength: 64 });
            if (isCorrect) {
                let userData = new UserData();
                userData.id = user.id;
                userData.login = user.login;
                userData.name = user.name;
                userData.role = (await RoleRepository.findOne({ where: { id: user.role_id } })).name;
                return this.CreateJWT(userData);
            }
        }
        return null;
    }
}