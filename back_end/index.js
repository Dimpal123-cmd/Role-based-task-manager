const mongoose =require('mongoose');

//disable strict mode 
mongoose.set('strictQuery', false);
//connect to mongodb and create new database if it does not exist
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'meds',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>err ?console.log(err) : console.log('Connected to database successfully'));

//Create layout of your data tables. Means create schema
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});


const LoginSchema =new mongoose.Schema({
email: {
    type: String,
    required: true,
    unique:true,
},
password: {
    type: String,
    required: true,
},
usertype: {
    type: String,
    required: true,
},
});

//create collections(if do not exist) admindata and logindata in database meds
const StudentData =mongoose.model('studentdata', StudentSchema);
StudentData.createIndexes();

const LoginData=mongoose.model('logindata',LoginSchema);
LoginData.createIndexes();





//Create middle-ware service and define settings for connectivity
const express = require('express');
const cors=require('cors');

//create app
const app=express();
//create settings
app.use(cors);
app.use(express.json());


//create API
app.get("/vgt",function(req,res){
    try{
        res.send("Server is ready");
    }
    catch(e)
    {
        console.log(e);
    }
    
});


//start server
app.listen(5000);
console.log("Server stated : http://localhost:5000/");
