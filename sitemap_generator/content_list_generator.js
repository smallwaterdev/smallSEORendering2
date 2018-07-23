const fs = require('fs');
const _ = require('lodash'); // escape
const initSiteMap = require('./helper_functions').initSiteMap;
const doneSiteMap = require('./helper_functions').doneSiteMap;
const contentDB = require('../db_models/content_db');
const mongodb_url = require('./config').mongodb_url;
const mongoose = require('mongoose');
const url_origin = require('./config').url_origin;

const connect = mongoose.connect(mongodb_url, {});
const content_priority = '0.5';
const content_changefreq = "monthly";

function createItemStr(content){
    let day = content.updatedAt.getDate();
    let month =content.updatedAt.getMonth() + 1;
    let year = content.updatedAt.getFullYear();
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
    let content_lastmod = year + '-' + month + '-' + day;
    return `
    <url>
        <loc>${url_origin}/content/${content._id}</loc>
        <lastmod>${content_lastmod}</lastmod>
        <changefreq>${content_changefreq}</changefreq>
        <priority>${content_priority}</priority>
    </url>`;
}
let counter = 0;
function findContentsCreatedAfter(isLater, date, callback){
    let temp = '$gt';
    if(isLater){
        temp = '$gte';
    }else{
        temp = '$lte';
    }
    let obj = {};
    obj[temp] = date;
    // lt: early than, gt: later than
    contentDB.find({"createdAt": obj}, null, null, (err, contents)=>{
        if(err){
            console.log(err.message);
            callback(null);
        }else{
            let str = '';
            for(let content of contents){
                counter++;
                str += createItemStr(content);
            }
            callback(str);
        }
    });
}



/**
 * given a created date, and a file name (file may exist or not)
 * after the date's created file will be append
*/

function content_list_generator(filename, isLater, date, callback){
    connect.then((db)=>{
        console.log("[mongodb] connected correctly to server");
        findContentsCreatedAfter(isLater,date, (str)=>{
            if(str){
                initSiteMap(filename, ()=>{
                    fs.appendFile(filename, str, ()=>{
                        doneSiteMap(filename, ()=>{
                            console.log('OK, done', counter);
                            mongoose.connection.close();
                            callback();
                        });
                    });
                })
            }else if(str  === null){
                console.log('Error done');
                mongoose.connection.close();
                callback();
            }else if(str === ''){
                console.log('Not found, done');
                mongoose.connection.close();
                callback();
            }
        });
    }, (err)=>{
        console.log("[mongodb] connection failed");
        console.log(err);
        callback();
    });
}

module.exports.content_list_generator = content_list_generator;