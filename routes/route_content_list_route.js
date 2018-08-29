const express = require('express');
const siteMapRoute = express.Router();
const sitemap_generator = require('../models/sitemap_generator').sitemap_generator;


// content page
siteMapRoute.put('/content/id/:id', (req, res, next)=>{
    res.sendStatus(503);
});
siteMapRoute.put('/content/before/:date', (req, res, next)=>{
    res.sendStatus(503);
});
siteMapRoute.put('/content/after/:date', (req, res, next)=>{
    sitemap_generator('$lt', req.params.date, (result)=>{
        res.statusCode = result.success ? 200:503;
        res.end(result);
    });
});
// meta page 

siteMapRoute.put('/meta/:value', (req, res, next)=>{
    res.sendStatus(503);
});

// home-page xml
siteMapRoute.put('/home', (req, res, next)=>{
    res.sendStatus(503);
});
// index xml
siteMapRoute.put('/index', (req, res, next)=>{
    res.sendStatus(503);
});

module.exports = siteMapRoute;