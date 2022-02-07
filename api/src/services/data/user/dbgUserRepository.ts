import { Roles } from '../../../models/userData';
import { UserData } from '../../../models/userData';
import iUserRepository from './iUserRepository';

class dbgUserRepository implements iUserRepository {
    private static users : UserData[] = [
        new UserData().init(1, "User", Roles.ROLE_WORKER, "User"),
        new UserData().init(2, "Leader", Roles.ROLE_LEADER, "Leader"),
        new UserData().init(3, "Director", Roles.ROLE_DIRECTOR, "Director")
    ];
    
    private static id : number = dbgUserRepository.users.length + 1;

    public list(): UserData[] {
        return dbgUserRepository.users;
    }

    public findByID(id: number): UserData {
        for (let idx : number = 0; idx < dbgUserRepository.users.length; idx++) {
            if (dbgUserRepository.users[idx].id == id)
                return dbgUserRepository.users[idx];
        }
        return null;
    }

    public auth(login: string, password: string): UserData {
        for (let idx : number = 0; idx < dbgUserRepository.users.length; idx++) {
            if (dbgUserRepository.users[idx].login == login)
                return dbgUserRepository.users[idx];
        }
        return null;
    }

    public add(login: string, password: string, name: string, role: Roles): void {
        dbgUserRepository.users.push(new UserData().init(dbgUserRepository.id++, login, role, name));
    }
}

export default dbgUserRepository;