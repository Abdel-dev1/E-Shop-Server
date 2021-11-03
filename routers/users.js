const {User}=require('../models/user');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.get('/', async (req, res)=>{
    const userList= await User.find().populate('mongoose.module(user').select('-passwordHash');  //.select('-passwordHash');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.status(200).send(userList);
})

router.get('/:id', async (req, res)=>{
    const user= await User.findById(req.params.id).populate('user').select('-passwordHash');

    if (!user) return res.status(500).json({success:false});

    res.send(user);
})

router.post('/login',async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    const secret = process.env.secret;
    if(!user){
        return res.status(400).send('the user not found');
    }
    if(user && bcrypt.compareSync(req.body.password , user.passwordHash)){
        const token= jwt.sign(
            {
                userId: user.id,
                isAdmin:user.isAdmin
            },
            secret, 
            {expiresIn:'1d'}
        )
        res.status(200).send({user: user.email, token: token});
    } else{
        return res.status(400).send('user is wrong');
    }
    
})

router.post('/', async (req, res)=>{
    let user= new User({
        name : req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })
    user = await user.save();
    if(!user)
    return res.status(404).send('The user cannot be created:Admin');
    res.send(user);
})

router.post('/register', async (req, res)=>{
    let user= new User({
        name : req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })
    user = await user.save();
    if(!user)
    return res.status(404).send('The user cannot be created');
    res.send(user);
})

router.get('/get/count', async (req, res)=>{
    const userCount= await User.countDocuments((count=>count))

    if (!userCount) return res.status(500).json({success:false});

    res.send({
        userCount:userCount
    });
})
module.exports=router;