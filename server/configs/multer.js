const multer = require("multer")

const stroage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    }
})

exports.upload = multer({ storage: stroage, limits: 1024 * 1024 * 5 })