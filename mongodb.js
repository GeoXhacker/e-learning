const mongoose = require('mongoose');
const isProduction = process.env.NODE_ENV === 'production';
const uri = "mongodb+srv://geophrey:thugs123@legit-cluster.v2vwa.mongodb.net/legit?retryWrites=true&w=majority";

mongoose.connect(isProduction ? uri : 'mongodb://localhost/elearning', { useNewUrlParser: true, useUnifiedTopology: true })
.then(function(){console.log('successfully connected to the Mongodb server')});




