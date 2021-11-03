const mongoose=require('mongoose');


const messageShema= mongoose.Schema(
    {
        conversationId:{
            type : String,
        },
        sender:{
            type: String,
        },
        text :{
            type:String
        },
    },
    { timestamps : true }
    )


exports.Message= mongoose.model('Message', messageShema);


