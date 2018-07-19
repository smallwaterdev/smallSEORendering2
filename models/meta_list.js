const request = require('request');
const str2NonPositive = require('./helper_function').str2NonPositive;
const origin_url = require('./config').url;
function generate_url(field, page){
    const meta_name_converter = {
        'category':'genre',
        'pornstar':'starname',
        'studio':'studio',
        'director':'director'
    };
    //http://www.javferry.com/user/api/querymeta/starname/0/36
    let url = "";
    if(meta_name_converter[field]){
        let meta_name = meta_name_converter[field];
        if(page === undefined){
            url = `${origin_url}/user/api/querymeta/${meta_name}/0/36`;
        }else{
            let page_ = str2NonPositive(page);
            if(page_ !== -1){
                url = `${origin_url}/user/api/querymeta/${meta_name}/${(page_ - 1) * 36}/36`;
            }
        }
    }
    return url;
}

function meta_list_handler(field,  page, res){

    let url = generate_url(field, page);
    if(url === ''){
        res.statusCode = 403; 
        res.render('error', { title: 'Javferry' , message: `Invalid arguments ${meta}, ${name}, ${sort}, ${page}`});
        return;
    }
    request(
        url,
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
            let metas = JSON.parse(body).value;
            res.render('meta_list', { 
              title: 'Javferry' , 
              metas:metas, field: field, isShowImg: field === 'pornstar'});
          }
        }
    );
}
module.exports.meta_list_handler = meta_list_handler;