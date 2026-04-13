const express = require("express")
const router = express.Router()
const { users, getuser, deleteuser } = require("../controllers/admin.js")
const { validateAuthHeaders } = require("../validations/auth.js")
const { validation } = require("../middlewares/validations.js")
const { authentication, authorization } = require("../middlewares/auth.js")
const { mongId } = require("../validations/admin.js")
router.get("/", validateAuthHeaders, validation, authentication, authorization("admin"), users)
router.get("/:id", mongId, validateAuthHeaders, validation, authentication, authorization("admin"), getuser)
router.delete("/:id", validateAuthHeaders, validation, authentication, authorization("admin"), deleteuser)

module.exports = router