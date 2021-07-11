import { DataTypes, Model, Optional } from "sequelize";
import { UserGroupData } from "../../models/UserGroupData";
import { DBContext } from "../DBContext";

// FIX
import { UserRepository } from "./UserRepository";


/*
 * \brief ��������� ������ ������������� � ������� � ����������
 */
class UserGroupRepository implements UserGroupData {
    static init(arg0: {
        // ID ������������
        user_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID ������
        group_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID ���������
        position_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
    }, arg1: {
        tableName: string; //!< ��� �������-������ UserGroup
        sequelize: import("sequelize").Sequelize; timestamps: boolean;
    }) {
        throw new Error("Method not implemented.");
    }
    public user_id!: number;  //!< ID ������������
    public group_id!: number;  //!< ID ������
    public position_id!: number;  //!< ID ���������
}

/*
 * \brief ����������� ������ �������-������ ������������-������-���������
 */
UserGroupRepository.init({
    // ID ������������
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID ������
    group_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID ���������
    position_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    tableName: "user_group",      //!< ��� �������-������ UserGroup
    sequelize: DBContext,
    timestamps: false
});

export {
    UserGroupRepository
}