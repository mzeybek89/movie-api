const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type: String,
        required: [true,'{PATH} alanı zorunlu alandır'],
        unique: [true,'Bu {PATH} daha önce alınmış.']
    },
    password:{
        type: String,
        minlength:[5,'{PATH} alanı {minlength} karakterden az olamaz .']
    }
});

module.exports = mongoose.model('user',userSchema);