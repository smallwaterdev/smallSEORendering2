const request = require('request');
const str2NonPositive = require('./helper_function').str2NonPositive;
const origin_url = require('./config').url;
// http://www.javferry.com
// http://www.javferry.com/list/releaseDate/875

function generate_url(meta, name, sort, page){
    const meta_name_converter = {
        'category':'genre',
        'pornstar':'starname',
        'studio':'studio',
        'director':'director'
    };
    let url = "";
    if(meta === 'list' || meta === undefined){
        if(sort === undefined && page === undefined){
            url = `${origin_url}/user/api/quickquery/releaseDate/0/20`;
        }else if(page === undefined){
            url = `${origin_url}/user/api/quickquery/${sort}/0/20`;
        }else{
            let page_ = str2NonPositive(page);
            if(page_ !== -1){
                url = `${origin_url}/user/api/quickquery/${sort}/${(page_ - 1) * 20}/20`;
            }
        }
    }else if(meta_name_converter[meta]){
        let meta_name = meta_name_converter[meta];
        if(sort === undefined && page === undefined){
            url = `${origin_url}/user/api/query/${meta_name}/${name}/releaseDate/0/20`;
        }else if(page === undefined){
            url = `${origin_url}/user/api/query/${meta_name}/${name}/${sort}/0/20`;
        }else{
            let page_ = str2NonPositive(page);
            if(page_ !== -1){
                url = `${origin_url}/user/api/query/${meta_name}/${name}/${sort}/${(page_ - 1) * 20}/20`;
            }
        }
    }
    return url;
}
function content_list_handler(meta, name, sort, page, res){
    let url = generate_url(meta, name, sort, page);
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
            let contents = JSON.parse(body).value;
            res.render('content_list', { 
              title: 'Javferry' , 
              contents:contents});
          }
        }
    );
}
module.exports.content_list_handler = content_list_handler;
