var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
var dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
require('../db/conn');
const User = require('../model/userSchema');
const authentication = require('../middleware/authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("server router  js");
    // res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
    var { firstName, lastName, birthdayDate, emailAddress, phoneNumber, Address, pasword, cpasword } = req.body;
    // console.log(req.body);
    if (!firstName || !lastName || !birthdayDate || !emailAddress || !phoneNumber || !Address || !pasword || !cpasword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    User.findOne({ emailAddress: emailAddress })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "emailAddress already Exist" });
            } else if (pasword != cpasword) {
                return res.status(422).json({ error: "password not matched" });
            } else {
                const user = new User({ firstName, lastName, birthdayDate, emailAddress, phoneNumber, Address, pasword, cpasword });

                user.save().then(() => {
                    res.status(200).json({ message: "User Registered successfully" });
                }).catch((err) => {
                    res.status(500).json({ message: "Failed to Registered " });
                })
            }
        }).catch(err => {
            console.log(err);
        });
});



//login route
router.post('/signin', async(req, res) => {
    try {
        let token;
        const { emailAddress, pasword } = req.body;
        // console.log(req.body);
        if (!emailAddress || !pasword) {
            return res.status(400).json({ error: " Plz Filled the data " })
        }
        const userLogin = await User.findOne({ emailAddress: emailAddress });

        if (userLogin) {
            const isMatch = await bcrypt.compare(pasword, userLogin.pasword);
            token = await userLogin.generateAuthToken();
            // console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials pass" });
            } else {
                res.json({ message: " user Signin Successfully " });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }
    } catch (err) {
        console.log(err);
    }
});
router.get('/about', authentication, (req, res, next) => {
    res.send(req.rootUser);
})
module.exports = router;