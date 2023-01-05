const fs = require('fs')
const express = require('express')
const app = express()
const port = 357

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/html/home.html');
})

app.use('/assets', express.static(__dirname + '/assets/'))

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/html/404.html');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

module.exports = app;