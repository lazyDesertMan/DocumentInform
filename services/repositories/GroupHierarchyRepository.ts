import { DataTypes, Model, Optional } from "sequelize";
import { GroupHierarchyData } from "../../models/GroupHierarchyData";
import { DBContext } from "../DBContext";
import { GroupRepository } from "./GroupRepository";

/*
 * \brief ��������� �����
 */
class GroupHierarchyRepository extends Model<GroupHierarchyData> {
    public group!:        number;  //!< ID ������
    public mother_group!: number;  //!< ID ������������ ������
}

/*
 * \brief ����������� ������ ������� ��������� �����
 */
GroupHierarchyRepository.init({
    // ID ������
    group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID ������������ ������
    mother_group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    tableName: "group_hierarchy",      //!< ��� ������� GroupHierarchy
    sequelize: DBContext,
    timestamps: false
});


GroupHierarchyRepository.belongsTo(GroupRepository, { targetKey: "id", foreignKey: "mother_group" });
GroupRepository.hasOne(GroupHierarchyRepository, { sourceKey: "id", foreignKey: "mother_group" });

GroupHierarchyRepository.belongsTo(GroupRepository, { targetKey: "id", foreignKey: "group" });
GroupRepository.hasOne(GroupHierarchyRepository, { sourceKey: "id", foreignKey: "group" });

export {
    GroupHierarchyRepository
}