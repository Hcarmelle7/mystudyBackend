import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Question from "./Questions.js";

const Answer = sequelize.define('Answer', {

    isTrue: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Question,
            key: "id",
        },
    }
}, {
    tableName: 'answer',
    timestamps: false,
});

// Association
Answer.belongsTo(Question, { foreignKey: 'questionId' });

export default Answer;