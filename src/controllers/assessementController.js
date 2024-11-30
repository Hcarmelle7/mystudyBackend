import { where } from "sequelize";
import Assessement from "../models/assessement.js";


export const AddAssessement = async (req, res) => {
    const { content, title, score, courseId, studentId } = req.body;
    //   const userId = req.userId.id;

    try {
        const newAssessement = await Assessement.create({content, title, score, courseId, studentId});
        return res.status(201).json(newAssessement);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAssessement = async (req, res) => {
    try {
        const assessements = await Assessement.findAll({
        });
        res.status(200).json(assessements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAssessement = async (req, res) => {

    const { id } = req.params;
    const { content, title, score, courseId, studentId } = req.body;

    try {
        const assessement = await Assessement.findByPk(id);

        if (!assessement) {
            return res.status(404).json({ message: 'Assessement non trouvé' });
        }

        assessement.content = content || assessement.content;
        assessement.title = title || assessement.title;
        assessement.score = score || assessement.score;
        assessement.courseId = courseId || assessement.courseId;
        assessement.studentId = studentId || assessement.studentId;

        await Assessement.save();

        return res.status(200).json({ message: 'Assessement mis à jour avec succès', Assessement });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'assessement:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteAssessement = async (req, res) => {
    const { id } = req.params;

    try {
        const assessement = await Assessement.findByPk(id);

        if (!assessement) {
            return res.status(404).json({ message: 'Assessement non trouvé' });
        }

        await assessement.destroy();

            return res.status(200).json({ message: 'Assessement supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'assessement:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
