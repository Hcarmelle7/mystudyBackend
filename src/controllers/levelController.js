import { where } from "sequelize";
import Level from "../models/Level.js";


export const AddLevel = async (req, res) => {
    const { title } = req.body;

    try {
        const newLevel = await Level.create({ title });
        return res.status(201).json(newLevel);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getLevel = async (req, res) => {
    try {
        const levels = await Level.findAll({
        });
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateLevel = async (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    try {
        const level = await Level.findByPk(id);

        if (!level) {
            return res.status(404).json({ message: 'Niveau non trouvé' });
        }

        level.title = title || level.title;

        await Level.save();

        return res.status(200).json({ message: 'Niveau mis à jour avec succès', level });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'niveau:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteLevel = async (req, res) => {
    const { id } = req.params;

    try {
        const level = await Level.findByPk(id);

        if (!level) {
            return res.status(404).json({ message: 'Niveau non trouvé' });
        }

        await Level.destroy();

        return res.status(200).json({ message: 'Niveau supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'niveau:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
