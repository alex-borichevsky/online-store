const express = require("express");
const {response} = require("express");
const itemRouter = require('./routes/items');
const marketRouter = require('./routes/market');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo');


require('./strategies/local');

mongoose
    .connect('mongodb://localhost:27017/expressjs_db')
    .then(() => {
        console.log("connected to db")
    })
    .catch((err) => console.log(err));

const app = express();
const PORT = 3001;



app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/expressjs_db',
    }),
    secret: 'aljdbalbedlabdjlkdjebla',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(req.url);
    next();
})


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/market', marketRouter);



app.listen(PORT, () => console.log("running on port: " + PORT));
