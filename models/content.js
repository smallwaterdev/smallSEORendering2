const request = require('request');
const str2NonPositive = require('./helper_function').str2NonPositive;
const origin_url = require('./config').url;
const organizationLDJSON = require('./helper_function').organizationLDJSON;
const websiteLDJSON = require('./helper_function').websiteLDJSON;
function breadcrumbLDJSON(content){
    
  return {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
          {
              "@type": "ListItem",
              "position": 1,
              "item": {
                  "@id": "http://www.javferry.com",
                  "name": "Porn Videos"
              }
          },
          {
              "@type": "ListItem",
              "position": 2,
              "item": {
                  "@id": `http://www.javferry.com/content/${content._id}`,
                  "name": `${content.title}`
              }
          }
      ]
  };
}
function content_handler(id, res){
    request(
        `${origin_url}/user/api/query/id/${id}`,
        (err, response, body)=>{
          if(err || response.statusCode !== 200){
            if(err){
              res.statusCode = 403;
              res.render('error', { 
                title: 'Javferry' , message: err.message});
            }else{
              res.statusCode = response.statusCode;
              res.end(body);
            }
          }else{
            let content = JSON.parse(body).value[0];
            res.render('content', { 
              title: 'Javferry' , 
              websiteLDJSON: websiteLDJSON(),
              organizationLDJSON: organizationLDJSON(),
              specialLDJSON: breadcrumbLDJSON(content),
              content_:content});
          }
        }
    );
}
module.exports.content_handler = content_handler;
