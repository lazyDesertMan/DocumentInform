import { DataTypes, Model, Optional } from "sequelize";
import { PositionData } from "../../../models/groups/PositionData";
import { DBContext } from "../../DBContext";


/*
 * \brief ����������� �������������� ���������� ��� ��������� ����������
 * 
 * �������� id ������������� ������������ ����
 */
interface PositionAttributes extends Optional<PositionData, 'id'> { }

/*
 * \brief ��������� ����������
 */
class PositionRepository extends Model<PositionAttributes> implements PositionData {
    public id!:   number;  //!< ID ���������
    public name!: string;  //!< �������� ���������
}

/*
 * \brief ����������� ������ ������� ����������
 */
PositionRepository.init({
    // ID ���������
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // �������� ���������
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "position",      //!< ��� ������� ����������
    sequelize: DBContext,
    timestamps: false
});

export {
    PositionRepository
}