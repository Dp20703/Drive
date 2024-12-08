const express = require('express');
const router = express.Router();//used to create routes:
const { body, validationResult } = require('express-validator');//import to set validation on inputs:
const userModel = require('../models/user.model');//import userModel from user.model:
const bcrypt = require('bcrypt');//Used to create hashPassword:
const jwt = require('jsonwebtoken');//Used to store token of logged user:



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
        const hashPasword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashPasword
        })
        // res.json(newUser);
        console.log("new user created\n", newUser);
        res.redirect('login');
    })

//login routes:
router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            })
        }

        const { username, password } = req.body;
        // console.log(req.body)

        const user = await userModel.findOne({ username: username });//find the same user by username
        // console.log(user.password)

        //if user is not found:
        if (!user) {
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }

        //After finding user ,match password with saved hashPassword:
        const isMatch = await bcrypt.compare(password, user.password);

        //if not password mathced:
        if (!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        //if username&password is correct:

        //twt token is used to create token:
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);

        // res.json({ token })
        res.cookie('token', token);//it is used to store token as cookie:
        res.send("logged in")
        console.log("logged in")
        // res.render('Home')
    })
module.exports = router; 