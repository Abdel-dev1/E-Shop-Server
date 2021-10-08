

function errorHandler(err, req,res,next){
    if(err.name=='UnauthorizedError') {
        res.status(401).json({message:'User invalid'});
    }

    else {return res.status(500).json({message:err});}

}

module.exports=errorHandler;
