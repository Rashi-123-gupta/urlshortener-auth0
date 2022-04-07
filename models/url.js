const mongoose = require('mongoose')
const shortid = require('shortid')


// Connecting Mongoose
mongoose.connect("mongodb://localhost:27017/database " ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>
    console.log("establish connection")
)
.catch ((err)=>console.log(err))

const shortUrlSchema = new mongoose.Schema({
    full: {
        type:String,
        required:true
    } ,
    short: {
        type:String,
        required:true,
        default:shortid.generate
    } ,
    clicks: {
        type:Number,
        required:true,
        default: 0
    } 
    
})

module.exports = mongoose.model('shortUrl',shortUrlSchema)