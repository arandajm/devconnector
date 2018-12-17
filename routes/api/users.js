const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//@route GET /api/users/test
//@desc Test user route
//@access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "Users works"
    })
);

//@route POST /api/users/register
//@desc Register user route
//@access Public
router.post("/register", (req, res) => {
    console.log("Entro!!!");
    // Check if user with email exists
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists!!"
                });
            } else {
                // Get avatar with Gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });

                // Create new Resource
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                // Hash password with bcryptjs
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        // Save New User
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log(err));
});

//@route POST /api/users/login
//@desc Login user route
//@access Public

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if user with email exists
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "User not found!"
                });
            }
            // If user exists, check the passwords with bcrypt
            bcrypt.compare(password, user.password).then(isMatch => {
                // If the passwords match
                if (isMatch) {
                    // Create JWT payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    // Use jsonwebtoken to create token
                    jwt.sign(
                        payload,
                        keys.secretOrKey, {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                } else {
                    // If the password is wrong, return a error msg
                    return res.status(400).json({
                        password: "Password incorrect!"
                    });
                }
            });
        })
        .catch(err => console.log(err));
});

//@route GET /api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        msg: 'Success!!!'
    });
})

module.exports = router;