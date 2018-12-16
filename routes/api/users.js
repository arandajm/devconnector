const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//@route GET /api/users/test
//@desc Test user route
//@access Public
router.get('/test', (req, res) => res.json({
    msg: 'Users works'
}));


//@route POST /api/users/register
//@desc Register user route
//@access Public
router.post('/register', (req, res) => {
    console.log('Entro!!!');
    // Check if user with email exists
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists!!'
            })
        } else {
            // Get avatar with Gravatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
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
                    if (err) throw err
                    newUser.password = hash;
                    // Save New User
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    }).catch(err => console.log(err));
});


//@route POST /api/users/login
//@desc Login user route
//@access Public

router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Check if user with email exists
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: 'User not found!'
                });
            }
            // If exists, compare the passwords with bcrypt 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // If the passwords match, login is successsfully
                    if (isMatch) {
                        res.json({
                            msg: 'Success login!'
                        })
                    } else {
                        // in other case, return a error msg
                        return res.status(400).json({
                            password: 'Password incorrect!'
                        })
                    }
                })
        })
        .catch(err => console.log(err));
});
module.exports = router;