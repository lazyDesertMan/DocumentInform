import { DataTypes, Model } from "sequelize";
import { ReplaceData } from "../../../models/documents/ReplaceData";
import { DBContext } from "../../DBContext";
import { DocumentRepository } from "./DocumentRepository";

/*
 * \brief Хранилище данных о заменах документов
 */
class ReplaceRepository extends Model<ReplaceData> {
    public old_version!: number;  //!< ID заменяемого документа
    public new_version!: number;  //!< ID документа, заменяющего устаревший
}

/*
 * \brief Определение модели таблицы замены документов
 */
ReplaceRepository.init({
    // ID заменяемого документа
    old_version: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID документа, заменяющего устаревший
    new_version: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "replace_document",      //!< Имя таблицы замены документов
    sequelize: DBContext,
    timestamps: false
});

ReplaceRepository.belongsTo(DocumentRepository, { targetKey: "id", foreignKey: "old_version" });
DocumentRepository.hasOne(ReplaceRepository, { sourceKey: "id", foreignKey: "old_version" });

ReplaceRepository.belongsTo(DocumentRepository, { targetKey: "id", foreignKey: "new_version" });
DocumentRepository.hasOne(ReplaceRepository, { sourceKey: "id", foreignKey: "new_version" });

export {
    ReplaceRepository
}