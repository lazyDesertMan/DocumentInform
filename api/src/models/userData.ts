/**
 * Перечень допустимых ролей
 */
 enum Roles {
    /** Работник */
    ROLE_WORKER   = "worker",
    /** Руководитель */
    ROLE_LEADER   = "leader",
    /** Директор */
    ROLE_DIRECTOR = "director"
}

/*
 * Данные о пользователе системы 
 */
class UserData {
    public id:    number;  //!< ID пользователя
    public login: string;  //!< Логин пользователя
    public role:  string;  //!< Роль пользователя в системе
    public name:  string;  //!< Полное имя пользователя

    public constructor() {
        this.id = 0;
        this.login = "";
        this.name = "";
        this.role = "";
    }

    public init(id : number, login : string, role : string, name : string) : UserData {
        this.id = id;
        this.login = login;
        this.role = role;
        this.name = name;
        return this;
    }
}

/*
 * Данные о пользователе системы, сохранённые в хранилище данных
 */
interface StoredUserData {
    id:       number;  //!< ID пользователя
    login:    string;  //!< Логин пользователя
    password: string;  //!< Хешированный парол
    name:     string;  //!< Полное имя пользователя
    role_id:  number;  //!< Роль пользователя в системе
}

export {
    StoredUserData,
    UserData,
    Roles
}