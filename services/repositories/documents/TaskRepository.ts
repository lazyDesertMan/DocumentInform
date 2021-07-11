import { DataTypes, Model, Optional } from "sequelize";
import { DocumentData } from "../../../models/documents/DocumentData";
import { TaskData } from "../../../models/documents/TaskData";
import { DBContext } from "../../DBContext";
import { UserRepository } from "../UserRepository";
import { DocumentRepository } from "./DocumentRepository";


/*
 * \brief ����������� �������������� ���������� ��� ��������� �����
 * 
 * �������� id ������������� ������������ ����
 */
interface TaskAttributes extends Optional<TaskData, 'id'> { }

/*
 * \brief ��������� �����
 */
class TaskRepository extends Model<TaskAttributes> implements TaskData {
    public id!:          number;   //!< ID ������
    public sender!:      number;   //!< ID ������������, ��������� ������
    public recipient!:   number;   //!< ID ������������, ����������� ������
    public document_id!: number;   //!< ID ���������, � ������� ��������� ������������
    public must_read!:   boolean;  //!< ������ �� ���������� ������������ � ����������
    public must_resend!: boolean;  //!< ������ �� ���������� ��������� �������� ����������
    public send_date!:   Date;     //!< ���� ������ ������
    public deadline!:    Date;     //!< ������� ���� ������������ � ����������
}

/*
 * \brief ����������� ������ ������� �����
 */
TaskRepository.init({
    // ID ���������
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
    tableName: "task",      //!< ��� ������� ������� �� ������������
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