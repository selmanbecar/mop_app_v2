const express = require('express');
const cors = require('cors');
const db = require("./config/db")


const app = express();

// This line allows the use of .env
require('dotenv').config();


app.use(express.json());
// Allow cors for all origins 
app.use(cors());



// Test path that shows if the server booted properly ("http://{host}:{port}/")
app.get('/', (req, res) => res.send('Mop App v2'));

module.exports = app;
 