import { check } from "express-validator";



export const RegisterRequest = {
    email: check('email').notEmpty().trim().normalizeEmail().isEmail(),
    password: check('password').notEmpty().isAlphanumeric().isLength({min:4, max:40}),
    username:check('username').notEmpty().isString(),
    country: check('country').notEmpty().isString(),
}

export const LoginRequest = {
    
    email: check('email').notEmpty().trim().normalizeEmail().isEmail(),
    password: check('password').notEmpty().isAlphanumeric().isLength({min:4, max:40})


    
}

export const updateRequest = {
    //firstname:check('firstname').notEmpty().isString(),
    //lastname:check('lastname').notEmpty().isString(),
    //email: check('email').notEmpty().trim().normalizeEmail().isEmail(),
    //birthday: check('birthday').notEmpty().withMessage('birthday is required').isDate({ format: 'DD/MM/YYYY', strict: true }).withMessage('date is not valid'),
    //password: check('password').notEmpty().isAlphanumeric().isLength({min:4, max:8}),
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

}