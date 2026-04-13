const { body, header } = require("express-validator")

const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"]
exports.registerChecks = [
    body("name")
        .exists()
        .withMessage("required name field")
        .isAlpha()
        .withMessage("please enter alphabets only")
        .isLength({ min: 3, max: 60 })
        .withMessage("please enter minimum 3 characters and maximum 60 charcaters are allowed"),
    body("email")
        .exists()
        .withMessage("required email filed")
        .isEmail({ host_whitelist: allowedDomains })
        .withMessage("please enter correct email only like gmail.com, yahoo.com, outlook.com"),
    body("password")
        .exists()
        .withMessage("password field is required")
        .isStrongPassword({ minLength: 7, minLowercase: 1, minSymbols: 1, minUppercase: 1 })
        .withMessage("minLength: 7, minLowercase: 1, minSymbols: 1, minUppercase: 1 ")
]

exports.loginChecks = [
    // body("name")
    //     .exists()
    //     .withMessage("required name field")
    //     .isAlpha()
    //     .withMessage("please enter alphabets only")
    //     .isLength({ min: 3, max: 60 })
    //     .withMessage("please enter minimum 3 characters and maximum 60 charcaters are allowed"),
    body("email")
        .exists()
        .withMessage("required email filed")
        .isEmail()
        .withMessage("please enter email"),
    body("password")
        .exists()
        .withMessage("password field is required")
        .isLength({ max: 60, min: 7 })
        .withMessage("enter password below 60 characters and above 7 characters ")
]

exports.validateAuthHeaders = [
    header("authorization")
        .exists()
        .withMessage("authorization header is required")
        .bail()
        .matches(/^Bearer\s.+$/)
        .withMessage("invalid authorization format")
]


exports.updateValidation = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        // .isEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters"),
    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("invalid Email"),
    body("password")
        .optional()
        .trim()
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters")
]