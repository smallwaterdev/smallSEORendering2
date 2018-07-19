const request = require('request');
const str2NonPositive = require('./helper_function').str2NonPositive;
const origin_url = require('./config').url;

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
            console.log(body);
            let content = JSON.parse(body).value[0];
            res.render('content', { 
              title: 'Javferry' , 
              content_:content});
          }
        }
    );
}
module.exports.content_handler = content_handler;
