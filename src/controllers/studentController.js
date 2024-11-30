import { where } from "sequelize";
import Student from "../models/Student.js";


export const AddStudent = async (req, res) => {
  const {  levelId } = req.body;
  const userId = req.userId.id;

  try {
    const newStudent = await Student.create({ userId, levelId });
    return res.status(201).json(newStudent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } 
};

export const getStudent = async (req, res) => {
  try {
    const students = await Student.findAll({
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateStudent = async (req, res) => {

  const { id } = req.params; // Obtenir l'ID de l'élève à partir des paramètres de la requête
  const { levelId, birthday } = req.body; 
  const currentUserId = req.userId.id// Obtenir les nouvelles valeurs à partir du corps de la requête

  try {
    // Trouver l'élève par ID
    const student = await Student.findOne({where: {userId: currentUserId}});
   
    if (!student) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    // Mettre à jour les informations de l'élève
    student.levelId = levelId || student.levelId; // Ne pas modifier si la valeur n'est pas fournie
    // student.birthday = birthday || student.birthday;

    // Enregistrer les changements
    if (student && student.userId === currentUserId) {
      await student.save();
    }else{
      res.status(500).json({message: 'vous  ne pouvvez pas modifier ce modifier'})
    } 
  
    return res.status(200).json({ message: 'Élève mis à jour avec succès', student });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'élève:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }

};

export const deleteStudent = async (req, res) => {
  const { id } = req.params; // Obtenir l'ID de l'élève à partir des paramètres de la requête

  try {
    // Trouver l'élève par ID
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }

    // Supprimer l'élève
    await student.destroy();

    return res.status(200).json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élève:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};
