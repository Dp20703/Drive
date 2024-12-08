const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');



/* Prefix with /user */
router.get('/test', (req, res) => {
    res.send("user tested")
})

//registration routes:
router.get('/register', (req, res) => {
    res.render("register")
})
router.post('/register',
    //validation:
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);//store collection of errors:
        //if errors is not empty:
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data'
            })
        }
        //if there are no errors:
        const { username, email, password } = req.body;
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: password
        })
        res.json(newUser);
        console.log("new user created\n", newUser)


        // else {
        //     console.log(req.body)
        //     res.send("User Regsitered Successfully")
        // }

    })

module.exports = router;