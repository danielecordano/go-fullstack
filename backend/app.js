const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');

mongoose.set('strictQuery', true);
const mongoServer = `mongodb+srv://danielecordano:${process.env.MONGODB_PWD}@cluster0.5snqyny.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoServer)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);

module.exports = app;