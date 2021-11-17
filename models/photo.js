const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = new Schema ({
    image: String
});

module.exports = mongoose.model('photo', PhotoSchema)