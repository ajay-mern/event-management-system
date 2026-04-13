const express = require("express")
const router = express.Router()

const { uploadEventPoster } = require("../controllers/eventRegistration.js")
router.put("/event/:eid", uploadEventPoster)

module.exports = router