const express= require('express');
const Order= require('../db/Orders');

const router= express.Router();

router.post('/orderdata', async(req,res)=>{
    let user= await Order.findOne({email: req.body.email});
    let data = req.body.order_data;
    data.splice(0,0, req.body.order_date);

    if (user === null) {
        try {
            let result = await Order.create({
                email:req.body.email,
                order_data: [data]           //order data is array which contains all array of orders
            });
            res.send({success:true});
        } catch (error) {
            res.send('Server error', error.message);
        }
    }
    else {
        try {
            let result = await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data: data}});
            res.send({success:true})
        } catch (error) {
            res.send('Server error', error.message);
        }
    }
})


router.post('/myorderdata', async(req, res)=>{
    try {
        let data= await Order.findOne({email:req.body.email});
        if(data) {
            res.json({orderData:data ,success:true});
        }
        else res.json({success:false})
    } catch (error) {
        console.log(error.message);
    }
});


module.exports= router;