const express = require("express")
// const req = require("express/lib/request")
const router = express.Router()
const { login, register, profile, updateprofile, signupAsOrganizers } = require("../controllers/auth.js")


const { registerChecks, loginChecks, validateAuthHeaders, updateValidation } = require("../validations/auth.js")
const { validation } = require("../middlewares/validations.js")
const { authentication } = require("../middlewares/auth.js")
const { upload } = require("../configs/multer.js")


router.post("/register", registerChecks, validation, register)

router.post("/signupAsOrganizer", registerChecks, validation, signupAsOrganizers)

router.post("/login", loginChecks, validation, login)

router.get("/profile", validateAuthHeaders, validation, authentication, profile)

// router.put("/updateprofile/:id", upload.single("profile_pic"), updateValidation, validateAuthHeaders, authentication, updateprofile)
router.put("/updateprofile/:id", validateAuthHeaders, upload.single("profile_pic"), updateValidation, validation, authentication, updateprofile);

module.exports = router