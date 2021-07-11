import { DataTypes, Model, Optional } from "sequelize";
import { DocumentData } from "../../../models/documents/DocumentData";
import { TaskData } from "../../../models/documents/TaskData";
import { DBContext } from "../../DBContext";
import { UserRepository } from "../UserRepository";
import { DocumentRepository } from "./DocumentRepository";


/*
 * \brief Определение необязательных параметров для обработки групп
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface TaskAttributes extends Optional<TaskData, 'id'> { }

/*
 * \brief Хранилище групп
 */
class TaskRepository extends Model<TaskAttributes> implements TaskData {
    public id!:          number;   //!< ID задачи
    public sender!:      number;   //!< ID пользователя, выдавшего задачу
    public recipient!:   number;   //!< ID пользователя, получившего задачу
    public document_id!: number;   //!< ID документа, с которым требуется ознакомиться
    public must_read!:   boolean;  //!< Должен ли получатель ознакомиться с документом
    public must_resend!: boolean;  //!< Должен ли получатель переслать документ подчинённым
    public send_date!:   Date;     //!< Дата выдачи задачи
    public deadline!:    Date;     //!< Крайний срок ознакомления с документом
}

/*
 * \brief Определение модели таблицы групп
 */
TaskRepository.init({
    // ID документа
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    sender: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    recipient: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    document_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    must_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    must_resend: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    send_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "task",      //!< Имя таблицы заданий на ознакомление
    sequelize: DBContext,
    timestamps: false
});

TaskRepository.belongsTo(UserRepository, { targetKey: "id", foreignKey: "sender" });
UserRepository.hasOne(TaskRepository, { sourceKey: "id", foreignKey: "sender" });

TaskRepository.belongsTo(UserRepository, { targetKey: "id", foreignKey: "recipient" });
UserRepository.hasOne(TaskRepository, { sourceKey: "id", foreignKey: "recipient" });

TaskRepository.belongsTo(DocumentRepository, { targetKey: "id", foreignKey: "document_id" });
DocumentRepository.hasOne(TaskRepository, { sourceKey: "id", foreignKey: "document_id" });

export {
    TaskRepository
}