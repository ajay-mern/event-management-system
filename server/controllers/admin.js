const { userModel } = require("../models/usermodels.js")

exports.users = async (req, res, next) => {
    try {
        // res.send("get all users")
        const allusers = await userModel.find({ role: { $ne: "admin" } })
        res.json({ success: true, message: "fetched all users", data: { code: 'FETCHED_ALL_USERS', data: allusers } })
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 401
        next(err)
    }
}

exports.getuser = async (req, res, next) => {
    try {
        // res.send("get single user")
        // console.log(req.params.id)
        // const user = await userModel.findById(req.params.id)
        const user = await userModel.findOne({ _id: req.params.id, role: { $in: ["participant", "organizer"] } })
        if (!user) {
            return res.status(404).json({ success: false, message: "no userfound", error: { code: "NO_UDERFOUND", data: null } })
        }
        return res.json({ success: true, message: "fetched user by id", data: { code: "FETCHED_USER_BY_ID", data: user } })

    } catch (error) {
        const err = new Error(error)
        err.statusCode = 401
        next(err)
    }
}

exports.deleteuser = async (req, res, next) => {
    try {
        // res.send("user deleted successfully")
        const deleteuser = await userModel.deleteOne({ _id: req.params.id, role: { $in: ["participant", "organizer"] } })
        if (!deleteuser) {
            return res.status(404).json({ success: false, message: "no userfound", error: { code: "NO_UDERFOUND", data: null } })

        }
        res.json({ success: true, message: "user deleted successfully", data: { code: "USER_DELETED_SUCCESSFULLY", data: deleteuser } })
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 401
        next(err)
    }
}