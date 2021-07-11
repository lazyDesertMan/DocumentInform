import { DataTypes, Model, Optional } from "sequelize";
import { RoleData } from "../../models/RoleData";
import { DBContext } from "../DBContext";


/*
 * \brief ����������� �������������� ���������� ��� ��������� �����
 * 
 * �������� id ������������� ������������ ����
 */
interface RoleAttributes extends Optional<RoleData, 'id'> { }

/*
 * \brief ��������� �����
 */
class RoleRepository extends Model<RoleAttributes> implements RoleData {
    public id!:   number;  //!< ID ����
    public name!: string;  //!< �������� ����
}

/*
 * \brief ����������� ������ ������� �����
 */
RoleRepository.init({
    // ID ����
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // �������� ����
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "role",      //!< ��� ������� �����
    sequelize: DBContext,
    timestamps: false
});

export {
    RoleRepository
}