import { DataTypes, Model, Optional } from "sequelize";
import { DocumentData } from "../../../models/documents/DocumentData";
import { DBContext } from "../../DBContext";

/*
 * \brief ����������� �������������� ���������� ��� ��������� ����������
 * 
 * �������� id ������������� ������������ ����
 */
interface DocumentAttributes extends Optional<DocumentData, 'id'> { }

/*
 * \brief ��������� �����
 */
class DocumentRepository extends Model<DocumentAttributes> implements DocumentData {
    public id!:             number;  //!< ID ���������
    public name!:           string;  //!< �������� ��������� (�����������)
    public file_path!:      string;  //!< ��� ����� (� �����������)
    public effective_date!: Date;    //!< ���� ���������� ��������� � ����
}

/*
 * \brief ����������� ������ ������� ����������
 */
DocumentRepository.init({
    // ID ���������
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // �������� ��������� (�����������)
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // ��� ����� (� �����������)
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // ���� ���������� ��������� � ����
    effective_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "document",      //!< ��� ������� ����������
    sequelize: DBContext,
    timestamps: false
});

export {
    DocumentRepository
}