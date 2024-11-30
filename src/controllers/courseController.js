import { where } from "sequelize";
import Quiz from "../models/Quiz.js";


export const AddCourse = async (req, res) => {
    const { title, subjectId } = req.body;
    //   const userId = req.userId.id;

    try {
        const newCourse = await Cour.create({title, subjectId});
        return res.status(201).json(newCourse);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getCourse = async (req, res) => {
    try {
        const courses = await Cour.findAll({
        });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCourse = async (req, res) => {

    const { id } = req.params;
    const { title, subjectId  } = req.body;

    try {
        const course = await Cour.findByPk(id);

        if (!course) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        course.title = title || course.title;
        course.subjectId = subjectId || course.subjectId;

        await Cour.save();

        return res.status(200).json({ message: 'Cours mis à jour avec succès', course });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Cour.findByPk(id);

        if (!course) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }

        await Cour.destroy();

        return res.status(200).json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
