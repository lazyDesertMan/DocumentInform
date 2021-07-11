import { DataTypes, Model, Optional } from "sequelize";
import { GroupData } from "../../models/GroupData";
import { DBContext } from "../DBContext";
import { UserRepository } from "./UserRepository";


/*
 * \brief ����������� �������������� ���������� ��� ��������� �����
 * 
 * �������� id ������������� ������������ ����
 */
interface GroupAttributes extends Optional<GroupData, 'id'> { }

/*
 * \brief ��������� �����
 */
class GroupRepository extends Model<GroupAttributes> implements GroupData {
    public id!:     number;  //!< ID ������
    public name!:   string;  //!< �������� ������
    public leader!: number;  //!< ID ������ ������
}

/*
 * \brief ����������� ������ ������� �����
 */
GroupRepository.init({
    // ID ������
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // �������� ������
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // ID ������ ������
    leader: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true         // TODO: ����� �� ���� ������� ���������� ����������� ��������?
    },
}, {
    tableName: "group",      //!< ��� ������� Group
    sequelize: DBContext,
    timestamps: false
});

GroupRepository.belongsTo(UserRepository, { targetKey: "id", foreignKey: "leader" });
UserRepository.hasOne(GroupRepository, { sourceKey: "id", foreignKey: "leader" });

export {
    GroupRepository
}