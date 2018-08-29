const express = require('express');
const metaListRoute = express.Router();
const genMetaHtml = require('../html_generators/meta').genMetaHtml;



metaListRoute.get('/:field', (req, res, next)=>{
    genMetaHtml(req.params.field, null, res);
});
metaListRoute.get('/:field/:page', (req, res, next)=>{
    genMetaHtml(req.params.field, req.params.page, res);
});
module.exports = metaListRoute;