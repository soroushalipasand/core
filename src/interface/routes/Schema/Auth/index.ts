import { body, ValidationChain } from 'express-validator';
export const loginSchema: ValidationChain[] = [
    body('mobile')
        .notEmpty()
        .withMessage('وارد کردن شماره مویایل اجباریست.')
        .matches(/^[0][9][0-9]{9}$/)
        .withMessage('فرمت شماره مویایل باید صحیح وارد شود.'),
    body('password')
        .notEmpty()
        .withMessage('وارد کردن پسورد اجباریست.')
        .isLength({ min: 8 })
        .withMessage('پسورد باید حداقل ۸ کاراکتر باشد.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('پسورد باید شامل حروف بزرگ، حروف کوچک، عدد و یک کاراکتر ویژه باشد.')
];


export const createUserPassword: ValidationChain[] = [
    body('mobile')
        .notEmpty()
        .withMessage('وارد کردن شماره مویایل اجباریست.')
        .matches(/^[0][9][0-9]{9}$/)
        .withMessage('فرمت شماره مویایل باید صحیح وارد شود.'),
    body('password')
        .notEmpty()
        .withMessage('وارد کردن پسورد اجباریست.')
        .isLength({ min: 8 })
        .withMessage('پسورد باید حداقل ۸ کاراکتر باشد.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('پسورد باید شامل حروف بزرگ، حروف کوچک، عدد و یک کاراکتر ویژه باشد.')
];

