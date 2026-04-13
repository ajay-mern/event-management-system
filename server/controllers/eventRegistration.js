const { userModel } = require("../models/usermodels.js")
const { eventsModel } = require("../models/events.js")
const { eventRegistrationsModel } = require("../models/eventRegistrationModel.js")

exports.register = async (req, res, next) => {
    try {
        // res.send("event register successfully")
        const checkEvent = await eventsModel.findById(req.params.eid)
        if (!checkEvent) {
            res.status(400).json({ success: false, message: "event not found", error: { code: "EVENT_NOT_FOUND", data: null } })
        }
        const checkDuplicate = await eventRegistrationsModel.findOne({ eventId: req.params.eid, userId: req.user._id })
        if (checkDuplicate) {
            return res.status(409).json({
                success: false,
                message: "user already exists",
                error: { code: "ALREADY_REGISTERED_FOR_EVENT", data: checkDuplicate }
            })
        }
        const registerEvent = await eventRegistrationsModel.insertOne({
            eventId: req.params.eid,
            userId: req.user._id,
            registrationDate: Date.now(),
            status: "conformed"
        })
        await registerEvent.save()
        res.status(201).json({ success: true, message: "registered for event successfully", data: { code: "EVENT_REGISTERED_SUCCESSFULLY", data: registerEvent } })
    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}

exports.cancelEvent = async (req, res, next) => {
    try {
        // res.send("event cancelled successfully")
        const checkEvent = await eventRegistrationsModel.findOne({ eventId: req.params.eid, userId: req.user._id }).populate("eventId")
        // console.log(checkEvent)
        if (!checkEvent) {
            return res.json({ success: false, message: "event not found", error: { code: "EVENT_NOT_FOUND", data: null } })
        }
        if (checkEvent.status === "canceled") {
            return res.json({ success: false, message: "event already canceled", error: { code: "EVENT_ALREADY_CANCLED", data: checkEvent } })
        }
        checkEvent.status = "canceled"
        await checkEvent.save()
        // res.json(checkEvent)
        res.json({ success: true, message: "event cancelled successfully", data: { code: "EVENT_CANCELLED_SUCCESSFULLY", data: checkEvent } })
    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(err)
        err.statusCode = 400
        next(err)
    }
}

exports.myevents = async (req, res, next) => {
    try {
        // res.send("getting all your events")
        const getRegisterdEvents = await eventRegistrationsModel.find({ userId: req.user._id }).populate(["eventId", "userId"])
        res.json({ success: true, message: "fetched all registered events", data: { code: "FETCHED_ALL_THE_REGISTERED_EVENTS", data: getRegisterdEvents } })
    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}

exports.getEventParticipants = async (req, res, next) => {
    try {
        // res.send("getting the participants")
        const getAllParticipants = await eventRegistrationsModel.find({ eventId: req.params.eid }).populate("userId", ["name", "email", "profileImage", "updatedAt", "createdAt"])
        res.json({ success: true, message: "fetched all the participants", data: { code: "FETCHED_ALL_PARTICIPANTS", data: getAllParticipants } })

    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}


exports.uploadEventPoster = (req, re, next) => {
    try {
        res.send("file uploading")
    } catch (error) {
        res.send("something went wrong")
        next(error)
    }
}