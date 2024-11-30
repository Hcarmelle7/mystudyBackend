import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "../config/db_connection.js"; // Pour créer la base de données si elle n'existe pas
import "../migrations/migration.js"; // Pour effectuer la migration
import router from "./routes/authRoute.js";
import StudentRoute from "./routes/studentRoute.js";
import TeacherRoute from "./routes/teacherRoute.js";
import SchoolRoute from "./routes/schoolRoute.js";
import ClasseRoute from "./routes/classeRoute.js";
import ProgramRoute from "./routes/programRoute.js";
import QuestionRoute from "./routes/questionRoute.js";
import QuizRoute from "./routes/quizRoute.js";
import ScoreRoute from "./routes/scoreRoute.js";
import SubjectRoute from "./routes/subjectRoute.js";
import AssessementRoute from "./routes/assessementRoute.js";
import LevelRoute from "./routes/levelRoute.js";
import AnswerRoute from "./routes/answerRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = 3000;


app.use("/api", router);
app.use("/api", StudentRoute);
app.use("/api", TeacherRoute);
app.use("/api", SchoolRoute);
app.use("/api", ClasseRoute);
app.use("/api", ProgramRoute);
app.use("/api", QuestionRoute);
app.use("/api", QuizRoute);
app.use("/api", ScoreRoute);
app.use("/api", SubjectRoute);
app.use("/api", AssessementRoute);
app.use("/api", LevelRoute);
app.use("/api", AnswerRoute);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


