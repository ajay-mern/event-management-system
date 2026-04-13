const mongoose = require("mongoose")
const { mongouri, dbName } = require("../constants/env.js")

exports.connectdb = async () => {
    try {
        await mongoose.connect(mongouri, { dbName: dbName })
        console.log(`database connected successfully with ${dbName}`)
    } catch (error) {
        console.log("database connection error")
    }
}