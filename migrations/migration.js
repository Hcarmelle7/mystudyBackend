import { sequelize } from '../config/db_config.js';
import User from '../src/models/User.js';
import Student from '../src/models/Student.js';
import StudyPlan from '../src/models/StudyPlan.js';
import Cour from '../src/models/Cour.js';
import Classe from '../src/models/Classe.js';
import Admin from '../src/models/Admin.js';
import Message from '../src/models/Discussion.js';
import Questions from '../src/models/Questions.js';
import School from '../src/models/School.js';
import Notification from '../src/models/Notification.js';
import Quiz from '../src/models/Quiz.js';
import Teacher from '../src/models/Teacher.js';
import Score from '../src/models/Score.js';
import Program from '../src/models/Program.js';
import QuizQuestion from '../src/models/QuizQuestion.js';
import Level from '../src/models/Level.js';
import CourTeacher from '../src/models/CourTeacher.js';
import Assessement from '../src/models/assessement.js';
import Country from '../src/models/Country.js';
import UserCountry from '../src/models/UserCountry.js';
import Answer from '../src/models/Answer.js';

sequelize.sync({alter: true}).then(() => {
  console.log('Success Migration');
}).catch(error => console.log('Error Migration', error));
 