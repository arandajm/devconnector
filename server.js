const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = new express();

// Body parser Middleware    
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// DB Config 
const db = require('./config/keys').mongoURI;

// Monggose connection return a js promise 
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello!!!!!!!')
});

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Heroku port set process.env.PORT, default 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen in port ${port}`));