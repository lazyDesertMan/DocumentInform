import { DataTypes, Model, Optional } from "sequelize";
import { GroupHierarchyData } from "../../../models/groups/GroupHierarchyData";
import { DBContext } from "../../DBContext";
import { GroupRepository } from "../groups/GroupRepository";

/*
 * \brief Хранилище ролей
 */
class GroupHierarchyRepository extends Model<GroupHierarchyData> {
    public group!:        number;  //!< ID группы
    public mother_group!: number;  //!< ID родительской группы
}

/*
 * \brief Определение модели таблицы иерхархии групп
 */
GroupHierarchyRepository.init({
    // ID группы
    group: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    // ID родительской группы
    mother_group: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: "group_hierarchy",      //!< Имя таблицы иерархии подразделений
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