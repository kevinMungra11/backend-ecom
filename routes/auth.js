// Import modules
const express = require('express');
const router = express.Router();
const { check , validationResult } = require('express-validator');
const { signout,signup,signin,isSignedIn }= require('../controller/auth');

// Routing Requests

router.get('/signout',signout);

router.get('/testroute',isSignedIn, (req,res) => {res.send("A Protected Route")});

router.post('/signup',
    [ 
        check("name","name should be at least 3 char").isLength({ min : 3}),
        check("email","email is required").isEmail(),
        check("password","password should be at least 3 char").isLength({ min : 3})
    ] 
, signup);

router.post('/signin',
    [ 
        check("email","email is required").isEmail(),
        check("password","password filled is required").isLength({ min : 3})
    ] 
, signin);

// Export router
module.exports = router;