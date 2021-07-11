import { DataTypes, Model, Optional } from "sequelize";
import { DocumentData } from "../../../models/documents/DocumentData";
import { DBContext } from "../../DBContext";

/*
 * \brief Определение необязательных параметров для обработки документов
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface DocumentAttributes extends Optional<DocumentData, 'id'> { }

/*
 * \brief Хранилище групп
 */
class DocumentRepository extends Model<DocumentAttributes> implements DocumentData {
    public id!:             number;  //!< ID документа
    public name!:           string;  //!< Название документа (официальное)
    public file_path!:      string;  //!< Имя файла (с расширением)
    public effective_date!: Date;    //!< Дата вступления документа в силу
}

/*
 * \brief Определение модели таблицы документов
 */
DocumentRepository.init({
    // ID документа
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // Название документа (официальное)
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Имя файла (с расширением)
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Дата вступления документа в силу
    effective_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "document",      //!< Имя таблицы документов
    sequelize: DBContext,
    timestamps: false
});

export {
    DocumentRepository
}