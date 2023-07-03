const express = require("express")
const path = require("path")
const mongoose = require('mongoose')
const cors = require('cors');

const TextSchema = require("./models/text")
const TimeSchema = require("./models/noOfTime")
const { fetchingNgram , comparing} = require("./fetchingNgram")

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

mongoose.connect('mongodb://127.0.0.1:27017/internship', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connected successfully")
    })
    .catch((err) => {
        console.log("something error")
        console.log(err)
    })
var timing = 0
const loggingTime = async(req,res,next) =>{
    console.log(req.path)
    if (req.path == '/textInput' || req.path == '/getNgrams' ){
        const times = new TimeSchema({time:timing+1})
        timing = timing + 1;
        await times.save()
        next()
    }
    else{
        res.send("Your are on wrong path")
    }
}

app.post("/textInput", loggingTime , async(req,res)=>{
    console.log(req.body)
    const { input } = req.body
    const text1 = new TextSchema({text:input})
    const aps = await text1.save()
    res.send(aps)
})


app.get("/getNgrams", loggingTime , async(req,res)=>{
    const allText = await TextSchema.find().sort({ $natural : -1 }).limit(2)
    const latestText = []
    allText.forEach(item => latestText.push(item.text))
    const text1 = latestText[0]
    const text2 = latestText[1]
    const ngram = await fetchingNgram(text1 , text2 , 2)
    const comparison = await comparing(text1 , text2 , 2)
    const response = { ngram , comparison}
    res.send(response)
})

app.all("*", loggingTime , (req,res)=>{
    res.send("Your are on Wrong way")
})

app.listen(8000, ()=>{
    console.log("listening on port 8000")
})
