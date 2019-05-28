var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


var app = express();
    app.use(express.static('src'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
       next();
    });
    app.set('views', __dirname  + '/src');   
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);    
    app.get('/ajax*', function(req,res){
     res.setTimeout(3000, function(){
        res.send({"return_json_function_name": "ZWEB_PS_MYINFO","JIKWIDUNG":"E06","ORGEH":"50051121", "TABLE":[{"test":"1234", "test2":"2121"},{"test3":"12343", "test4":"eefe"}]});
     });
    });
    app.get('/', function(req,res){
      res.render('index.html');
    });
 
    app.get('/search', function(req,res){
      var options = {
         uri: "https://www.googleapis.com/customsearch/v1?q=test",
         Methods: "get"
         //key: "AIzaSyAF1i5Nq5IWIlzllht_5uBAgfD-iEmBYXA",
         //cx: "018043718028321663594:c-zfff9e0ue",
         //q: "테스트"
      };
      request.get(options, function (error, response, body) {
         res.send(body);
       });
   });


var server = app.listen(process.env.PORT || 8081, function(){
    console.log('Running Web server on 8081 port');
});