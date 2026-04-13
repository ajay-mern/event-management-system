const { param } = require("express-validator")

exports.mongId = [
    param("id")
        .isMongoId()
        .withMessage("Provide the correct id")

]