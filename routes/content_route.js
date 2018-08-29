const express = require('express');
const contentRoute = express.Router();
const genContentHtml = require('../html_generators/content').genContentHtml;

contentRoute.get('/:id', (req, res, next)=>{
    genContentHtml(req.params.id, res);
});

module.exports = contentRoute;