const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, default: "participant", enum: ["participant", "organizer", "admin"] },
    profileImage: {
        filepath: { type: String, default: "default_image" },
        fileurl: { type: String, default: "https://cdn-icons-png.flaticon.com/512/8847/8847419.png" }
    },
    events: [
        { type: mongoose.Types.ObjectId, ref: "events" }
    ]

})

exports.userModel = mongoose.model("users", userSchema)