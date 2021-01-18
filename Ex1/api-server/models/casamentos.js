var mongoose = require('mongoose')

var avalSchema = new mongoose.Schema({
    _id: String,
    date: String,
    href: String,
    ref: String,
    title: String
});

module.exports = mongoose.model('Casamento', avalSchema, 'Casamentos')