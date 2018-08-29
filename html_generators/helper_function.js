
const smallDataUserAddr = require('../config').smallDataUserAddr;
const request = require('request');
function queryRecommendContents(id, option, callback){
    request({
        method: "POST",
        uri: `${smallDataUserAddr}/content/recommend/${id}`,
        json: {
            option: option
        }
    }, (err, res, body)=>{
        if(err){
            callback({success: false, reasons:[err.message]});
        }else if(res.statusCode !== 200){
            callback({success: false, reasons:[`Status code ${res.statusCode}`]});
        }else{
            callback(body);
        }
    });
}
function queryContents(condition, option, callback){
    request({
        method: "POST",
        uri: `${smallDataUserAddr}/content/query`,
        json: {
            condition: condition,
            option: option
        }
    }, (err, res, body)=>{
        if(err){
            callback({success: false, reasons:[err.message]});
        }else if(res.statusCode !== 200){
            callback({success: false, reasons:[`Status code ${res.statusCode}`]});
        }else{
            callback(body);
        }
    });
}
function queryMetas(condition, option, callback){
    request({
        method: "POST",
        uri: `${smallDataUserAddr}/meta/query`,
        json: {
            condition: condition,
            option: option
        }
    }, (err, res, body)=>{
        if(err){
            callback({success: false, reasons:[err.message]});
        }else if(res.statusCode !== 200){
            callback({success: false, reasons:[`Status code ${res.statusCode}`]});
        }else{
            callback(body);
        }
    });
}

function str2NonPositive(str){
    let num = parseInt(str);
    if(num.toString() !== str){
        return -1;
    }
    if(num > 0){
        return num;
    }else{
        return -1;
    }
}
function websiteLDJSON(){
    return {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "javferry.com",
        "about": "Free JAV Porn videos. Watch online.",
        "description": "The excellent JAV Porn website.",
        "image": "http://www.javferry.com/website/logo.png",
        "alternateName": "JAVFerry.com",
        "url": "http://www.javferry.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "http://www.javferry.com/search/{query}",
          "query-input": "required name=query"
        }
    };
}
function organizationLDJSON(){
    return {
        "@context": "http://schema.org",
        "@type": "Organization",
        "url": "http://www.javferry.com",
        "logo": "http://www.javferry.com/website/logo.png"
    };
}
module.exports.str2NonPositive = str2NonPositive;
module.exports.websiteLDJSON = websiteLDJSON;
module.exports.organizationLDJSON = organizationLDJSON;

module.exports.queryRecommendContents = queryRecommendContents;
module.exports.queryContents = queryContents;
module.exports.queryMetas = queryMetas;