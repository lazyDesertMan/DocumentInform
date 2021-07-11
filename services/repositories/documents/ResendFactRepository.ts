import { DataTypes, Model } from "sequelize";
import { ResendFactData } from "../../../models/documents/ResendFactData";
import { DBContext } from "../../DBContext";
import { TaskRepository } from "./TaskRepository";

/*
 * \brief ��������� ������ � ������� ����������
 */
class ResendFactRepository extends Model<ResendFactData> {
    public task_id!: number;          //!< ID �������, � ������ �������� ������������ ��������
    public resend_task_id!: number;   //!< ID ������ �������
    public resend_date!: Date;        //!< ���� � ����� ���������
}

/*
 * \brief ����������� ������ ������� ������ ����������
 */
ResendFactRepository.init({
    // ID ������
    task_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    resend_task_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID ���� ������������
    resend_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "resend_fact",      //!< ��� ������� ��������� ����������
    sequelize: DBContext,
    timestamps: false
});

ResendFactRepository.belongsTo(TaskRepository, { targetKey: "id", foreignKey: "task_id" });
TaskRepository.hasOne(ResendFactRepository, { sourceKey: "id", foreignKey: "task_id" });

ResendFactRepository.belongsTo(TaskRepository, { targetKey: "id", foreignKey: "resend_task_id" });
TaskRepository.hasOne(ResendFactRepository, { sourceKey: "id", foreignKey: "resend_task_id" });

export {
    ResendFactRepository
}