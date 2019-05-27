const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = new express();

// Body parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Monggose connection return a js promise
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Serve static assests if is in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  //For any frontend route, serve index file
  app.get("*", (req, res) => {
    //Send index file.
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Heroku port set process.env.PORT, default 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen in port ${port}`));
