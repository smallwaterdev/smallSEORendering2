const express = require('express');
const metaListRoute = express.Router();
const metaListHandler = require('../models/meta_list').meta_list_handler;

function handler(req, res, next){
    metaListHandler(req.params.field, req.params.page, res);
}


metaListRoute.get('/:field', handler);
metaListRoute.get('/:field/:page', handler);

module.exports = metaListRoute;