import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";
import Subject from "./Subject.js";

const Cour = sequelize.define('Cour', {
  
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subject,
      key: "id"
    }
  },
}, {
  tableName: 'cour',
  timestamps: false,
});

// Association
Cour.belongsToMany(Teacher, { through: 'CourTeacher' });
Teacher.belongsToMany(Cour, { through: 'CourTeacher' });
Cour.belongsTo(Subject, { foreignKey: 'subjectId'});


export default Cour;