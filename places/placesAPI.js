const express = require('express');
const router = express.Router();
const places = require('./placesController');
router.route('/').get(places.getPlace);

module.exports.router = router;