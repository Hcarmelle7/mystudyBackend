import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Student from "./Student.js";

const StudyPlan = sequelize.define(
  "StudyPlan",
  {
    content: {
      type: DataTypes.JSON,
      allowNull: false,
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
  },
  {
    tableName: "StudyPlan",
    timestamps: false,
  }
);
StudyPlan.belongsTo(Student, { foreignKey: 'student_id' });

export default StudyPlan;
