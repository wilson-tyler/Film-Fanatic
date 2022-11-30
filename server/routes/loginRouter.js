const express = require('express');
const route = express.Router();
const UserController = require('../controllers/UserController');

route.get('/', UserController.getLoginData, (req, res) => res.status(200).redirect('/'));

module.exports = route;