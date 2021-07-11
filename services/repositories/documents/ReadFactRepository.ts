import { DataTypes, Model } from "sequelize";
import { ReadFactData } from "../../../models/documents/ReadFactData";
import { DBContext } from "../../DBContext";
import { TaskRepository } from "./TaskRepository";

/*
 * \brief ��������� ������ � ������� ����������
 */
class ReadFactRepository extends Model<ReadFactData> {
    public task_id!:  number;  //!< ID ������������ ���������
    public read_date!: Date;   //!< ���� � ����� ������������ � ����������
}

/*
 * \brief ����������� ������ ������� ������ ����������
 */
ReadFactRepository.init({
    // ID ������
    task_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID ���� ������������
    read_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "read_fact",      //!< ��� ������� ������ ������������ � �����������
    sequelize: DBContext,
    timestamps: false
});

ReadFactRepository.belongsTo(TaskRepository, { targetKey: "id", foreignKey: "task_id" });
TaskRepository.hasOne(ReadFactRepository, { sourceKey: "id", foreignKey: "task_id" });

export {
    ReadFactRepository
}