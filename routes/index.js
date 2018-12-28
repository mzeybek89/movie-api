const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Model
const User = require('../models/User');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});



/* POST home page. */
router.post('/auth', (req, res, next) => {
 const {username,password} = req.body;

     User.findOne({
         username
     })
     .then((user)=> {
         if (!user){
             res.json({
                 status: false,
                 message: "Authentication failed, user not found"
             });
         }
         else {
             bcrypt.compare(password, user.password).then(function (stat) {
                 if (!stat) {
                     res.json({
                         status: false,
                         message: "Authentication failed, Password do not match"
                     });
                 } else {
                     const payload = {
                         username
                     };

                     const token = jwt.sign(
                         payload,
                         req.app.get('apiSecretKey'),
                         {expiresIn:"720h"} //dk cinsinden, 12 saat
                     );

                     res.json({
                         status:true,
                         token
                     });
                 }
             });
         }
     })
     .catch((err)=>{res.json(err)});


});

/* POST home page. */
router.post('/register', (req, res, next) => {
  const {username,password} = req.body;

  bcrypt.hash(password, 8).then(function(hash) {

    const user = new User({
      username,
      password:hash
    });

    user.save()
        .then((user)=>{
          res.json({status:"created",code:1});
        })
        .catch((err)=>{
          next({message:err,code:99})
        });

  });


});

module.exports = router;
