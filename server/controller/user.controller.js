const { Users } = require('../models/db');
const bcrypt = require('bcryptjs'); 
const {check,validationResult}=require('express-validator');
const jwt = require('jsonwebtoken');
// const postUser= async (req,res)=>{
//     await check('email').isEmail().run(req);
//     await check('password').notEmpty().run(req);
//     await check('name').notEmpty().run(req);
//     await check('role').notEmpty().run(req);
    
//     const result=validationResult(req);
//     if (!result.isEmpty()) return res.status(400).json({msg:'please check again all mandatory fields'});
    
//     const {password , email}=req.body

//     const answer= await Users.findOne({'email':email});
//     if (answer) return  res.status(400).json({msg:'The user already registered'});

//     const salt = bcrypt.genSaltSync();
//     const hash =bcrypt.hashSync(password,salt);
//     const user={
//         ...req.body,
//         password:hash
//     }
//     const users= new Users(user);
//     users.save()
//         .then(()=> res.status(200).json({msg:"User registered Successfully"}))
//         .catch(err=> res.status(500).json({msg:"It was not possible add the user"}));

// }

const postUser= async(req,res)=>{
    await check('email').isEmail().run(req);
    await check('password').notEmpty().run(req);
    const result=validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({msg:'Password/email are required'});
    
    const {password , email}=req.body
    const answer= await Users.findOne({'email':email});
    
    if (!answer) return  res.status(400).json({msg:'Invalid Email or Password.'});
    
    const validPassword=await bcrypt.compare(password,answer.password);
    if(!validPassword) res.status(400).json({msg:'Invalid Email or Password.'});
    const token = jwt.sign(answer.toJSON(), process.env.PRIVATE_KEY,{expiresIn:'2h'});
    
    res.status(200).json(token);
}

const postRegisterUser= async (req,res)=>{
    await check('email').isEmail().run(req);
    await check('password').notEmpty().run(req);
    await check('name').notEmpty().run(req);
    await check('role').notEmpty().run(req);
    
    const result=validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({msg:'please check again all mandatory fields'});
    
    const {password , email}=req.body

    const answer= await Users.findOne({'email':email});
    if (answer) return  res.status(400).json({msg:'The user already registered'});

    const salt = bcrypt.genSaltSync();
    const hash =bcrypt.hashSync(password,salt);
    const user={
        ...req.body,
        password:hash
    }
    const users= new Users(user);
    await users.save();
    const userRegistered= await Users.findOne({'email':email}); 
    if(!userRegistered) return  res.status(500).json({msg:'Ops, something went wrong, try it later'}); 
    res.status(200).json({msg:'User Registered Successfully'});
}

module.exports={
    postUser,
    postRegisterUser,
}

