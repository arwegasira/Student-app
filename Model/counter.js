
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    name: {
        type: String,
        required: true,
},
    value: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('counter',counterSchema);