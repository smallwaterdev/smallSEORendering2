const fs = require('fs');
const _ = require('lodash'); // escape
const initSiteMap = require('./helper_functions').initSiteMap;
const doneSiteMap = require('./helper_functions').doneSiteMap;

const mongodb_url = require('./config').mongodb_url;
const mongoose = require('mongoose');
const url_origin = require('./config').url_origin;

const connect = mongoose.connect(mongodb_url, {});

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if(day < 10){
    day = '0'+day;
}else{
    day = day.toString();
}
if(month< 10){
    month = '0' + month;
}else{
    month = month.toString();
}
let lastmod = year + '-' + month + '-' + day;
const str = `
    <url>
        <loc>http://www.javferry.com/</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;

/**
 * given a created date, and a file name (file may exist or not)
 * after the date's created file will be append
*/

function home_page_generator(filename, callback){
    connect.then((db)=>{
        console.log("[mongodb] connected correctly to server");
        initSiteMap(filename, ()=>{
            fs.appendFile(filename, str, ()=>{
                doneSiteMap(filename, ()=>{
                    console.log('OK, done');
                    mongoose.connection.close();
                    callback();
                });
            });
        });
    }, (err)=>{
        console.log("[mongodb] connection failed")
        console.log(err);
        callback();
    });
}
module.exports.home_page_generator = home_page_generator;