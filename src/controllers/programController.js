import { where } from "sequelize";
import Program from "../models/Program.js";


export const AddProgram = async (req, res) => {
    const { day, startTime, endTime, type, studentId} = req.body;
    //   const userId = req.userId.id;

    try {
        const newProgram = await Program.create({ day, startTime, endTime, type, studentId});
        return res.status(201).json(newProgram);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getProgram = async (req, res) => {
    try {
        const programs = await Program.findAll({
        });
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProgram = async (req, res) => {

    const { id } = req.params;
    const { day, startTime, endTime, type, } = req.body;

    try {
        const program = await Program.findByPk(id);

        if (!program) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        program.endTime = endTime || program.endTime;
        program.startTime = startTime || program.startTime;
        program.type = type || program.type;
        program.day = day || program.day;

        await program.save();

        return res.status(200).json({ message: 'Enseignant mis à jour avec succès', program });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }

};

export const deleteProgram = async (req, res) => {
    const { id } = req.params;

    try {
        const program = await Program.findByPk(id);

        if (!program) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        await program.destroy();

        return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant:', error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
