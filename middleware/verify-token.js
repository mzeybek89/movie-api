const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(!token){
        res.json({
            status:false,
            message:"Token Not Found"
        });
    }
    else{
        jwt.verify(token,req.app.get('apiSecretKey'),(err,decoded)=>{
           if(err)
               res.json({
                   status:false,
                   message:"Token not verifed"
               });
           else
                req.decode = decoded;
                next();
        });

    }
};