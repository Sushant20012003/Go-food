const mongoose= require('mongoose');

const itemSchema= mongoose.Schema({});   

module.exports = mongoose.model('schemaLessModel', itemSchema, 'foodItems');    //schemaless model