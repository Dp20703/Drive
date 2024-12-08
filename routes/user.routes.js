const express = require('express');
const router = express.Router();

/* Prefix with /user */
router.get('/test', (req, res) => {
    res.send("user tested")
})


module.exports = router;