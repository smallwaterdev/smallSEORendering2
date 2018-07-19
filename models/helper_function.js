function str2NonPositive(str){
    let num = parseInt(str);
    if(num > 0){
        return num;
    }else{
        return -1;
    }
}
module.exports.str2NonPositive = str2NonPositive;