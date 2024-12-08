const express = require("express")
const app = express()
const port = 3000
const dotenv = require('dotenv');//used to store the db connection url :
dotenv.config();
const connectToDB = require("./config/db")//connection to db:
connectToDB();
const cookieParser = require("cookie-parser");//Used to store cookies:
const userRouter = require('./routes/user.routes');//Required the userRoutes:
const indexRouter = require('./routes/index.routes');//Required the indexRoutes:


app.set('view engine', 'ejs');
//built-in middlewares:
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//index Routes:
app.use('/', indexRouter)
//user Routes:
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})