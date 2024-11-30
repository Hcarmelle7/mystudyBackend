import { where } from "sequelize";
import Question from "../models/Questions.js";
import Answer from "../models/Answer.js";


export const AddQuestion = async (req, res) => {
    const { content, type, level, duration} = req.body;
      const teacherId = req.userId.id;

    try {
        const newQuestion = await Question.create({content, type, teacherId, level, duration});
        return res.status(201).json(newQuestion);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export async function createQuestionWithAnswers(req, res) {
    const { content, type, level, answers, duration } = req.body;
    const teacherId = req.userId.id;

  
    try {
      const question = await Question.create({ content, type, level, teacherId, duration });
  
      const answerPromises = answers.map(answer => {
        return Answer.create({
          content: answer.content,
          isTrue: answer.isTrue,
          questionId: question.id,
        });
      });
  
      await Promise.all(answerPromises);
  
      res.status(201).json({ message: 'Question and answers created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create question and answers', error });
    }
  }

export const getQuestion = async (req, res) => {
    try {
        const questions = await Question.findAll({
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateQuestion = async (req, res) => {

    const { id } = req.params;
    const { day, startTime, endTime, type, } = req.body;

    try {
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        question.endTime = endTime || question.endTime;
        question.startTime = startTime || question.startTime;
        question.type = type || question.type;
        question.day = day || question.day;

        await Question.save();

        return res.status(200).json({ message: 'Enseignant mis à jour avec succès', Question });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        await Question.destroy();

        return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
