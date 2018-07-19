const express = require('express');
const contentRoute = express.Router();
const contentHandler = require('../models/content').content_handler;

function handler(req, res, next){
    contentHandler(req.params.id, res);
}
contentRoute.get('/:id', handler);

module.exports = contentRoute;