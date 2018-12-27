const express = require('express');
const router = express.Router();
const Director = require('../models/Director');
const mongoose = require('mongoose');


/* ADD  */
router.post('/', (req, res, next) => {
    /* const {name,surname,bio} = req.body;
 
     const director = new Director({
         name:name,
         surname:surname,
         bio:bio
     });*/

    const director = new Director(req.body);  //bu şekide ne gelirse onu kaydederiz

    director.save()
        .then((data)=>{res.json({status:"created",code:1})})
        .catch((err)=>{res.json(err.errors.title.message)});

});




/* LIST  */ //list director  all or id
router.get('/:directorId?', (req, res, next) => {

    const directorId = req.params.directorId;

    if(directorId!=null)//sadece verilen id yi bul

        Director.aggregate([
            {
                $match: {
                    '_id':mongoose.Types.ObjectId(directorId)
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField:'_id',
                    foreignField: 'director_id',
                    as: 'movie'
                }
            },
            {
                $unwind: {
                    path: "$_id", //$movie dersem movieleri yönetmen altında array gibi değilde her biri ayrı kayıt gibi çeker
                    preserveNullAndEmptyArrays:true  //eşleşme olmasa dahi getir. False olursa filmi olmayan yönetmenleri listelemez
                }
            }

        ])
            .then((movies)=>{res.json(movies)})
            .catch((err)=>{res.json(err.message)});

    else//tamamını bul


        Director.aggregate([
            {
                $lookup: {
                    from: 'movies',
                    localField:'_id',
                    foreignField: 'director_id',
                    as: 'movie'
                }
            },
            {
                $unwind: {
                    path: "$_id", //$movie dersem movieleri yönetmen altında array gibi değilde her biri ayrı kayıt gibi çeker
                    preserveNullAndEmptyArrays:true  //eşleşme olmasa dahi getir. False olursa filmi olmayan yönetmenleri listelemez
                }
            }

        ])
          .then((movies)=>{res.json(movies)})
          .catch((err)=>{res.json(err.message)});


});




//UPDATE
router.put('/:directorId', (req, res, next) => {  //güncelleme id bazlı
    const directorId = req.params.directorId;

    Director.findByIdAndUpdate(directorId,req.body,{new:true}) //sadece verilen id yi bul ve güncelle
        .then((director)=>{
            if(!director)
                next({message:"The Director Was Not Found",code:99});
            else
                res.json({status:"updated",code:1});
        })
        .catch((err)=>{res.json(err.message)});

});

//DELETE
router.delete('/:directorId', (req, res, next) => {  //sadece verilen id yi bul ve sil
    const directorId = req.params.directorId;

    Director.findByIdAndRemove(directorId) //sadece verilen id yi bul ve sil
        .then((director)=>{
            if(!director)
                next({message:"The Director Was Not Found",code:99});
            else
                res.json({status:"deleted",code:1});
        })
        .catch((err)=>{res.json(err.message)});

});







module.exports = router;
