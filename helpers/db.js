const mongoose = require('mongoose');

module.exports = ()=>{

    mongoose.connect('mongodb://movies:m008495@ds119685.mlab.com:19685/movies-api',{useNewUrlParser:true,useCreateIndex:true})
        .then(()=>{console.log('Bağlantı Başarılı');})
        .catch((err)=>{console.log('HATA ==> '+err);})
};

