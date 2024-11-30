import { where } from "sequelize";
import Score from "../models/Score.js";


export const AddScore = async (req, res) => {
    const { score } = req.body;
    //   const userId = req.userId.id;

    try {
        const newScore = await Score.create({score});
        return res.status(201).json(newScore);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getScore = async (req, res) => {
    try {
        const scores = await Score.findAll({
        });
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const deleteScore = async (req, res) => {
    const { id } = req.params;

    try {
        const score = await Score.findByPk(id);

        if (!score) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        await Score.destroy();

        return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
