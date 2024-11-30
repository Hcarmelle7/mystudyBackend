import { where } from "sequelize";
import Quiz from "../models/Quiz.js";
import Question from "../models/Questions.js";
import QuizQuestion from "../models/QuizQuestion.js";
import Answer from "../models/Answer.js";
import sequelize from "../../config/db_config.js";


export async function createQuizWithQuestions(req, res) {
  const { description, title, Nquestions, questions } = req.body;
  const teacherId = req.userId.id;


  try {
    const quiz = await Quiz.create({ description, title, Nquestions, teacherId });

    await quiz.add

    const questionPromises = questions.map(question => {
      return Question.create({
        content: question.content,
        duration: question.isTrue,
      });
    });

    await Promise.all(questionPromises);

    res.status(201).json({ message: 'Question and answers created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create question and answers', error });
  }
}

export const getQuizWithQuestions = async (req, res) => {
  try {
    const { id } = req.params; // Quiz ID from the request parameters

    // Fetch the quiz along with its associated questions
    const quiz = await Quiz.findByPk(id, {
      include: [
        {
          model: Question,
          through: {
            attributes: [] // Exclude attributes from the join table QuizQuestion
          }
        }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Failed to retrieve quiz' });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { description, title, questions, answers } = req.body;
    // const teacherId = req.userId.id;


    const Nquestions = questions ? questions.length : 0;

    const quiz = await Quiz.create({ description, title, Nquestions });

    if (questions && questions.length) {
      for (const questionData of questions) {
        // Create the question
        const question = await Question.create({
          content: questionData.content,
          type: questionData.type,
          level: questionData.level,
          duration: questionData.duration,
          // teacherId,
        });

        if (questionData.answers && questionData.answers.length) {
          const answerPromises = questionData.answers.map(answer => {
            return Answer.create({
              content: answer.content,
              isTrue: answer.isTrue,
              questionId: question.id, // Assuming `questions_id` is the column name
            });
          });
          await Promise.all(answerPromises); // Wait for all answers to be created
        }


        // Associate the question with the quiz
        await QuizQuestion.create({
          quizId: quiz.id,
          questionId: question.id,
          // tempsMis: questionData.tempsMis || null, // Use provided value or null
          // isValidated: questionData.isValidated || false, // Use provided value or default to false
        });
      }
    }

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

export const getQuestionsByQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await sequelize.query(
      `SELECT q.*,qu.id AS quizId, qu.title AS quizTitle, qu.description AS quizDescription, qu.Nquestions as quizNquestions 
       FROM question q 
       INNER JOIN quizquestion qq ON q.id = qq.questionId
       INNER JOIN quiz qu ON qu.id = qq.quizId
       WHERE qq.quizId = ${id}`,
      { replacements: { id } }
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'No questions found for this quiz' });
    }

    const quiz = {
      id: results[0].quizId,
      title: results[0].quizTitle,
      description: results[0].quizDescription,
    };
    
    // Map over results to extract question details
    const questions = results.map(({ id, content, type, level, duration}) => ({
      id,
      content,
      type,
      level,
      duration
    }));
    
    res.status(200).json({
      quiz,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions for quiz:', error);
    res.status(500).json({ message: 'Failed to fetch questions for quiz' });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await QuizQuestion.findByPk(id, {
      include:
        [
          {
            model: Quiz,
          },
          {
            model: Question
          }
        ]
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const quizs = await Quiz.findAll({
    });
    res.status(200).json(quizs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateQuiz = async (req, res) => {

  const { id } = req.params;
  const { day, startTime, endTime, type, } = req.body;

  try {
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    quiz.endTime = endTime || quiz.endTime;
    quiz.startTime = startTime || quiz.startTime;
    quiz.type = type || quiz.type;
    quiz.day = day || quiz.day;

    await Quiz.save();

    return res.status(200).json({ message: 'Enseignant mis à jour avec succès', Quiz });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }

};

export const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    await Quiz.destroy();

    return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};
