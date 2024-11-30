import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, saltRounds } from "../../config/utils.js";
import {
  LoginRequest,
  RegisterRequest,
  updateRequest,
} from "../request/userRequest.js";
import { validationResult } from "express-validator";
import { where } from "sequelize";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const Register = async (req, res) => {
  const { email, firstname, lastname, phone,  password, roles, birthday, } = req.body;
  const file = req.file;

  try {
    if (!email || !firstname || !lastname || !phone || !password || !roles || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const profilePicture = file
      ? `uploads/${file.filename}`
      : "uploads/Artconnect.jpg";

    const validRoles = ['student', 'teacher', 'school'];
    if (!validRoles.includes(roles)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const Role = `ROLE_${roles.toUpperCase()}`;

    const newUser = await User.create({

      email,
      firstname,
      lastname,
      phone,
      password: hashedPassword,
      roles: [Role],
      birthday
    });

    if (roles === 'student') {
      await Student.create({
        userId: newUser.id,
        level: '',
        age: 0,
      });
    }

    if (roles === 'teacher') {
      await Teacher.create({
        userId: newUser.id,
        level: '',
        subject: ''
      });
    }

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "roles"],
      },
      //limit: 2
      // include:[{
      //     model: User,
      //     attributes:['Username']
      // }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await Promise.all(Object.values(LoginRequest).map((rule) => rule.run(req)));
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: "Compte inexistant" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, password, firstname, lastname, phone, address } = req.body;
  const file = req.file;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const profilePicture = file
      ? `uploads/${file.filename}`
      : "uploads/Artconnect.jpg";


    if (email) user.email = email;
    if (password) user.password = password;
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({ message: "updated success", user });
  } catch (error) {
    res.status(500).json({ message: "erruer lors de l'update" });
  }
};

export const updateUser = async (req, res) => {
  const { firstname, lastname, ville, pays, pseudo, bio, profilePicture } =
    req.body;
  const file = req.file;
  const currentUserId = req.user.id;
  const myId = req.params.id;
  try {
    await Promise.all(
      Object.values(updateRequest).map((rule) => rule.run(req))
    );
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const Picture = file
      ? `uploads/${file.filename}`
      : "uploads/Artconnect.jpg";
    const newUser = await User.findByPk(myId);
    if (newUser && newUser.id === currentUserId) {
      await newUser.update({
        Where: { id: myId },
        firstname,
        lastname,
        bio,
        pseudo,
        ville,
        pays,
        profilePicture,
        profilePicture: Picture,
      });
    } else {
      res.status(400).json({ error: "not user update" });
      return;
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password", "email", "roles", "fileType"],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "erreur de recup" });
  }
};

export const getUsersId = async (req, res) => {
  try {
    const newUser = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password", "email", "roles", "fileType"],
      },
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const Logout = async (req, res) => {
  try {
    // Supprimer le jeton d'authentification du cookie
    res.clearCookie("token");

    // Invalider la session de l'utilisateur
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(200).json({ message: "Déconnecté avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};