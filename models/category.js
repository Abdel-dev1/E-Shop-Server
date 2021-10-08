const mongoose=require('mongoose');


const categoryShema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    },
    
})

exports.Category= mongoose.model('category', categoryShema);