const fs = require('fs');
const _ = require('lodash'); // escape
const initSiteMap = require('./helper_functions').initSiteMap;
const doneSiteMap = require('./helper_functions').doneSiteMap;
const metaDB = require('../db_models/meta_db');
const mongodb_url = require('./config').mongodb_url;
const mongoose = require('mongoose');
const url_origin = require('./config').url_origin;

const connect = mongoose.connect(mongodb_url, {});
const meta_priority = '0.6';
const meta_changefreq = "weekly";

function createItemStr(meta){
    const name_converter = {
        'genre':'category',
        'starname':'pornstar',
        'director':'director',
        'studio':'studio'
    }
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
    let meta_lastmod = year + '-' + month + '-' + day;
    return `
    <url>
        <loc>${url_origin}/${name_converter[meta.field]}/${meta.name}</loc>
        <lastmod>${meta_lastmod}</lastmod>
        <changefreq>${meta_changefreq}</changefreq>
        <priority>${meta_priority}</priority>
    </url>`;
}
let counter = 0;
function findMetasCreatedAfter(field, callback){
    // lt: early than, gt: later than
    metaDB.find({"field": field}, null, null, (err, metas)=>{
        if(err){
            console.log(err.message);
            callback(null);
        }else{
            let str = '';
            for(let meta of metas){
                counter++;
                str += createItemStr(meta);
            }
            callback(str);
        }
    });
}



/**
 * given a created date, and a file name (file may exist or not)
 * after the date's created file will be append
*/

function meta_list_generator(filename, field, callback){
    connect.then((db)=>{
        console.log("[mongodb] connected correctly to server");
        findMetasCreatedAfter(field, (str)=>{
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
        console.log("[mongodb] connection failed")
        console.log(err);
        callback();
    });
}
module.exports.meta_list_generator = meta_list_generator;