const mongoose=require('mongoose');


const userShema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
    },
    passwordHash:{
        type:String,
        //default:' ',
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default:false,
    },
    apartment:{
        type:String,
        //required:true,
    },
    zip:{
        type:String,
        //required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
})

exports.User= mongoose.model('User', userShema);
