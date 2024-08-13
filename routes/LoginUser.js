const express= require('express');
const User= require('../db/User');
const router = express.Router();
const {body, validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const jwtScret= "ThisIsJwtSecretKey";

router.post(
    '/loginuser',

    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({min:5}) ,
    
    async(req, res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            let email= req.body.email;
            let userData= await User.findOne({email})
            console.log(userData);
            

            if(!userData) {
                return res.status(400).send({errors: "Try loggin with correct credentials"})
            }

            const pwdCompare= await bcrypt.compare(req.body.password, userData.password);
            if(!pwdCompare) {
                return res.status(400).send({errors: "Please use correct password"})
            }

            const data= {
                user:{
                    id:userData.id
                }
            }
            const authToken= jwt.sign(data, jwtScret, {expiresIn:'10m'});

            return res.send({success: true, authToken:authToken});

        } catch (error) {
            console.log(error);
            res.send({success: false})
        }
    
})

module.exports = router;