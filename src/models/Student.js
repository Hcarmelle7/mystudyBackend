import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import User from "./User.js";
import Level from "./Level.js";

const Student = sequelize.define(
  "Student",
  {
    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Level,
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
  },
  {
    tableName: "Student",
    timestamps: false,
  }
);

Student.belongsTo(User, { foreignKey: 'userId' });
Student.belongsTo(Level, { foreignKey: 'levelId' });


export default Student;
