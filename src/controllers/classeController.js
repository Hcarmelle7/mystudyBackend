import { where } from "sequelize";
import Classe from "../models/Classe.js";


export const AddClasse = async (req, res) => {
  const { level, Nstudents, title} = req.body;
 

  try {
    const newClasse = await Classe.create({ level, Nstudents, title});
    return res.status(201).json(newClasse);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Classe.findAll({
    });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateClasse = async (req, res) => {

  const { id } = req.params; 
  const { level, title, Nstudents} = req.body; 

  try {
    const classe = await Classe.findByPk(id);
    
    if (!classe) {
      return res.status(404).json({ message: 'classe non trouvé' });
    }

    classe.level = level || classe.level; 
    classe.title = title || classe.title;
    classe.Nstudents = Nstudents || classe.Nstudents;

    await classe.save();

    return res.status(200).json({ message: 'classe mise à jour avec succès', classe });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la classe:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }

};

export const deleteClasse = async (req, res) => {
  const { id } = req.params; 

  try {
    const classe = await classe.findByPk(id);
    
    if (!classe) {
      return res.status(404).json({ message: 'classe non trouvé' });
    }

    await classe.destroy();

    return res.status(200).json({ message: 'classe supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la classe:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};
