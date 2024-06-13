const dotenv  = require('dotenv');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'});
const cookieParser = require('cookie-parser');
app.use(cookieParser());    

const DB = 'mongodb+srv://Work4You:Work4You@cluster0.iyyiqtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(DB).then(()=>{
    console.log("connected to database succesully")
}).catch((err)=>{
    console.log('connection failed');
});

app.use(express.json());
app.use(require('./router/auth'));

//Middelware
// const middleware = (req,res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

//app.get('/about', middleware, (req, res) => {
  //  console.log(`Hello my About`);
   // res.send(`Hello About world from the server`);
//});

// app.get('/contact', (req, res) => {
//     res.send(`Hello Contact world from the server`);
// });

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});



app.listen(5000, () => {
    console.log(`server is running at port no 5000`);
})