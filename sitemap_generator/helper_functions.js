const fs = require('fs');
function initSiteMap(filename, callback){
    fs.writeFile(filename, `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`, callback);
}

function doneSiteMap(filename, callback){
    fs.appendFile(filename, `
</urlset>`, callback);
}
module.exports.initSiteMap = initSiteMap;
module.exports.doneSiteMap = doneSiteMap;