//imports
const express = require('express');
//turns .env file into javascript stuff
require('dotenv').config()
const bodyParser = require('body-parser') //allows you to pull information of the request body
const session = require('express-session')
const checkSession = require('./middlewares/checkForSessions')
const swagCtrl = require('./controllers.js/swag_controller')
const authCtrl = require('./controllers.js/auth_controller')
const cartCtrl = require('./controllers.js/cart_controller')
const searchCtrl = require('./controllers.js/search_controller')

const app = express()

//middleware(top level), runs one every endpoint
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(checkSession)
app.use( express.static( `${__dirname}/../build` ) );

//endpoints
app.get(`/api/swag`, swagCtrl.read)
app.post(`/api/login`, authCtrl.login)
app.post(`/api/register`, authCtrl.register)
app.post(`/api/signout`, authCtrl.signout)
app.get(`/api/user`, authCtrl.getUser)
app.post(`/api/cart`, cartCtrl.add)
app.post(`/api/cart/checkout`, cartCtrl.checkout)
app.delete(`/api/cart`, cartCtrl.delete)
app.get(`/api/search`, searchCtrl.search)


const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`Firing up at port:${PORT}`))