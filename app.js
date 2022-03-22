const express = require('express');
const cors = require('cors');
const usersRouter = require("./routes/user-routes");
const questionsRouter = require("./routes/question-routes");
const authRouter = require("./routes/auth-routes");
const db = require("./config/db")


const app = express();

// This line allows the use of .env
require('dotenv').config();


app.use(express.json());
// Allow cors for all origins 
app.use(cors());


// Using routes
app.use("/api/users", usersRouter);
app.use("/api/questions", questionsRouter);
app.use("/api", authRouter);

// Test path that shows if the server booted properly ("http://{host}:{port}/")
app.get('/', (req, res) => res.send('Mop App v2'));

module.exports = app;
 