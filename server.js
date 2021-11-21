import e from 'express';
import express from 'express';
import mongoose from 'mongoose';

import data from './data.js';
import Videos from './dbModel.js';



// Server config
const app = express();
const port = 9000;




// Middleware 
app.use(express.json());

// Set Cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})



// DB config
const connection_url = "mongodb+srv://admin:RdzwUHj3XqhMMggu@renn.1vrs6.mongodb.net/tiktokdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, { useNewUrlParser: true,  useUnifiedTopology: true });




// ** API endpoints **

// Test message on homepage
app.get("/", (req, res) => res.status(200).send("hello world"));

// Test call using preset data
app.get("/v1/posts", (req, res) => res.status(200).send(data))


// Retrieve all videos from mongo database
app.get("/v2/posts", (req, res) => {

    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})


// Save data in mongo database
app.post("/v2/posts", (req, res) => {
    const dbVideos = req.body;

    // Add data into videos collection
    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})



// Start server
app.listen(port, () => console.log(`listening on localhost:${port}`));