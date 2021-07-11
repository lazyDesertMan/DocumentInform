import { DataTypes, Model, Optional } from 'sequelize';
import { StoredUserData } from "../../models/UserData";
import { DBContext } from "../DBContext";
import { RoleRepository } from './RoleRepository';

// FIX
import { UserGroupRepository } from './UserGroupRepository';
import { GroupRepository } from './GroupRepository';

/*
 * \brief Определение необязательных параметров для обработки данных пользователя
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface UserAttributes extends Optional<StoredUserData, 'id'> { }

/*
 * \brief Хранилище данных пользователя
 */
class UserRepository extends Model<UserAttributes> implements StoredUserData {
    public id!:       number;  //!< ID пользователя
    public login!:    string;  //!< Логин пользователя
    public password!: string;  //!< Хешированный пароль
    public role_id!:  number;  //!< Роль пользователя в системе
    public name!:     string;  //!< Полное имя пользователя
}

/*
 * \brief Определение модели таблицы пользователей
 */
UserRepository.init({
    // ID пользователя
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // Логин пользователя
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Хешированный пароль пользователя
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // ID роли пользователя
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // Полное имя пользователя
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "user",      //!< Имя таблицы с данными пользователей
    sequelize: DBContext,
    timestamps: false
});

UserRepository.belongsTo(RoleRepository, { targetKey: "id", foreignKey: "role_id" });
RoleRepository.hasOne(UserRepository, { sourceKey: "id", foreignKey: "role_id" });

export {
    UserRepository
}