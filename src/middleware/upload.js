import multer from "multer";
import path, { resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
// Configure le stockage
const uploadPath = "public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, resolve(uploadPath)); // Spécifiez le répertoire de destination
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Renommez le fichier
  },
});

// Initialisez multer avec les options de stockage
const upload = multer({ storage: storage });

// const resizeImage = (req, res, next) => {
//     if(!req.file) {
//         return next()
//     }

//     const filePath = path.join(uploadPath, req.file.filename);

//     sharp(filePath).resize(600, 600, {fit: 'inside'}).toFormat('jpeg').jpeg({quality: 80}).toBuffer().then(data => {
//         require('fs').writeFileSync(filePath, data);
//         next()
//     }).catch(err => {
//         console.error('Erreur lors du redimensionneme')
//     })
// }

export default upload;
