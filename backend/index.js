const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
require('dotenv').config();
const interviewRoute = require('./route/interview');
const userRoute = require('./route/user');

connectToMongo();
const app = express();
const port = process.env.PORT || 5001;
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/interviews', interviewRoute);
app.use("/api/users", userRoute); 


app.listen(port, () => {
  console.log(`Interview Scheduler Portal backend listening at http://localhost:${port}`)
})