const mongoose = require("mongoose")
const Schema = mongoose.Schema
const TimeSchema = new Schema ({
    time : Number
})
module.exports = mongoose.model("Time", TimeSchema)