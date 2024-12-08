const express = require('express');
const router = express.Router();



/* Prefix with /user */
router.get('/test', (req, res) => {
    res.send("user tested")
})

//registration routes:
router.get('/register', (req, res) => {
    res.render("register")
})
router.post('/register', (req, res) => {
    console.log(req.body)
    res.send("User Regsitered Successfully")
})

module.exports = router;