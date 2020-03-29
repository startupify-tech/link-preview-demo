const express= require('express');
var app= express();
var bodyParser= require('body-parser');
const grabity = require("grabity");
const linkPreviewGenerator = require("link-preview-generator");
var linkPreview = require("sa-link-preview");

app.use('/',express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.listen(5000,()=>{
    console.log("server running on 5000 ")
})




app.post('/geturlone',(req,res)=>{
    (async () => {
        try{
        let it = await grabity.grabIt(req.body.url);
        res.send(it);
        }catch(e){
        console.log(e);
        res.send(e);
        } 
    })();
 
})


app.post('/geturlthree',(req,res)=>{
    linkPreviewGenerator(req.body.url).then(d=>{
        //console.log(d);
        res.send(d);
    })
    .catch((e)=>{
        console.log(e)
    }) 
 
})

app.post('/geturltwo',(req,res)=>{
    linkPreview(req.body.url).then(response => {
       // console.log(response);
        res.send(response)
    })
    .catch((e)=>{
        console.log(e)
    })  
})


