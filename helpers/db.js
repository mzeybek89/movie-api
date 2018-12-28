const mongoose = require('mongoose');

module.exports = ()=>{
<<<<<<< HEAD
    mongoose.connect('mongodb://movies:m008495@ds119685.mlab.com:19685/movies-api',{useNewUrlParser:true,useCreateIndex:true})
=======
    mongoose.connect('mongodb://movies:m008495@ds119685.mlab.com:19685/movies-api',{useNewUrlParser:true})
>>>>>>> b19207e9a9a19621b9aa06c2cc681aaf33daa6d5
        .then(()=>{console.log('Bağlantı Başarılı');})
        .catch((err)=>{console.log('HATA ==> '+err);})
};

