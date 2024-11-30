import { check } from "express-validator";

export const profileRequest = {
    pseudo:check('pseudo').notEmpty().isString(),
    bio: check('bio').notEmpty().isString(),
   // birthday: check('birthday').notEmpty().withMessage('birthday is required').isDate({ format: 'DD/MM/YYYY', strict: true }).withMessage('date is not valid'),
    //profilePicture: check('profilePicture').notEmpty().isMimeType(['image/jpeg', 'image/png', 'image/jpg'])
}