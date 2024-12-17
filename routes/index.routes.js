const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const authMiddleware = require('../middlewares/auth');


router.get('/home', authMiddleware, (req, res) => {
    res.render('home');
})
// router.post('/upload', upload.single('file'), (req, res) => {
//     res.send("file uploaded");
// })
router.post('/upload', authMiddleware, (req, res) => {
    res.send("file uploaded");
    // console.log(req.file)
})


module.exports = router;