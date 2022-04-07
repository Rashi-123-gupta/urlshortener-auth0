<<<<<<< HEAD
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

=======
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

>>>>>>> 3408ef444c56f8a04215cd89432f14d1a5eaa089
module.exports = mongoose.model('User', User);