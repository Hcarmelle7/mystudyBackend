import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Quiz from "./Quiz.js";
import User from "./User.js";

const Score = sequelize.define('Score', {

    score: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },

}, {
    tableName: 'score',
    timestamps: false,
});

// Associations
Score.belongsTo(Quiz, { foreignKey: 'quizId' });
Score.belongsTo(User, { foreignKey: 'userId' });

export default Score;