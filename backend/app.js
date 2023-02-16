const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Thing = require('./models/thing');

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

app.route('/api/stuff/:id')
.get((req, res) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    thing => {
      res.status(200).json(thing);
    }
  ).catch(
    error => {
      res.status(404).json({error});
    }
  );
})
.put((req, res) => {
  const {title, description, imageUrl, price, userId} = req.body;
  const thing = new Thing({
    _id: req.params.id,
    title,
    description,
    imageUrl,
    price,
    userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    error => {
      res.status(400).json({error});
    }
  );
})
.delete((req, res) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    error => {
      res.status(400).json({error});
    }
  );
});

app.route('/api/stuff')
.post((req, res) => {
  const {title, description, imageUrl, price, userId} = req.body;
  const thing = new Thing({
    title,
    description,
    imageUrl,
    price,
    userId
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    error => {
      res.status(400).json({error});
    }
  );
})
.get((req, res) => {
  Thing.find().then(
    things => {
      res.status(200).json(things);
    }
  ).catch(
    error => {
      res.status(400).json({error});
    }
  );
});

module.exports = app;