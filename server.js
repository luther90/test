const express = require("express");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const articlesRoutes = require('./routes/articles.routes')
require("dotenv").config({ path: "./config/.env" });
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//JWT
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('', userRoutes)
app.use('/articles', articlesRoutes)


//Server
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est lancé sur le PORT ${process.env.PORT}`);
});
