const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { jwt_secreat_key } = require("../constants/env.js")
exports.generateHashPasword = async (password) => {
    const hashedPassword = await bcryptjs.hash(password, 13)
    return hashedPassword
}

exports.createToken = async (user) => {
    // console.log(user, "from helperfunction authjs")
    const token = await jwt.sign(user, jwt_secreat_key, { expiresIn: "24h" })
    // console.log(token)
    return token
}