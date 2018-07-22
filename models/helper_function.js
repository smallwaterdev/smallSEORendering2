function str2NonPositive(str){
    let num = parseInt(str);
    if(num > 0){
        return num;
    }else{
        return -1;
    }
}
function websiteLDJSON(){
    return {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "name": "javferry.com",
        "about": "Free JAV Porn videos. Watch online.",
        "description": "The excellent JAV Porn website.",
        "image": "http://www.javferry.com/website/logo.png",
        "alternateName": "JAVFerry.com",
        "url": "http://www.javferry.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "http://www.javferry.com/search/{query}",
          "query-input": "required name=query"
        }
    };
}
function organizationLDJSON(){
    return {
        "@context": "http://schema.org",
        "@type": "Organization",
        "url": "http://www.javferry.com",
        "logo": "http://www.javferry.com/website/logo.png"
    };
}
module.exports.str2NonPositive = str2NonPositive;
module.exports.websiteLDJSON = websiteLDJSON;
module.exports.organizationLDJSON = organizationLDJSON;