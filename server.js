const express = require('express');
const app = require('./app');



const PORT = 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));