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
        required:false,
    },
    zip:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
})

userShema.virtual('id').get(function(){
    return this._id.toHexString();
});

userShema.set('toJSON', {
    virtuals:true,
});

exports.User= mongoose.model('User', userShema);
