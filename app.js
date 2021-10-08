const express=require('express');
const app=express();
const bodyParser= require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
require('dotenv/config');
var authJwt=require('./helpers/jwt');
const errorHandler=require('./helpers/error-Handler');

const secret=process.env.secret;

//************middleware************

app.use(bodyParser.json());
app.use(morgan('tiny'));  //display log format
app.use(authJwt());  //{secret:secret, algorithms:['RS256','HS256']})
app.use(errorHandler);


//**********routers*****************
const productsRouter=require('./routers/products');
const usersRouter=require('./routers/users');
const categoryRouter=require('./routers/categories');
const orderRouter=require('./routers/orders');


const api= process.env.API_URL;

app.use(api+'/products',productsRouter);
app.use(api+'/users',usersRouter);
app.use(api+'/categories',categoryRouter);
app.use(api+'/orders',orderRouter);

//connection to DB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'E-shopDB'
})
.then(()=>{
    console.log('DB Connected...');
})
.catch((err)=>{
    console.log(err);
    console.log('err');
})

// server
app.listen(3000,()=>{
    console.log('server is runinnig on http://localhost:3000');
})