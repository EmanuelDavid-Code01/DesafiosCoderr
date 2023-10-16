const express = require('express')
const session = require('express-session')
const mongoSessions = require('./config/mongoSessions.js');
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const hbs = require('hbs')
/* ----- require routes ------- */
const login = require('./routes/login.routes.js');
const signup = require('./routes/signup.routes.js');
const home = require('./routes/home.routes.js');
const logout = require('./routes/logout.routes.js');
const admin = require('./routes/admin.routes.js');
const user = require('./routes/user.routes.js');
const cart = require('./routes/cart.routes.js');
/* ----- socket ------- */
const productos = require('./sockets/productos.socket.js');
const carrito = require('./sockets/cart.socket.js');
/* --------- middlewares -------- */
const pageNotFound = require('./middlewares/pageNotFound.middleware.js');
/* --------- app -------- */
const app = express();
/* ------ config socket ------ */
const { Server: HttpServer } = require('http')
const { Server: IOSocket } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOSocket(httpServer)
/* --------- fork  ------------ */
const { fork } = require('child_process')
/* --------- sets ------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));
hbs.registerPartials(__dirname + '/public/views/partials')
/* ------ uses ---- */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')) // ---> NGINX
app.use(express.static(__dirname + '/uploads'))
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}))
app.use(morgan('dev'))
/* ------------ passport ------------ */
const passport = require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());
/* ------------ routes -------------- */
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(admin)
app.use(user)
app.use(cart)
app.use(pageNotFound)
/* ----- socket middleware para capturar request */
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session(
    {
        secret: process.env.SESSION_SECRET || '123456',
        resave: false,
        saveUninitialized: false,
        rolling: true,                  
        cookie: {
            maxAge: 1000 * 60 * 10                     
        },
        store: mongoSessions
    }
)));
/* ----- socket escuchando las conecciones */
io.on('connection', async (socket) =>{
    console.log('A user connected');

    productos(socket, io)
    carrito(socket, io)

    socket.emit ('mensaje-servidor')
    
});
/* ----- exportamos el hhtpServer y ejecutamos la app en app.js */
module.exports = httpServer