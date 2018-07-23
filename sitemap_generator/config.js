const output_dir = '';
const mongodb_url = "mongodb://localhost:27017/smallwater";
const mongodb_auth = {
    auth:{authdb:"admin"},
    user:"store",
    pass:"xyz123"
}
const url_origin = 'http://www.javferry.com';
const destination_dir = './seo/sitemap/';
module.exports.output_dir = output_dir;
module.exports.mongodb_url = mongodb_url;
module.exports.url_origin = url_origin;
module.exports.destination_dir = destination_dir;