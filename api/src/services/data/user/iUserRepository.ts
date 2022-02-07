import { Roles } from "../../../models/userData";
import { UserData } from "../../../models/userData";

interface IUserRepository {
    list() : UserData[];
    findByID(id : number) : UserData;
    auth(login : string, password : string) : UserData;
    add(login : string, password : string, name : string, role : Roles) : void;
}

export default IUserRepository;