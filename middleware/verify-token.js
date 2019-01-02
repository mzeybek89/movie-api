const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(!token){
        next({
            message:"Token not found",
            code:97
        });
    }
    else{
        jwt.verify(token,req.app.get('apiSecretKey'),(err,decoded)=>{
           if(err)
               next({
                   message:"Token not verifed",
                   code:98
               });
           else
                req.decode = decoded;
                next();
        });

    }
};