import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import User from "./User.js";

const School = sequelize.define('School', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('primaire', 'collège', 'lycée'),
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(45),
        allowNull: false,
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
    tableName: 'school',
    timestamps: false,
});

School.belongsTo(User, { foreignKey: 'userId'});

export default School;