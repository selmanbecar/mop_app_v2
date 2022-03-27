const express = require('express');
const app = require('./app');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const PORT = 5000;
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));