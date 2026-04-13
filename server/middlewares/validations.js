const { validationResult } = require("express-validator")
exports.validation = (req, res, next) => {
    const validation = validationResult(req)
    if (!validation.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "validation error",
            error: {
                code: "VALIDATION_ERROR",
                details: validation.array()
            }
        })
    }
    next()
}