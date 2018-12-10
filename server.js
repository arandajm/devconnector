const express = require('express');

const app = new express();

app.get('/', (req, res) => {
    res.send('Hello!!!!!!!')
});

//Heroku port set process.env.PORT, default 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen in port ${port}`));