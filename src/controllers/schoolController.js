import { where } from "sequelize";
import School from "../models/School.js";


export const AddSchool = async (req, res) => {
  const { type, adress, phone, name } = req.body;
  const userId = req.userId.id;

  try {
    const newSchool = await School.create({ type, userId, adress, phone, name });
    return res.status(201).json(newSchool);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getSchool = async (req, res) => {
  try {
    const schools = await School.findAll({
    });
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateSchool = async (req, res) => {

  const { id } = req.params; 
  const { phone, adress, type, name } = req.body; 

  try {
    const school = await School.findByPk(id);
    
    if (!school) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    school.phone = phone || school.phone; 
    school.adress = adress || school.adress;
    school.type = type || school.type;
    school.name = name || school.name; 

    await school.save();

    return res.status(200).json({ message: 'Enseignant mis à jour avec succès', school });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }

};

export const deleteSchool = async (req, res) => {
  const { id } = req.params; 

  try {
    const school = await School.findByPk(id);
    
    if (!school) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }

    await school.destroy();

    return res.status(200).json({ message: 'Enseignant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enseignant:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};
