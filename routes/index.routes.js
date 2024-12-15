const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');


router.get('/home', (req, res) => {
    res.render('home');
})


module.exports = router;