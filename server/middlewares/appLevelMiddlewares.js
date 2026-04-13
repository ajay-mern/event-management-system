exports.apiNotFound = (req, res, next) => {
    res.status(404).json({ endpoint: req.method + " " + req.url, message: "api not found" })
}

exports.globalmiddleware = (error, req, res, next) => {
    // console.log(error)
    // res.status(400).json({ message: "something went wrong", error_code: error.message })
    res.status(error.statusCode).json({
        success: false,
        message: "something went wrong",
        error: {
            code: "SOME THING WENT WRONG",
            data: error.message,
            // data: error.tostring()
        }
    })

}