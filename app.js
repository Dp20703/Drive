const express = require("express")
const app = express()
const port = 3000
const dotenv = require('dotenv');//used to store the db connection url :
dotenv.config();
const connectToDB = require("./config/db")//connection to db:
connectToDB();
const userRouter = require('./routes/user.routes');//Required the userRoutes:

app.set('view engine', 'ejs');
//built-in middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Routes:
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})