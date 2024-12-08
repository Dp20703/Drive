const express = require("express")
const app = express()
const port = 3000
const userRouter = require('./routes/user.routes');//Required the userRoutes:

app.set('view engine', 'ejs')

//user Routes:
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})