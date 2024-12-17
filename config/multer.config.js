const multer = require('multer');
const firebaseStorage = require("multer-firebase-storage");
const serviceAccount = require('../drive-72bec-firebase-adminsdk-x8j3a-ca7d900764.json');
const Firebase = require('./firebase.config');

const storage = firebaseStorage({
    credentials: Firebase.credential.cert(serviceAccount),
    bucketName: 'name',
    unique: true
})

const upload = multer({
    storage: storage,
})

module.exports = upload;

