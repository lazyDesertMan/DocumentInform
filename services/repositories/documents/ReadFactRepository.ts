import { DataTypes, Model } from "sequelize";
import { ReadFactData } from "../../../models/documents/ReadFactData";
import { DBContext } from "../../DBContext";
import { TaskRepository } from "./TaskRepository";

/*
 * \brief Хранилище данных о заменах документов
 */
class ReadFactRepository extends Model<ReadFactData> {
    public task_id!:  number;  //!< ID прочитанного документа
    public read_date!: Date;   //!< Дата и время ознакомления с документом
}

/*
 * \brief Определение модели таблицы замены документов
 */
ReadFactRepository.init({
    // ID задачи
    task_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID дата ознакомления
    read_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: "read_fact",      //!< Имя таблицы фактов ознакомления с документами
    sequelize: DBContext,
    timestamps: false
});

ReadFactRepository.belongsTo(TaskRepository, { targetKey: "id", foreignKey: "task_id" });
TaskRepository.hasOne(ReadFactRepository, { sourceKey: "id", foreignKey: "task_id" });

export {
    ReadFactRepository
}