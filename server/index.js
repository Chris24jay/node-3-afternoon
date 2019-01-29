const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const session = require('express-session')
const checkSession = require('./middlewares/checkForSessions')
const swagCtrl = require('./controllers.js/swag_controller')
const authCtrl = require('./controllers.js/auth_controller')

const app = express()

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(checkSession)

//endpoints
app.get(`/api/swag`, swagCtrl.read)
app.post(`/api/login`, authCtrl.login)
app.post(`/api/register`, authCtrl.register)
app.post(`/api/signout`, authCtrl.signout)
app.get(`/api/user`, authCtrl.getUser)


const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`Firing up at port:${PORT}`))