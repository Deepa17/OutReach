const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {check, validationResult} = require("express-validator");
const config = require('config');

//include User file
const User  =  require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post(
    '/',
    [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@,_]).{8,}$/)
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try{
            //see if the user exists
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({ errors:[{ msg:"User already exists" }] });
            }

        //get user's gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r :'pg',
                d : 'mm' //default value of the gravatar
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });

        
            //encrypt password using bcrypt
            const salt = await bcrypt.genSalt(10);
           
            user.password = await bcrypt.hash(password, salt);
         
            await user.save(); //anything that returns a promise must be preceded by await

            //return jsonwebtoken

            const payload = {
                user:{
                    id : user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn:360000 },
                (err, token)=>{
                    if(err) throw err;
                    res.json({token});
                }
            );

        }   catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
);


module.exports = router;
