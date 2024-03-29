const mongoose = require('mongoose');

// for handling deprication warning
// mongoose.set('strictQuery', false);

const mongoURL = "mongodb://localhost:27017/interview_scheduler?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log("Connected to MongoDB Successfully");
    })
}

module.exports = connectToMongo;