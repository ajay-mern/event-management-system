const express = require("express")
const router = express.Router()

const { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } = require("../controllers/events.js")

const { validation } = require("../middlewares/validations.js")
const { validateAuthHeaders } = require("../validations/auth.js")
const { authentication, authorization } = require("../middlewares/auth.js")
const { createEventChecks } = require("../validations/event.js")
const { upload } = require("../configs/multer.js")
const { idcheck, updateEventValidation } = require("../validations/event.js")
router.post("/createEvent", upload.single("poster"), createEventChecks, validateAuthHeaders, validation, authentication, authorization("organizer"), createEvent)

router.get("/", getAllEvents)

router.get("/:eid", idcheck, validation, getEvent)

router.put("/:eid", upload.single("poster"), idcheck, updateEventValidation, validateAuthHeaders, validation, authentication, updateEvent)

router.delete("/:eid", idcheck, validateAuthHeaders, validation, authentication, authorization("organizer"), deleteEvent)


module.exports = router