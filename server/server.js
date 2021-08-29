const express=require('express');
require('dotenv').config();
const {router}=require('./routes/users');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use('/',router);

app.listen(process.env.PORT,()=>console.log(`Listening on port: ${process.env.PORT}`));