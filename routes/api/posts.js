const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Import post validation
const validatePostInput = require("../../validation/post");

//@route GET /api/posts/test
//@desc Test post route
//@access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Posts works"
  })
);

//@route POST /api/posts
//@desc Create a new post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    // Save the new post
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err =>
        res.status(400).json({
          err: err
        })
      );
  }
);

//@route GET /api/posts
//@desc Get all posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        nopostsfound: "No posts found!"
      })
    );
});

//@route GET /api/posts/:id
//@desc Get post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        nopostfound: "No post found!"
      })
    );
});

//@route DELETE /api/posts/:id
//@desc Delete post by id
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({
                noauthorized: "User not authorized!"
              });
            }
            // Remove post
            post
              .remove()
              .then(() =>
                res.json({
                  success: true
                })
              )
              .catch(err =>
                res.status(404).json({
                  nopostfound: "Post not found!"
                })
              );
          })
          .catch();
      })
      .catch(err =>
        res.status(404).json({
          noprofilefound: "Profile not found!"
        })
      );
  }
);

//@route POST /api/posts/like/:id
//@desc Like a post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          // Check for liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(400).json({
              alreadyliked: "User already liked this post!"
            });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          // Save liked post
          post.save().then(post => res.json(post));
        });
      })
      .catch(err =>
        res.status(404).json({
          noprofilefound: "Profile not found!"
        })
      );
  }
);

//@route POST /api/posts/unlike/:id
//@desc Unlike a post
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          // Check for liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(400).json({
              notliked: "You have not yet liked this post!"
            });
          }

          // get user id index to remove
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          // Splice like by index
          post.likes.splice(removeIndex, 1);

          // Save liked post
          post.save().then(post => res.json(post));
        });
      })
      .catch(err =>
        res.status(404).json({
          noprofilefound: "Profile not found!"
        })
      );
  }
);

//@route POST /api/posts/comment/:id
//@desc Add comment to a post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add comment to the post
        post.comments.unshift(newComment);

        // Save post
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({
          nopostfound: "Post not found!"
        })
      );
  }
);

//@route DELETE /api/posts/comment/:id/:comment_id
//@desc Delete comment from post
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ commentnotexists: "This comment does not exists!!" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(comment => comment.user.toString())
          .indexOf(req.params.comment_id);

        // Splice comment from post
        post.comments.splice(removeIndex, 1);

        // Save post
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({
          nopostfound: "Post not found!"
        })
      );
  }
);

module.exports = router;
