const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');



/* Prefix with /user */
router.get('/test', (req, res) => {
    res.send("user tested")
})

//registration routes:
router.get('/register', (req, res) => {
    res.render("register")
})
router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({
            errors:errors.array(),
            message:'invalid data'
           })
        }
        else {
            console.log(req.body)
            res.send("User Regsitered Successfully")
        }

    })

module.exports = router;