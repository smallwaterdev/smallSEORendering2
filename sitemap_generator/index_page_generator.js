const fs = require('fs');
const fileMetadata = require('file-metadata');
const destination_dir = require('./config').destination_dir;
const EventEmitter = require('events');
const url_origin = require('./config').url_origin;

const evt = new EventEmitter();
function appendFile(str){
            fs.stat(destination_dir + str, (err, temp)=>{
                try{
                    let date = temp.mtime;
                
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
                    let result = `
    <sitemap>
        <loc>${url_origin}/sitemap/${str}</loc>
        <lastmod>${lastmod}</lastmod>
    </sitemap>`;
                    evt.emit('value', result);
                }catch(err){
                    console.log(err.message)
                    evt.emit('value', null);
                }
            });
}

function index_generator(filename, destination_dir, callback){
    fs.readdir(destination_dir, (err, items)=>{
        let result = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        if(err || items.length === 0){
            callback();
        }else{
            appendFile(items[0]);
            let counter = 1;
            evt.on('value', (str)=>{
                if(str){
                    result += str;
                }else{
                    console.log(`No`);
                }
                if(counter < items.length){
                    appendFile(items[counter]);
                    counter++;
                }else{
                    evt.emit('done');
                }
            });
            evt.once('done', ()=>{
                result +=`
</sitemapindex>`;
                fs.writeFile(filename, result, callback);
            });
        }
    });
}
module.exports.index_generator = index_generator;