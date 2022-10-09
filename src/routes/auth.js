const {Router}  =require('express');
const User = require('../database/schemas/User');
const router = Router();
const {hashPassword, comparePasswords} = require('../utils/helper');
const passport = require('passport');
const {authRegisterController} = require("../controllers/auth");


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged in');
    res.send(200);
})

router.post('/register', authRegisterController);

module.exports = router;