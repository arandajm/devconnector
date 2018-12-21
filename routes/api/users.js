const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Import register validation
const validateRegisterInput = require('../../validation/register');
// Import login validation
const validateLoginInput = require('../../validation/login');

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
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        res.status(400).json(errors)
    }

    // Check if user with email exists
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists!!';
                return res.status(400).json(errors);
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

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // Check if user with email exists
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                errors.email = 'User not found!';
                return res.status(404).json(errors);
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
                    errors.email = 'Password incorrect!!';
                    return res.status(400).json(errors);
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