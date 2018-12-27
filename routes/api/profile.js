const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Import profile validation
const validateProfileInput = require('../../validation/profile');
// Import experience validation
const validateExperienceInput = require('../../validation/experience');

//@route GET /api/profile/test
//@desc Test profile route
//@access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "Profiles works"
    })
);

//@route GET /api/profile/all
//@desc Get all profile user
//@access Public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles for this user';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => {
            errors.noprofiles = 'There are no profiles for this user';
            res.status(404).json(errors);
        })
});

//@route GET /api/profile/handle/:handle
//@desc Get profile user by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        })
});

//@route GET /api/profile/user/:user_id
//@desc Get profile user by user_id
//@access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors)
            }

            res.json(profile);
        })
        .catch(err => {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        })
});

//@route GET /api/profile
//@desc Get current user profile
//@access Private
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const errors = {};

        Profile.findOne({
                user: req.user.id
            })
            // if you want populate other user attribute, p.e: name and avatar, you can use .populate()
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "There is no profile for this user!!";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

//@route POST /api/profile
//@desc Create or update user profile
//@access Private
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;

        // Skills - split into array
        if (typeof req.body.skills !== "undefined") {
            profileFields.skills = req.body.skills.split(",");
        }
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

        Profile.findOne({
                user: req.user.id
            })
            .then(profile => {
                if (profile) {
                    // Update
                    Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    }).then(profile => res.json(profile));
                } else {
                    // Create
                    // Check if handle exists
                    Profile.findOne({
                        handle: req.body.handle
                    }).then(profile => {
                        if (profile) {
                            errors.handle = "That handle already exists!";
                            res.status(400).json(errors);
                        }
                        // Save profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    });
                }
            });
    }
);

//@route POST /api/profile/experience
//@desc Add experience to user profile
//@access Private
router.post(
    "/experience",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateExperienceInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({
                user: req.user.id
            })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "There is no profile for this user!!";
                    return res.status(404).json(errors);
                }

                const newExperience = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                };

                //Add experience to profile
                profile.experience.unshift(newExperience);

                // Save profile
                profile.save()
                    .then(profile => res.json(profile))
                    .catch(err => res.status(404).json(err));
            })
            .catch(err => res.status(404).json(err));
    }
);

module.exports = router;