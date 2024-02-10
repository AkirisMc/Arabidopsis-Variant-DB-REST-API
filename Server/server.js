/*
server.js contains the implementation and deployment of the server, it's the entry point of the project. 
Akiris Moctezuma - s394901
*/


const express = require('express'); // loading the Express dependency

const app = express(); // creating an Express server object
const port = 3000; // setting the port 

// making the application listen to the port 
app.listen(port, function () {
    console.log(`Application deployed on port ${port}`);
});

const router = require('./router'); // importing the router
app.use('/api', router); // attaching the router to the API path 