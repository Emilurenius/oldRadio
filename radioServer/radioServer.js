// All external modules are loaded in:
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const SpotifyWebAPI = require('spotify-web-api-node');
//const fileUpload = require("express-fileupload");

const scopes = ['user-read-playback-state', 'user-modify-playback-state']
const clientData = loadJSON("/spotifyClientData.json")
let accessData = {
    'access_token': '',
    'refresh_token': ''
}

function loadJSON(filename) {
    const rawdata = fs.readFileSync(path.join(__dirname, filename))
    const data = JSON.parse(rawdata)
    return data
}

function saveJSON(json, filename) {
    const stringified = JSON.stringify(json, null, 4)
    fs.writeFile(path.join(__dirname, filename), stringified, (err) => {
        if (err) throw err
        console.log("Data written to file")
    })
}

function refreshAccessToken(client) {

    console.log(client)

    client.refreshAccessToken().then(
        (data) => { 
            console.log("Access token refreshed")

            client.setAccessToken(data.body["access_token"])
        },
        (err) => {
            console.log("Could not refresh access token", err)
        }
    )
}

function createClient(clientData) {
    return new SpotifyWebAPI({
        clientId: clientData.clientID,
        clientSecret: clientData.clientSecret,
        redirectUri: clientData.loginRedirect
    })
}

const spotifyAPI = createClient(clientData)

// Reading input from terminal start
const port = parseInt(process.argv[2]) || 3000
console.log(`${port} registered as server port`)
// Reading input from terminal end

app.use(cors()) // Making sure the browser can request more data after it is loaded on the client computer.

app.get('/connectSpotify', (req, res) => {
    const authorizeURL = spotifyAPI.createAuthorizeURL(scopes, null, true)
    res.redirect(`${authorizeURL}`)
    console.log('NFC scanned!')
})

app.get('/spotifyConnected', (req, res) => {
    const auth = req.query.code

    spotifyAPI.authorizationCodeGrant(auth)
    .then((data) => {
        console.log(data)
        accessData.access_token = data.body.access_token
        accessData.refresh_token = data.body.refresh_token
        res.redirect('/movePlayBack')
    }, (err) => {
        console.log('Something went wrong while retrieving acces token')
        res.send('Something went wrong while retrieving acces token')
    })
})

app.get('/movePlayBack', (req, res) => {
    const client = createClient(clientData)
    client.setAccessToken(accessData.access_token)
    client.getMyDevices()
    .then ((data) => {
        console.log(data.body)
        res.send(data.body)
    }, (err) => {
        console.error(err)
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))