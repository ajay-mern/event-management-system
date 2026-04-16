const express = require("express")
const router = express.Router()
const { register, cancelEvent, myevents, getEventParticipants } = require("../controllers/eventRegistration.js")
    // const eventregisration = require("../models/eventRegistrationModel.js")

const { authentication, authorization } = require("../middlewares/auth.js")

const { idcheck } = require("../validations/event.js")
const { validation } = require("../middlewares/validations.js")
const { validateAuthHeaders } = require("../validations/auth.js")
const { getOrganizerParticipants } = require("../controllers/eventRegistration.js")
router.post("/register/:eid", idcheck, validateAuthHeaders, validation, authentication, authorization("participant"), register)

router.get("/myEvents", validateAuthHeaders, validation, authentication, authorization("participant"), myevents)


router.delete("/cancel/:eid", idcheck, validateAuthHeaders, validation, authentication, authorization("participant"), cancelEvent)


router.get("/:eid/participants", idcheck, validateAuthHeaders, validation, authentication, authorization("organizer"), getEventParticipants)


router.get("/participants/organizer", validateAuthHeaders, validation, authentication, authorization("organizer"), getOrganizerParticipants)
module.exports = router