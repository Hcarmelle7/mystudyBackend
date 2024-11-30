import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const getNotifications = async (req, res) => {
  const userId = req.userId.id;

  try {
    const notifications = await Notification.findAll({
      where: { userId },
      include: User,
      order: [["createdAt", "DESC"]],
    });
    res.status(201).json(notifications);
  } catch (error) {
    console.error(error); // enregistrer l'erreur côté serveur
    res.status(500).json({ message: "Erreur fetching notifs" });
  }
};

export const markAsRead = async (req, res) => {
  const userId = req.userId.id;
  const notifId = req.params 

  try {
     await Notification.update(
      {isRead: true},
      {where: { userId, isRead: false },
    });
    res.status(200).json({message: 'Notification marked as read',});
  } catch (error) {
    console.error(error); // enregistrer l'erreur côté serveur
    res.status(300).json({ message: "Erreur fetching notifs" });
  }
};