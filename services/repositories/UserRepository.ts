import { DataTypes, Model, Optional } from 'sequelize';
import { StoredUserData } from "../../models/UserData";
import { DBContext } from "../DBContext";
import { RoleRepository } from './RoleRepository';

// FIX
import { UserGroupRepository } from './UserGroupRepository';
import { GroupRepository } from './GroupRepository';

/*
 * \brief ����������� �������������� ���������� ��� ��������� ������ ������������
 * 
 * �������� id ������������� ������������ ����
 */
interface UserAttributes extends Optional<StoredUserData, 'id'> { }

/*
 * \brief ��������� ������ ������������
 */
class UserRepository extends Model<UserAttributes> implements StoredUserData {
    public id!:       number;  //!< ID ������������
    public login!:    string;  //!< ����� ������������
    public password!: string;  //!< ������������ ������
    public role_id!:  number;  //!< ���� ������������ � �������
    public name!:     string;  //!< ������ ��� ������������
}

/*
 * \brief ����������� ������ ������� �������������
 */
UserRepository.init({
    // ID ������������
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // ����� ������������
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // ������������ ������ ������������
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // ID ���� ������������
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    // ������ ��� ������������
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "user",      //!< ��� ������� � ������� �������������
    sequelize: DBContext,
    timestamps: false
});

UserRepository.belongsTo(RoleRepository, { targetKey: "id", foreignKey: "role_id" });
RoleRepository.hasOne(UserRepository, { sourceKey: "id", foreignKey: "role_id" });

export {
    UserRepository
}