var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
/**
 * models
 */
const UserSchema = require("../models/User");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/register', function (req, res, next) {
    const {username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new UserSchema({
            username,
            password: hash
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
    });


});

router.post("/authenticate", (req, res) => {
    const {username, password} = req.body;
    UserSchema.findOne({
        username
    }, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.json({
                status: false,
                message: "oturum yok"
            });
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: "oturum yok"
                    });
                } else {
                    const payload ={
                        username
                    };
                    const token = jwt.sign(payload,req.app.get("api_secret_key"),{expiresIn:720});

                    res.json({
                        statur : true,
                        token
                    });

                }

            });
        }


    })
});

module.exports = router;
