import { where } from "sequelize";
import Teacher from "../models/Teacher.js";


export const AddTeacher = async (req, res) => {
  const { level, subject } = req.body;
  const userId = req.userId.id;

  try {
    const newTeacher = await Teacher.create({ level, userId, subject });
    return res.status(201).json(newTeacher);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateTeacher = async (req, res) => {

  const { id } = req.params; // Obtenir l'ID de l'élève à partir des paramètres de la requête
  const { level, subject } = req.body; // Obtenir les nouvelles valeurs à partir du corps de la requête

  try {
    // Trouver l'élève par ID
    const teacher = await Teacher.findByPk(id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    // Mettre à jour les informations de l'élève
    teacher.level = level || teacher.level; // Ne pas modifier si la valeur n'est pas fournie
    teacher.subject = subject || teacher.subject;

    // Enregistrer les changements
    await teacher.save();

    return res.status(200).json({ message: 'Enseignant mis à jour avec succès', teacher });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }

};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params; // Obtenir l'ID de l'élève à partir des paramètres de la requête

  try {
    // Trouver l'élève par ID
    const teacher = await Teacher.findByPk(id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    // Supprimer l'élève
    await teacher.destroy();

    return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};
