require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());

// Import routes
const experiencesRoute = require('./routes/experiences');

app.use('/experiences', experiencesRoute);

app.get('/', (req, res) => {
  res.send("Hello from Jory's resume API")
})

// Connect to DB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(3000)