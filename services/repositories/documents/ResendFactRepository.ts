import { DataTypes, Model } from "sequelize";
import { ResendFactData } from "../../../models/documents/ResendFactData";
import { DBContext } from "../../DBContext";
import { TaskRepository } from "./TaskRepository";

/*
 * \brief Хранилище данных о заменах документов
 */
class ResendFactRepository extends Model<ResendFactData> {
    public task_id!: number;          //!< ID задания, в рамках которого пересылается документ
    public resend_task_id!: number;   //!< ID нового задания
    public resend_date!: Date;        //!< Дата и время пересылки
}

/*
 * \brief Определение модели таблицы замены документов
 */
ResendFactRepository.init({
    // ID задачи
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
    // ID дата ознакомления
    resend_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "resend_fact",      //!< Имя таблицы пересылки документов
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