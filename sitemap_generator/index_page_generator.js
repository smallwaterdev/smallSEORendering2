const fs = require('fs');
const fileMetadata = require('file-metadata');
const destination_dir = require('./config').destination_dir;
const url_origin = require('./config').url_origin;
function appendFile(str){
        try{
            let temp = fileMetadata.sync(destination_dir + str);
            let date = temp.contentModificationDate;
            
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
            return result;
        }catch(err){
            console.log(err.message)
            return null;
        }
}
function index_generator(filename, destination_dir, callback){
    fs.readdir(destination_dir, (err, items)=>{
        let result = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        if(err){
            callback();
        }else{
            for(let item of items){
                let str = appendFile(item);
                if(str){
                    result += str;
                }else{
                    console.log(`No ${item}`);
                }
            }
            result +=`
</sitemapindex>`;
            fs.writeFile(filename, result, callback);
        }
    });
}
module.exports.index_generator = index_generator;