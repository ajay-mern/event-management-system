// exports.authentication = (req, res, next) => {
//     const { authorization } = req.headers
//     console.log(authorization)
//     next()
// }
const jwt = require("jsonwebtoken")
const { jwt_secreat_key } = require("../constants/env.js")
const { userModel } = require("../models/usermodels.js")

exports.authentication = async(req, res, next) => {
    // const { authorization } = req.headers
    // // console.log(authorization)
    // const token = authorization.split(' ')[1]
    // const decodeToken = await jwt.verify(token, jwt_secreat_key)
    // console.log(decodeToken)
    // next()
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        const decodeToken = await jwt.verify(token, jwt_secreat_key)
        const verify = await userModel.findOne({ _id: decodeToken.id })
        if (verify) {
            // req.user = verify 
            req.user = verify

            next()
        } else {
            return res.status(401).json({ success: false, message: "unathorised error", error: { error: "UNATHORIZED ERROR", data: null } })
        }

    } catch (error) {
        const err = new Error(error)
        err.statusCode = 401
        next(err)
    }
}

exports.authorization = (...roles) => {
    return (req, res, next) => {
        // console.log(roles)
        // console.log(req.user)
        if (roles.includes(req.user.role)) {
            next()
        } else {
            return res.status(403).json({ success: false, message: "access denied", error: { code: "ACCESS_DENIED", data: null } })
        }
    }
}