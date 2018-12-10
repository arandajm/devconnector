const express = require('express');
const mongoose = require('mongoose');

const app = new express();

// DB Config 
const db = require('./config/keys').mongoURI;

// Monggose connection return a js promise 
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello!!!!!!!')
});

//Heroku port set process.env.PORT, default 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen in port ${port}`));