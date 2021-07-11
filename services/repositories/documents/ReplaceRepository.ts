import { DataTypes, Model } from "sequelize";
import { ReplaceData } from "../../../models/documents/ReplaceData";
import { DBContext } from "../../DBContext";
import { DocumentRepository } from "./DocumentRepository";

/*
 * \brief ��������� ������ � ������� ����������
 */
class ReplaceRepository extends Model<ReplaceData> {
    public old_version!: number;  //!< ID ����������� ���������
    public new_version!: number;  //!< ID ���������, ����������� ����������
}

/*
 * \brief ����������� ������ ������� ������ ����������
 */
ReplaceRepository.init({
    // ID ����������� ���������
    old_version: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID ���������, ����������� ����������
    new_version: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "replace_document",      //!< ��� ������� ������ ����������
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