const mongoose= require('mongoose');

const orderSchema= mongoose.Schema({
    email:{type:String, require:true, unique:true},
    order_data: {type:Array, require:true}
})

module.exports = mongoose.model('Order', orderSchema, 'orders');