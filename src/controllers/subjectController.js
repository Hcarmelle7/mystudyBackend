import { where } from "sequelize";
import Subject from "../models/Subject.js";


export const AddSubject = async (req, res) => {
    const { description, title } = req.body;
    //   const userId = req.userId.id;

    try {
        const newSubject = await Subject.create({description, title });
        return res.status(201).json(newSubject);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getSubject = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
        });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateSubject = async (req, res) => {

    const { id } = req.params;
    const {  description, title  } = req.body;

    try {
        const subject = await Subject.findByPk(id);

        if (!subject) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        subject.description = description || subject.description;
        subject.title = title || subject.title;
        

        await Subject.save();

        return res.status(200).json({ message: 'Enseignant mis à jour avec succès', Subject });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteSubject = async (req, res) => {
    const { id } = req.params;

    try {
        const Subject = await Subject.findByPk(id);

        if (!Subject) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        await Subject.destroy();

        return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
