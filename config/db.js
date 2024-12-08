const mongoose = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to db");
    });
}

module.exports = connectToDB;