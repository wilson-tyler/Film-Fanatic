const express = require('express');
const route = express.Router();
const UserController = require('../controllers/UserController');

route.get('/:id', UserController.getProfileData, (req, res) => res.status(200).json(res.locals.profile));

module.exports = route;