import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/utils.js";

function getRequestToken(req, res) {
  console.log('je suis là dans zone')
  const authHeader = req.headers['authorization'] 
  if (!authHeader || typeof authHeader !== "string") return res.status(401).send('access denied')

  const [bearer, token, ...others] = authHeader.split(' ')
  console.log(bearer, token, others, 'as data')
  if (others.length !== 0 || bearer.toLowerCase() !== 'bearer') return res.status(401).send('access denied')

  return token
}

export async function auth(req, res, next) {
  const token = getRequestToken(req, res);
  console.log(token, 'as token jwt')

  if (!token) return res.status(401).json({error: "access denied"});

  try {
    const verify = jwt.verify(token, JWT_SECRET);
    req.userId = verify;
    
    next();
  } catch (e) {
    return res.status(400).json({error: "invalid token"});
  } 
}

export function isGranted(roles = []) {
  return (req, res, next) => {
    const userRoles = req.user.roles;

    const granted = userRoles.find((role) => roles.find((r) => r === role));

    if (!granted) return res.status(401).send("access denied");

    next();
  };
}

export function isGrantedAccess(role) {
  return (req, res, next) => {
    const token = getRequestToken(req, res);
    if (!token) return res.status(401).send('Access denied');

    try {
      req.userId = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(400).send('Invalid token');
    }

    if (!req.userId) {
      return res.status(401).send('Utilisateur non trouvé');
    }

    const userRoles = req.userId.roles;
    if (!userRoles) {
      return res.status(401).send('Rôles de l\'utilisateur non trouvés');
    }

    const granted = role.some(role => userRoles.includes(role));
    if (!granted) {
      return res.status(403).send('Accès refusé');
    }

    next();
  };
}
