import { where } from "sequelize";
import Answer from "../models/Answer.js";
import Question from "../models/Questions.js";


export const AddAnswer = async (req, res) => {
    const { content, isTrue,  } = req.body;
    const questionId = req.params.id

    try {
        const newAnswer = await Answer.create({ content, isTrue, questionId });
        return res.status(201).json(newAnswer);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAnswer = async (req, res) => {
    try {
        const answers = await Answer.findAll({
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAnswerbyQuestions = async (req, res) => {
    const  questionId  = req.params.id
    try {
        const answers = await Answer.findAll({
            where: { questionId },
        });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAnswer = async (req, res) => {

    const { id } = req.params;
    const { content, isTrue } = req.body;

    try {
        const answer = await Answer.findByPk(id);

        if (!answer) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        Answer.content = content || Answer.content;
        Answer.isTrue = isTrue || Answer.isTrue;

        await answer.save();

        return res.status(200).json({ message: 'Enseignant mis à jour avec succès', Answer });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteAnswer = async (req, res) => {
    const { id } = req.params;

    try {
        const answer = await Answer.findByPk(id);

        if (!answer) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        await answer.destroy();

        return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
