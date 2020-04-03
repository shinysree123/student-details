var express =require('express');
var bodyParser =require('body-parser');

var app=express();
app.use(bodyParser.urlencoded({extended: false}))
app.get('/',(req, res )=>{

    res.send("hai..");
});

app.get('/students',(req, res )=>{

    var name =req.body.getname;
    var roll =req.body.getroll;
    var adminNo=req.body.getadminNo;
    var college=req.body.getclg;

    res.json(req.body);
});

app.listen(process.env.PORT || 3222, () => {
    console.log("server started");
});