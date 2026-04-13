const { userModel } = require("../models/usermodels.js")
const bcryptjs = require("bcryptjs")
const { cloudinary } = require("../configs/cloudinary.js")
const { generateHashPasword, createToken } = require("../helperfunction/auth.js")

const fs = require("fs")
exports.register = async(req, res, next) => {
    try {
        // res.status(200).send("register successfully")
        const { name, email, password } = req.body
        const checkEmail = await userModel.findOne({ email: email })

        if (checkEmail) {
            return res.status(409).json({
                success: false,
                message: "email already exists",
                error: {
                    code: "EMAIL_EXISTS",
                    data: `${email} already exists`
                }
            })
        }
        const hashPassword = await bcryptjs.hash(password, 13)
            // const hashPassword = await generateHashPasword(password)
        const createuser = await userModel.create({
            name,
            email,
            password: hashPassword
        })
        const token = await createToken({ id: createuser._id })
        return res.status(201).json({
            success: true,
            message: "regestred successfully",
            data: {
                code: "REGISTER SUCCESSFULLY",
                data: createuser,
                token: token
            }
        })

    } catch (error) {
        // res.status(400).send("something went wrong")
        // const err = { error, statusCode: 400 }
        // throw new Error(err)
        // const err = new Error(error)
        // next({ err, statusCode: 400 })
        const err = new Error(error)
        err.statusCode = 400
        next(err)

    }
}

exports.login = async(req, res, next) => {
    try {
        // res.status(200).send("login successfully")
        const { email, password } = req.body;
        const checkuser = await userModel.findOne({ email })
        if (!checkuser) {
            return res.status(404).json({
                success: false,
                message: "Email not found ,signup first",
                error: {
                    code: "EMAIL_NOT_FOUND",
                    data: null
                }
            })
        }
        const verifyPassword = await bcryptjs.compare(password, checkuser.password)
        if (verifyPassword) {
            const token = await createToken({ id: checkuser._id })
                // console.log(token)
            return res.status(200).json({
                success: true,
                message: "login successfull",
                data: {
                    code: "LOGIN_SUCCESSFULLY",
                    data: checkuser,
                    token: token
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "invalid email",
                data: {
                    code: "INVALID_EMAIL/PASSWORD",
                    data: null
                }
            })
        }
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)

    }
}

exports.profile = async(req, res, next) => {
    try {
        // res.status(200).send("your profile")
        const profile = await userModel.findOne(req.user._id)
        res.status(200).json({ success: true, message: "fetched user profile", data: { code: "FETCHED USER PROFILE", data: profile } })


    } catch (error) {
        // res.status(400).send("something went wrong")
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}

exports.updateprofile = async(req, res, next) => {
    try {

        const { name, email, password } = req.body
        if (await userModel.findOne({ email: email })) {
            return res.status(409).json({
                success: false,
                message: "email already exists",
                error: {
                    code: "EMAIL ALREADY EXISTS",
                    data: `${email} already exists`
                }
            })

        }
        let file;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "no file uploaded"
            })
        }
        if (req.file) {
            if (req.file.mimetype.startsWith('image/')) {
                // file = req.file.path
                console.log(req.file)
                const data = await cloudinary.uploader.upload(req.file.path, { folder: "EventManagement", resource_type: "image" })
                console.log("data...............", file)
                file = data
                    // return res.status(200).json({ success: "true", url: data })

            } else {
                return res.status(400).json({ success: false, message: "profile pic must be image only", error: { code: "PROFILE_PIC_SHOULD_BE_IMAGE", data: null } })
            }
            fs.unlinkSync(req.file.path)
        }

        if (name || email || password || file) {
            if (password) {
                const hashedPassword = await generateHashPasword(password)
                const update = await userModel.findByIdAndUpdate(req.user._id, { name: name, password: hashedPassword, email: email, profileImage: { filepath: file.asset_folder + "/" + file.original_filename || null, fileurl: file.url || null } }, { new: true })
                return res.json({ success: true, message: "profile updated successfully", data: { code: "PROFILE_UPDATED_SUCCESSFYLLLY", data: update } })
            } else {
                const update = await userModel.findByIdAndUpdate(req.user._id, { name: name, email: email, profileImage: { filepath: file.asset_folder + "/" + file.original_filename || null, fileurl: file.url || null } })
                return res.json({ success: true, message: "profile updated successfully", data: { code: "PROFILE_UPDATED_SUCCESSFYLLLY", data: update } })

            }
        } else {
            const profile = await userModel.findById(req.user._id)
            return res.json({ success: true, message: "profile updated successfully", data: { code: "PROFILE_UPDATED_SUCCESSFYLLLY", data: profile } })

        }

    } catch (error) {
        console.log(error)
        const err = new Error(error.message)
        err.statusCode = 400
        next(err)
    }
}

exports.signupAsOrganizers = async(req, res, next) => {
    try {
        // res.status(200).send("register successfully")
        const { name, email, password } = req.body
        const checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) {
            // const token = await createToken({ email: checkEmail.email })
            // console.log("hello")
            return res.status(409).json({
                success: false,
                message: "email already exists",
                error: {
                    code: "EMAIL_EXISTS",
                    data: `${email} already exists`,
                    // token: token
                }
            })
        }
        // const { name, email, password } = req.body;
        const hashPassword = await generateHashPasword(password)
        const createuser = await userModel.create({ email, name, password: hashPassword, role: "organizer" })
            // console.log(email)
        const token = await createToken({ id: createuser._id })

        return res.status(201).json({
            success: true,
            message: "Signup Successfully",
            data: {
                code: "SIGNUP_SUCCESSFULLY",
                data: createuser,
                token: token
            }
        })
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 409
            // console.log(err.statusCode)
        next(err)
    }
}