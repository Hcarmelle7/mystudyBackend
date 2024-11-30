import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import User from "./User.js";

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    level: {
        type: DataTypes.TEXT,
    },
    subject: {
        type: DataTypes.TEXT,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },
}, {
    tableName: 'teacher',
    timestamps: false,
});

Teacher.belongsTo(User, { foreignKey: 'userId'});

export default Teacher