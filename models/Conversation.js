const mongoose=require('mongoose');


const conversationShema= mongoose.Schema(
    {
        members:{
            type: Array,
        },
    },
    { timestamps : true }
);


exports.Conversation= mongoose.model('Conversation',conversationShema);
