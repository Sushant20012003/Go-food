const mongoose= require('mongoose');

const foodCatSchema= mongoose.Schema({});

module.exports= mongoose.model('FoodCat', foodCatSchema, 'foodCategory');