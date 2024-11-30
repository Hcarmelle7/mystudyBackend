import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Student from "./Student.js";
import Cour from "./Cour.js";
import Classe from "./Classe.js";

const Program = sequelize.define('Program', {
  
  day: {
    type: DataTypes.ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('freeTime', 'activity', 'cours'),
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Student,
      key: "id",
    },
  },
  classeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Classe,
      key: "id",
    },
  },
  courId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Cour,
      key: "id",
    },
  },
}, {
  tableName: 'program',
  timestamps: false,
});

// Association
Program.belongsTo(Student, {foreignKey: 'studentId' });
Program.belongsTo(Classe, {foreignKey: 'classeId' });
Program.belongsTo(Cour, {foreignKey: 'courId' });

export default Program;
