var express =require('express');
var bodyParser =require('body-parser');
var Mongoose=require('mongoose');
var app=express();
app.use(bodyParser.urlencoded({extended: false}))

const studentSchema =new Mongoose.Schema(
    {
    name:String,
    roll:Number,
    adminNo:Number,
    clg:String
    }
);
var studentModel=Mongoose.model('students',studentSchema);
Mongoose.connect("mongodb+srv://shinyjoseph:shiny@cluster0-prim6.mongodb.net/test?retryWrites=true&w=majority");

app.get('/',(req, res )=>{

    res.send("hai..");
});

app.post('/students',async(req, res )=>{

    var getname =req.body.name;
    var getroll =req.body.roll;
    var getadminNo=req.body.adminNo;
    var getcollege=req.body.clg;
try {
    var studentdata = new studentModel(req.body);
    var result = await studentdata.save();
    res.json(result);
    
    } 
catch (error) 
    {
    console.log(error);
    res.status(500).send(error);
    }   
});
app.post('/viewall',async(req,res)=>{
    try {
        var result =await studentModel.find();
        res.send(result);
        
    } catch (error) {
        console.log(error);
    res.status(500).send(error);
    }
});
app.post('/search',async(req,res)=>{
    try {
        var searchkey =req.body.mydata;
        studentModel.find({"adminNo": searchkey},(error,data)=>{
            if (error) {
                throw error;
            } else {
                res.send(data);
            }
        });
       
    } catch (error) {
        console.log(error);
    res.status(500).send(error);
    }
});


app.listen(process.env.PORT || 3010, () => {
    console.log("server started");
});
