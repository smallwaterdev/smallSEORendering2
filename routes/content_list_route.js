const express = require('express');
const contentListRoute = express.Router();
const genContentListHtml = require('../html_generators/content').genContentListHtml;

function handler(req, res, next){
    contentListHandler(undefined, undefined, req.params.sort, req.params.page, res);
}

contentListRoute.get('/:sort', (req, res, next)=>{
    genContentListHtml(null, null, req.params.sort, null, res);
});
contentListRoute.get('/:sort/:page', (req, res, next)=>{
    genContentListHtml(null, null, req.params.sort, req.params.page, res);
});

module.exports = contentListRoute;