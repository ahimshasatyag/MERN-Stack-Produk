const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/project", {
    serverSelectionTimeoutMS: 5000
})

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error", () => {
    console.log(`MongoDB connection error: ${err}`)
})

module.exports= mongoose;