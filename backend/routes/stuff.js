const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.route('/')
.get(stuffCtrl.getAllStuff)
.post(stuffCtrl.createThing);
router.route('/:id')
.get(stuffCtrl.getOneThing)
.put(stuffCtrl.modifyThing)
.delete(stuffCtrl.deleteThing);

module.exports = router;