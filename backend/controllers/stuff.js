const Thing = require('../models/thing');

exports.createThing = (req, res) => {
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
    (error) => {
      res.status(400).json({error});
    }
  );
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifyThing = (req, res, next) => {
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
      (error) => {
        res.status(400).json({error});
      }
    );
  };
  
  exports.deleteThing = (req, res) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  exports.getAllStuff = (req, res) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({error});
      }
    );
  };