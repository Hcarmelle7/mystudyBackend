import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";
import Quiz from "./Quiz.js";
import Question from "./Questions.js";

const QuizQuestion = sequelize.define('QuizQuestion', {

  quizId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Quiz,
      key: "id",
    },
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Question,
      key: "id",
    },
  },
  tempsMis: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  isValidated: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  tableName: 'quizQuestion',
  timestamps: false,
});

// Association
QuizQuestion.belongsTo(Quiz, {foreignKey: 'quizId'});
QuizQuestion.belongsTo(Question, {foreignKey: 'questionId'});

export default QuizQuestion;
