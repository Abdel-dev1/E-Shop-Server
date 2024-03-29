const mongoose=require('mongoose');


const orderShema= mongoose.Schema({
    
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'orderItem',
        required: true
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending',
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dataOrdered:{
        type:Date,
        default:Date.now
    },
})

orderShema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderShema.set('toJSON', {
    virtuals:true,
});

exports.Order= mongoose.model('Order', orderShema);

