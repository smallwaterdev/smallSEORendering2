const express = require('express');
const contentsRoute = express.Router();
const genContentListHtml = require('../html_generators/content').genContentListHtml;


// content page
contentsRoute.get('/:name', (req, res, next)=>{
    genContentListHtml('studio', req.params.name, null, null, res);
});
contentsRoute.get('/:name/:sort', (req, res, next)=>{
    genContentListHtml('studio', req.params.name, req.params.sort, null, res);
});
contentsRoute.get('/:name/:sort/:page', (req, res, next)=>{
    genContentListHtml('studio', req.params.name, req.params.sort, req.params.page, res);
});


module.exports = contentsRoute;