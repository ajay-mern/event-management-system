const { body, param } = require("express-validator")
exports.createEventChecks = [
    body("title")
    .exists()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be string")
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("title must be 3 characters"),

    body("description")
    .exists()
    .withMessage("description is requried")
    .bail()
    .isString()
    .withMessage("description should be string")
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 characters"),

    body("category")
    .exists()
    .bail()
    .isString()
    .withMessage("category should be string"),

    body("date")
    .exists()
    .withMessage("date is requried")
    .bail()
    .isISO8601()
    .withMessage("date must be a valid ISO8601 date")
    .toDate()
    .custom(value => {
        if (value < new Date()) throw new Error("date must be in the future");
        return true
    }),
    body("capacity")
    .exists()
    .withMessage("capacity is requried")
    .bail()
    .isInt({ min: 1 })
    .withMessage("capacity should be integer >= 1")
    .toInt(),
    body("price")
    .exists()
    .withMessage("price is requried")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("price must be a number >= 0")
    .toFloat(),

    body("poster")
    .custom((_, { req }) => {
        if (!req.file) throw new Error("posterImage file isrequried")
        return true
    })
    .withMessage("posterimage is requried")


]

exports.idcheck = [
    param("eid")
    .isMongoId()
    .withMessage("Provide the correct id")

]

exports.updateEventValidation = [
    body("title")
    .optional()
    .isString()
    .withMessage("title must be string")
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("title must be 3 characters"),

    body("description")
    .optional()
    .isString()
    .withMessage("description should be string")
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 characters"),

    body("category")
    .optional()
    .isString()
    .withMessage("category should be string"),

    body("date")
    .optional()
    .isISO8601()
    .withMessage("date must be a valid ISO8601 date")
    .toDate()
    .custom(value => {
        if (value < new Date()) throw new Error("date must be in the future");
        return true
    }),
    body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("capacity should be integer >= 1")
    .toInt(),
    body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price must be a number >= 0")
    .toFloat(),

    body("poster")
    .optional()
    .custom((_, { req }) => {
        if (!req.file) throw new Error("posterImage file isrequried")
        return true
    })
    .withMessage("posterimage is requried")


]