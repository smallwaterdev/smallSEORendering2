const express = require('express');
const contentListRoute = express.Router();
const contentListHandler = require('../models/content_list').content_list_handler;

function handler(req, res, next){
    contentListHandler(undefined, undefined, req.params.sort, req.params.page, res);
}
contentListRoute.get('/', handler);
contentListRoute.get('/list/:sort', handler);
contentListRoute.get('/list/:sort/:page', handler);

contentListRoute.get('/category/:name', (req, res, next)=>{
    contentListHandler('category', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/category/:name/:sort', (req, res, next)=>{
    contentListHandler('category', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/category/:name/:sort/:page', (req, res, next)=>{
    contentListHandler('category', req.params.name, req.params.sort, req.params.page, res);
});

contentListRoute.get('/studio/:name', (req, res, next)=>{
    contentListHandler('studio', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/studio/:name/:sort', (req, res, next)=>{
    contentListHandler('studio', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/studio/:name/:sort/:page', (req, res, next)=>{
    contentListHandler('studio', req.params.name, req.params.sort, req.params.page, res);
});

contentListRoute.get('/pornstar/:name', (req, res, next)=>{
    contentListHandler('pornstar', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/pornstar/:name/:sort', (req, res, next)=>{
    contentListHandler('pornstar', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/pornstar/:name/:sort/:page', (req, res, next)=>{
    contentListHandler('pornstar', req.params.name, req.params.sort, req.params.page, res);
});

contentListRoute.get('/director/:name/', (req, res, next)=>{
    contentListHandler('director', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/director/:name/:sort', (req, res, next)=>{
    contentListHandler('director', req.params.name, req.params.sort, req.params.page, res);
});
contentListRoute.get('/director/:name/:sort/:page', (req, res, next)=>{
    contentListHandler('director', req.params.name, req.params.sort, req.params.page, res);
});


module.exports = contentListRoute;