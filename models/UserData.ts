/*
 * \brief Данные о пользователе системы 
 */
class UserData {
    public id:    number;  //!< ID пользователя
    public login: string;  //!< Логин пользователя
    public role:  string;  //!< Роль пользователя в системе
    public name:  string;  //!< Полное имя пользователя
}

/*
 * \brief Данные о пользователе системы, сохранённые в хранилище данных
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
    UserData
}