import { DataTypes, Model, Optional } from "sequelize";
import { PositionData } from "../../../models/groups/PositionData";
import { DBContext } from "../../DBContext";


/*
 * \brief Определение необязательных параметров для обработки должностей
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface PositionAttributes extends Optional<PositionData, 'id'> { }

/*
 * \brief Хранилище должностей
 */
class PositionRepository extends Model<PositionAttributes> implements PositionData {
    public id!:   number;  //!< ID должности
    public name!: string;  //!< Название должности
}

/*
 * \brief Определение модели таблицы должностей
 */
PositionRepository.init({
    // ID должности
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // Название должности
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "position",      //!< Имя таблицы должностей
    sequelize: DBContext,
    timestamps: false
});

export {
    PositionRepository
}