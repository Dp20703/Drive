const { original } = require('@reduxjs/toolkit');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, "Path is required"]
    },
    originalname: {
        type: String,
        required: [true, "Originalname is required"]
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User is required"]
    }
})
const file = mongoose.model('file', fileSchema);
module.exports = file;