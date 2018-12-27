const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

/* POST  */
router.post('/', (req, res, next) => {
   /* const {title,category,country,year,imdb_score} = req.body;

    const movie = new Movie({
        title:title,
        category:category,
        country,country,
        year:year,
        imdb_score:imdb_score
    });*/

   const movie = new Movie(req.body);

   movie.save()
       .then((data)=>{res.json({status:true})})
       .catch((err)=>{res.json(err.errors.title.message)});

});

module.exports = router;
