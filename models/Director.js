const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name:{
        type: String,
        required: [true,"{PATH} alanı Zorunludur."]
    },
    surname:{
        type: String,
        required: [true,"{PATH} alanı Zorunludur."]
    },
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('director', DirectorSchema);
