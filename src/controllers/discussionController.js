import { Op } from "sequelize";
import Message from "../models/message.js";
import { io } from "../server.js";


export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  try {
    const message = await Message.create({ senderId, receiverId, content });
    io.emit("receiveMessage", message);
    res.status(201).json(message);
  } catch (error) {
    console.error(error); // enregistrer l'erreur côté serveur
    res.status(500).json({ message: "Erreur lors de l'envoi du message" });
  }
};

export const getMessages = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: currentUserId, receiverId: userId },
          { senderId: userId, receiverId: currentUserId },
        ],
      },
      order: [["createdAt", "ASC"]],
      //limit: 20, // pagination limit
      // offset: 0 // pagination offset
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error); // enregistrer l'erreur côté serveur
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
};
