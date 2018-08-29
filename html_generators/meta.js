
const str2NonPositive = require('./helper_function').str2NonPositive;
const queryMetas = require('./helper_function').queryMetas;
const organizationLDJSON = require('./helper_function').organizationLDJSON;
const websiteLDJSON = require('./helper_function').websiteLDJSON;

const META_PRE_PAGE = 36;

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
            "url": `http://www.javferry.com/${meta_name_converter[metas[i].field]}/${metas[i].name}`
        });
    }
    result['itemListElement'] = itemListElement;
    return result;
}

function genMetaHtml(field, page, res){
    page = str2NonPositive(page);
    if(page <=0 ){
        page = 1;
    }
    page -= 1;
    const meta_name_converter = {
        'category':'genre',
        'pornstar':'starname',
        'studio':'studio',
        'director':'director'
    }
    let backendField = meta_name_converter[field];
    if(!backendField){
        res.statusCode = 403; 
        res.render('error', { title: 'Javferry' , message: `Invalid arguments ${field}`});
        return;
    }
    let url = '/meta/' + field;
    let description = `Find Jav videos by ${backendField}.`;
    queryMetas({field: backendField}, {limit: META_PRE_PAGE, skip: page * META_PRE_PAGE}, (result)=>{
        if(result.success && result.value.length > 0){
            let metas = result.value;
            let nextpageUrl = "";
            let lastpageUrl = "";
            if(metas.length === META_PRE_PAGE){
                nextpageUrl = url + '/' + (page + 2);
            }else{
                nextpageUrl = url + '/' + (page + 1);
            }
            if(page > 1){
                lastpageUrl = url + '/' + page;
            }else{
                lastpageUrl = url;
            }
            res.render('meta_list', { 
                title: 'Javferry' , 
                websiteLDJSON: websiteLDJSON(),
                des: description,
                organizationLDJSON: organizationLDJSON(),
                specialLDJSON: metalistLDJSON(metas),
                metas:metas,
                field: field,
                isShowImg: field === 'pornstar',
                lastpage: lastpageUrl,
                nextpage: nextpageUrl
            });
        }else if(result.success){
            res.statusCode = 404;
            res.render('error', {title: 'Javferry' , message: `${field} is not found.`});
        }else{
            res.statusCode = 403;
            res.render('error', {title: 'Javferry' , message: result.reasons.join('/n')});
        }
    });
    
}
module.exports.genMetaHtml = genMetaHtml;
