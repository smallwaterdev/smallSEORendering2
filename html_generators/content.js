const queryContents = require('./helper_function').queryContents;
const queryRecommendContents = require('./helper_function').queryRecommendContents;
const organizationLDJSON = require('./helper_function').organizationLDJSON;
const websiteLDJSON = require('./helper_function').websiteLDJSON;
const str2NonPositive = require('./helper_function').str2NonPositive;
const CONTENT_PRE_PAGE = 20;
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

function genContentHtml(id, res){
    queryContents({_id: id}, {}, (result)=>{
        if(result.success && result.value.length > 0){
            let content = result.value[0];
            queryRecommendContents(id, {limit: 12}, (res_)=>{
                let recommendContents = [];
                if(res_.success){
                    recommendContents = res_.value;
                }
                res.render('content', {
                    title: 'Javferry' , 
                    des: content.title,
                    websiteLDJSON: websiteLDJSON(),
                    organizationLDJSON: organizationLDJSON(),
                    specialLDJSON: breadcrumbLDJSON(content),
                    content_:content,
                    recommendContents: recommendContents
                });
            });
        }else if(result.success){
            res.statusCode = 404;
            res.render('error', {title: 'Javferry' , message: `${id} is not found.`});
        }else{
            res.statusCode = 403;
            res.render('error', {title: 'Javferry' , message: result.reasons.join('/n')});
        }
    });
}

function contentlistLDJSON(contents){
    
    let result = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        "itemListElement": []
    };
    let itemListElement = [];
    for(let i = 0; i < contents.length; i++){
        itemListElement.push({
            "@type":"ListItem",
            "position": i + 1,
            "url": `http://www.javferry.com/content/${contents[i]._id}`
        });
    }
    result['itemListElement'] = itemListElement;
    return result;
}

function genContentListHtml(field, name, sort, page, res){
    console.log(field, name, sort);
    const field_converter = {
        pornstar:"starname",
        director:"director",
        studio:"studio",
        category:"genre"
    };
    const valid_sort = ['releaseDate', 'view', 'rating', 'duration'];
    let condition = {};
    let sorting = {};
    let option = {};
    let description = "`Enjoy Jav Porn Videos on Javferry.com!";
    let url = "";
    if(field){
        
        let backendField = field_converter[field];
        if(!backendField){
            res.statusCode = 403;
            res.render('error', {title: 'Javferry' , message: `Invalid ${field}.`});
            return;
        }else if(!name){
            res.statusCode = 403;
            res.render('error', {title: 'Javferry' , message: `Invalid ${field} and ${name}.`});
            return;
        }else{
            condition[backendField] = name;
            description= `Watch ${name.toUpperCase()} Porn videos on Javferry.com`;
            url += '/' + field + '/' + name;
        }
    }else{
        url += '/list';
    }
    if(sort && valid_sort.indexOf(sort) !== -1){
        sorting[sort] = -1;
        option['sort'] = sorting;
        url += '/' + sort;
    }else if(sort){
        res.statusCode = 403;
        res.render('error', {title: 'Javferry' , message: `Invalid sort of ${sort}`});
        return;
    }else{
        option['sort'] = {releaseDate: -1};
        url += '/releaseDate';
    }
    let pageNum = str2NonPositive(page);
    if(pageNum <= 0){
        pageNum = 1;
    }
    pageNum -= 1;
    option['limit'] = CONTENT_PRE_PAGE;
    option['skip'] = pageNum * CONTENT_PRE_PAGE;
    console.log(condition, option);
    queryContents(condition, option, (result)=>{
        if(result.success && result.value.length > 0){
            let contents = result.value;
            let nextPageUrl = "";
            let lastPageUrl = "";
            if(result.value.length === CONTENT_PRE_PAGE){
                nextPageUrl = url + '/' + (pageNum + 2);
            }else{
                nextPageUrl = url + '/' + (pageNum + 1);
            }
            if(pageNum > 1){
                lastPageUrl = url + '/' + pageNum;
            }else{
                lastPageUrl = url;
            }
            res.render('content_list', { 
                title: 'Javferry', 
                des: description,
                websiteLDJSON: websiteLDJSON(),
                organizationLDJSON: organizationLDJSON(),
                specialLDJSON: contentlistLDJSON(contents),
                contents:contents,
                lastpage: lastPageUrl,
                nextpage: nextPageUrl
            });
            
        }else if(result.success){
            res.statusCode = 404;
            res.render('error', {title: 'Javferry' , message: `Nothing was found.`});
        }else{
            res.statusCode = 403;
            res.render('error', {title: 'Javferry' , message: result.reasons.join('/n')});
        }
    });

}
module.exports.genContentHtml = genContentHtml;
module.exports.genContentListHtml = genContentListHtml;