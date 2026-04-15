const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    posterImage: { type: String, required: true },
    organizerID: { type: mongoose.Types.ObjectId, required: true },
    price: { type: Number, required: true }
}, { timestamps: true })

const eventsModel = mongoose.model("events", eventSchema)
module.exports = { eventsModel }