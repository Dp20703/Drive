const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-72bec-firebase-adminsdk-x8j3a-ca7d900764.json');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    // storageBucket:"bucketid from storage section"
})


module.exports = Firebase;