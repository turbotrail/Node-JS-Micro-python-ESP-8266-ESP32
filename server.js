const express =require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const MongoClient=require('mongodb').MongoClient;
url='mongodb://localhost:27017/';



app.listen(3000,function(){
    console.log("Server started on port 3000");
});

app.get('/',(req,res)=>{
    res.send("hello");
    console.log("connected and read");
})

app.post('/read',(req,res)=>{
    console.log("reading");
    //console.log(req);
    console.log(req.body);
    MongoClient.connect(url,(err,db)=>{
        if(err) console.log(err);
        dbo=db.db("pt");
        console.log("database updated");
        console.log("data submitted"); 
        dbo.collection("ptc").save(req.body,(err,result)=>{
            if(err) return console.log(err);});
            dbo.collection("ptc").find().toArray((err,result)=>{
                if(err) return console.log(err);
                res.send(result);
            db.close();
        });
    });

})