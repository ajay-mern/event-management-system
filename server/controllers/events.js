const { userModel } = require("../models/usermodels.js")
const { eventsModel } = require("../models/events.js")
const { cloudinary } = require("../configs/cloudinary.js")

const fs = require("fs")
const { check } = require("express-validator")
exports.getAllEvents = async (req, res, next) => {
    try {
        // res.send("getting all the events")
        const events = await eventsModel.find()
        res.json({ success: true, message: "fetched all products", data: { code: "FETCHED_ALL_PRODDUCTS", data: events } })
    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)

    }
}


exports.createEvent = async (req, res) => {
    try {
        // res.send("event is created succssfully")
        const { title, description, price, location, category, capacity, date } = req.body
        // const poster = req.file
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({
                success: false,
                message: "profile pic must be an image",
                error: {
                    code: "PROFILE_PIC_IMAGE_ONLY",
                    data: error
                }
            })
        }
        // const poster = await cloudinary.uploader.upload(
        //     req.file.path, {
        //         folder: "EventManagement",
        //         resource_type: "image"
        //     }
        // )

        const poster = await cloudinary.uploader.upload(req.file.path, { folder: "EventManagement", resource_type: "image" })
        // console.log(poster.url)
        fs.unlinkSync(req.file.path)
        const createEvent = await eventsModel.create({
            title,
            description,
            price,
            location,
            category,
            capacity,
            date,
            posterImage: poster.url,
            organizerID: req.user._id
        })
        const addEventUser = await userModel.findByIdAndUpdate(req.user._id, { $push: { events: createEvent._id } }, { new: true })
        // console.log(addEventUser)
        res.json({
            success: true,
            message: "event created successfully",
            data: {
                code: "CREATED EVENT SUCCESSFULLY",
                data: createEvent
            }
        })
    } catch (error) {
        // res.send("something went wrong")
        console.log(error)
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}

exports.getEvent = async (req, res, next) => {
    try {
        // res.send("getting single event")
        const event = await eventsModel.findById(req.params.eid)
        if (!event) {
            return res.json({ success: false, message: "event not found", error: { code: "EVENT_NOT_FOUND", data: null } })
        }
        res.json({ success: true, message: "fetched event data", data: { code: "FETCHED_EVENT", data: event } })
    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}


exports.updateEvent = async (req, res, next) => {
    try {
        // res.send("event is updated successfully")
        // const { eid } = req.params
        // const{_id} = req.user
        console.log(req.body)
        const checkEvent = await eventsModel.findOne({ _id: req.params.eid, organizerID: req.user._id })
        // console.log(checkEvent)
        if (checkEvent) {
            checkEvent.title = req.body.title || checkEvent.title
            checkEvent.description = req.body.description || checkEvent.description
            checkEvent.category = req.body.category || checkEvent.category
            checkEvent.capacity = req.body.capacity || checkEvent.capacity
            checkEvent.price = req.body.price || checkEvent.price
            checkEvent.location = req.body.location || checkEvent.location
            checkEvent.date = req.body.date || checkEvent.date
            if (req.file.mimetype.startsWith('image/')) {
                const data = await cloudinary.uploader.upload(req.file.path, {
                    folder: "EventManagement",
                    resource_type: "image"
                })
                // checkEvent.posterImage = data.secure_url || checkEvent.posterImage
                // fs.unlinkSync(req.file.path)
                console.log(data)
                checkEvent.posterImage = data.secure_url || checkEvent.posterImage
                fs.unlinkSync(req.file.path, () => { })

            } else {
                res.status(400).json({
                    success: false,
                    message: "poster image must be image",
                    error: {
                        code: "POSTER_IMAGE_ONLY",
                        data: error
                    }
                })
            }

            checkEvent.save()
            res.json({
                success: true,
                message: "event updated successfully",
                data: {
                    code: "EVENT_UPDATED_SUCCESSFULLY",
                    data: checkEvent
                }
            })
            // console.log(checkEvent.title)
        } else {
            return res.status(404).json({
                success: true,
                message: "evevnt not found",
                data: {
                    code: "EVENT_NOT_FOUND",
                    data: null
                }
            })
        }


    } catch (error) {

        // res.send("something went wrong")
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}

exports.deleteEvent = async (req, res, next) => {
    try {
        // res.send("event deleted successfully")
        const checkEvent = await eventsModel.findOne({ _id: req.params.eid, organizerID: req.user._id })
        if (checkEvent) {
            // res.json(checkEvent)
            // const deletedEvent = await checkEvent.deleteOne()
            // res.json(deletedEvent)
            const deletedEvent = await eventsModel.deleteOne({ _id: req.params.eid, organizerID: req.user._id })
            res.json({ success: true, message: "event deleted successfully", data: { code: "EVENT_DELETED_SUCCESSFULLY", data: deletedEvent } })
        } else {
            return res.status(404).json({
                success: true,
                message: "event not found",
                data: {
                    code: "EVENT_NOT_FOUND",
                    data: null
                }
            })
        }
    } catch (error) {
        // res.send("something went wrong")
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}