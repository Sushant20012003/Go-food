const express= require('express');
const User= require('../db/User');
const {body, validationResult}= require('express-validator');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const jwtScret= "ThisIsJwtSecretKey";

const router= express.Router();


router.post(
    '/createuser',
    //Applying validation
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({min:5}),   //we can send msg which we want as second parameter 

    async(req, res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // const userDetails= new User(req.body);
        // const result= await userDetails.save();
        // res.send(result);

        try {
            const salt= await bcrypt.genSalt(10);
        const secPassword= await bcrypt.hash(req.body.password, salt);

        const result = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location
        });

        // localStorage.setItem('email', req.body.email);
        
        const authToken= jwt.sign({result}, jwtScret, {expiresIn: '10m'});

        return res.send({success: true, authToken:authToken});
        } catch (error) {
            console.log(error);
            res.send({success:false})
        }

});

module.exports= router;

//we can also use app insted of 'router' where, const app = express();