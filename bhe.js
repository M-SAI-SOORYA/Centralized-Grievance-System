const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const mongoose=require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(()=>{
    console.log('connected')
})
.catch((error)=>{
    console.log(error);

})

const Sche=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,

    }
});

const Schemaa=new mongoose.Schema({
    choose:{
        type:String,
        required:true
        
    },
    grievance:{
        type:String,
        required:true
    }
});
const conn=mongoose.model('products',Sche);
const griev=mongoose.model('grievances',Schemaa);







app.get("/",function(req,res){
    res.sendFile(__dirname+"/tut.html");
});
app.post("/thank",async(req,res)=>{
    console.log(req.body.choose);
    console.log(req.body.grievance);
    
    const product_data=new griev({
        choose:req.body.choose,
        grievance:req.body.grievance
    })
    const postdata=await product_data.save();
    res.sendFile(__dirname+'/thank.html');
});
// app.post("/data",async(req,res)=>{
//     const password=req.body.password;
//     console.log(req.body.email);
//     console.log(req.body.password);
    
//     const product_data=new producti({
//         email:req.body.email,
//         password:req.body.password
        
//     })
//     const postdata=await product_data.save();
//     res.send(postdata);
// });
app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
   
        const useremail=await conn.findOne({email:email});
        
        if(useremail.password===password){
            res.sendFile(__dirname+'/sec_tut.html')
        }
        else{
            res.send("invalid login Details")
        }
    }catch(error){
        res.status(401).send("invalid login details");
    }

});
app.listen(5500,function(){
    console.log("Server is running in port 5500");
    
});
// app.post("/",function(req,res){
//     var num1=Number(req.body.num1);
//     var num2=Number(req.body.num2);
//     var result=num1+num2;

//     res.send("The result is:"+result);
// })
