
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

// Connecting Mongoose
mongoose.connect("mongodb://localhost:27017/database " ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>
    console.log("establish connection")
)
.catch ((err)=>console.log(err))

// Setting up the schema
const User = new mongoose.Schema({
  username: String,
  password: String,
});

// Setting up the passport plugin
User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);
