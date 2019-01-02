const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

/* ADD  */
router.post('/', (req, res, next) => {
   /* const {title,category,country,year,imdb_score} = req.body;

    const movie = new Movie({
        title:title,
        category:category,
        country:country,
        year:year,
        imdb_score:imdb_score
    });*/

   const movie = new Movie(req.body);  //bu şekide ne gelirse onu kaydederiz

   movie.save()
       //.then((data)=>{res.json({status:"created",code:1})})
       .then((data)=>{res.json(data)})
       .catch((err)=>{next({message:err.errors.title.message,code:93})});

});



/* LIST TOP 10  */ //list movie top 10
router.get('/top10', (req, res, next) => {
   Movie.find({}).limit(10).sort({imdb_score:-1})
       .then((movies)=>{res.json(movies)})
       .catch((err)=>{res.json(err.message)});
});


/* LIST  */ //list movie  all or id
router.get('/:movieId?', (req, res, next) => {

   const movieId = req.params.movieId;

   if(movieId!=null)//sadece verilen id yi bul

      Movie.findById(movieId)
          .then((movie)=>{
             if(!movie)
                next({message:"The Movie Was Not Found",code:99});
             else
               res.json(movie)
          })
          .catch((err)=>{res.json(err.message)});
   else//tamamını bul



      Movie.aggregate([
          {
            $lookup:{
               from: 'directors',
               localField: 'director_id',
               foreignField: '_id',
               as: 'director'
            }
         },
         {
            $unwind: {
               path: "$director",
               preserveNullAndEmptyArrays:true  //eşleşme olmasa dahi getir. False olursa yönetmeni olmayan filmlistelemez
            }
         }
      ])
          .then((movies)=>{res.json(movies)})
          .catch((err)=>{res.json(err.message)});


});




//UPDATE
router.put('/:movieId', (req, res, next) => {  //güncelleme id bazlı
   const movieId = req.params.movieId;

   Movie.findByIdAndUpdate(movieId,req.body,{new:true}) //sadece verilen id yi bul ve güncelle
       .then((movie)=>{
          if(!movie)
             next({message:"The Movie Was Not Found",code:99});
          else
             res.json({status:"updated",code:1});
       })
       .catch((err)=>{res.json(err.message)});

});

//DELETE
router.delete('/:movieId', (req, res, next) => {  //sadece verilen id yi bul ve sil
   const movieId = req.params.movieId;

   Movie.findByIdAndRemove(movieId) //sadece verilen id yi bul ve sil
       .then((movie)=>{
          if(!movie)
             next({message:"The Movie Was Not Found",code:99});
          else
             res.json({status:"deleted",code:1});
       })
       .catch((err)=>{res.json(err.message)});

});




//BETWEEN
router.get('/between/:start_year/:end_year?', (req, res, next) => {  //sadece verilen id yi bul ve sil

   const start_year = parseInt(req.params.start_year);
   let end_year = parseInt(req.params.end_year);
   if(!end_year)  //eğer son yıl girilmez ise geçerli yılı al
      end_year = new Date().getFullYear();



   Movie.find({
      year:{"$gte":start_year,"$lte":end_year}
   })
    .then((movies)=>{res.json(movies)})
    .catch((err)=>{res.json(err.message)});

});




module.exports = router;
