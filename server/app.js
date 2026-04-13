const express = require("express")
const app = express()
const { port } = require("./constants/env.js")
const { apiNotFound, globalmiddleware } = require("./middlewares/appLevelMiddlewares.js")
const { connectdb } = require("./configs/mongodb.js")
const fs = require("fs")

if (!fs.existsSync(__dirname + "/uploads")) {
    fs.mkdirSync(__dirname + "/uploads")
    console.log("created uploads folder successfully")
} else {
    console.log("already create uploads folder")
}
// console.log(__dirname)

connectdb()
app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.send("running healthy")
})

app.use("/api/auth", require('./routes/auth.js'))

app.use("/api/users", require("./routes/admin.js"))

app.use("/api/events", require("./routes/events.js"))

app.use('/api/eventregister', require("./routes/eventRegistration.js"))

app.use("/api/posterupdate", require("./routes/fileupload.js"))

app.use(apiNotFound)
app.use(globalmiddleware)



app.listen(port, () => {
    console.log("server running on port " + port)

})