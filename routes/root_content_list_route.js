const express = require('express');
const contentsRoute = express.Router();
const genContentListHtml = require('../html_generators/content').genContentListHtml;


// content page
contentsRoute.get('/', (req, res, next)=>{
    genContentListHtml(null, null, 'releaseDate', null, res);
});



module.exports = contentsRoute;