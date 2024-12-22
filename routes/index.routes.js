const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const authMiddleware = require('../middlewares/auth');
const fileModel = require('../models/files.models');
const firebase = require('../config/firebase.config')

//home route:
router.get('/home', authMiddleware, async (req, res) => {
    try {
        //get all the files uploaded by specific user:
        const userFiles = await fileModel.findOne({ user: req.user.userId })
        res.render('home', {
            // files: userFiles
            files: ['a', 'b', 'c']
        });
        console.log(req.user)
        console.log(userFiles)
        // throw ('error')
    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
        // res.send('error')
        // window.location.reload();
    }
})

//Using firebase and mongoose:
// router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
//     const newFile = await fileModel.create({
//         path: req.file.path,
//         originalname: req.file.originalname,
//         user: req.user.userId
//     })
//     res.json(newFile);.
// })
// Using mongoose:
router.post('/upload', authMiddleware, async (req, res) => {
    console.log(req.user)
    console.log(req.user.userId)
    const newFile = await fileModel.create({
        path: req.path,
        originalname: req.originalUrl,
        user: req.user.userId
    })
    res.json(newFile);
    console.log(req.path)
    console.log(req.originalUrl)
    // res.send('uploaded')/
})
//using only router:
// router.post('/upload', authMiddleware, (req, res) => {
//     res.send("file uploaded");
//     // console.log(req.file)
// })


//Route for downloading file:
// router.get('/download/:path', authMiddleware, async (req, res) => {
//     const loggedInUserId = req.user.userId;
//     const path = req.params.userId;
//     const file = await fileModel.find({
//         user: loggedInUserId,
//         path: path
//     })
//     if (!file) {
//         return res.status(401).json({
//             message: 'unauthorized',
//         })
//     }
//     const signedUrl = firebase.storage().bucket().file(path).getSignedUrl({
//         action: 'read',
//         expires: Date.now() + 60 * 1000,
//     })
//     res.redirect(signedUrl[0])
// })
router.get('/download/:path', authMiddleware, async (req, res) => {
    res.send("downloaded")

})

//Error handling:
//using Globel:
// process.on('uncaughtException', (err) => {
//     console.log('uncaughtException')
//     console.log(err);
//     process.exit(1); //used to close server:
// })


module.exports = router;