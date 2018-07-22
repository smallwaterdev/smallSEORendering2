const request = require('request');
const str2NonPositive = require('./helper_function').str2NonPositive;
const origin_url = require('./config').url;
const organizationLDJSON = require('./helper_function').organizationLDJSON;
const websiteLDJSON = require('./helper_function').websiteLDJSON;
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
function metalistLDJSON(metas){
    
    const meta_name_converter = {
        'genre':'category',
        'starname':'pornstar',
        'studio':'studio',
        'director':'director'
    }
    let result = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        "itemListElement": []
    };
    let itemListElement = [];
    for(let i = 0; i < metas.length; i++){
        itemListElement.push({
            "@type":"ListItem",
            "position": i + 1,
            "url": `http://wwww.javferry.com/${meta_name_converter[metas[i].field]}/${metas[i].name}`
        });
    }
    result['itemListElement'] = itemListElement;
    return result;
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
              websiteLDJSON: websiteLDJSON(),
              organizationLDJSON: organizationLDJSON(),
              specialLDJSON: metalistLDJSON(metas),
              metas:metas, field: field, isShowImg: field === 'pornstar'});
          }
        }
    );
}
module.exports.meta_list_handler = meta_list_handler;