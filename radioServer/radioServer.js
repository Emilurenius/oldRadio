// All external modules are loaded in:
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
//const fileUpload = require("express-fileupload");

// Reading input from terminal start
const port = parseInt(process.argv[2]) || 3000
console.log(`${port} registered as server port`)
// Reading input from terminal end

app.use(cors()) // Making sure the browser can request more data after it is loaded on the client computer.

app.get('/connectSpotify', (req, res) => {
    res.send('Connecting your playback to the radio')
    console.log('NFC scanned!')
})

app.listen(port, () => console.log(`Listening on ${port}`))