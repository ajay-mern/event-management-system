const mongoose = require("mongoose")
const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    eventId: { type: mongoose.Types.ObjectId, required: true, ref: "events" },
    status: { type: String, required: true, default: "pending" },
    registrationDate: { type: Date, required: true }
}, { timestamps: true })

const eventRegistrationsModel = mongoose.model("eventregisration", registrationSchema)
module.exports = { eventRegistrationsModel }