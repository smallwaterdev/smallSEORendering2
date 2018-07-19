const express = require('express');
const router = express.Router();
const request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  request(
    'http://www.javferry.com/user/api/quickquery',
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
  
});

module.exports = router;
