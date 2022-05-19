// All external modules are loaded in:
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const SpotifyWebAPI = require('spotify-web-api-node');
//const fileUpload = require("express-fileupload");

const scopes = ['user-read-playback-state', 'user-modify-playback-state']
const clientData = loadJSON("/spotifyClientData.json")
let clients = {
    sessions: {},
    slaves: {}
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
        res.cookie('access_token', data.body.access_token, { maxAge: 86400000, httpOnly: false })
        res.cookie('refresh_token', data.body.refresh_token, { maxAge: 86400000, httpOnly: false })
        res.send('Music should now start playing from the radio')
    }, (err) => {
        console.log('Something went wrong while retrieving acces token')
        res.send('Something went wrong while retrieving acces token')
    })
})

app.listen(port, () => console.log(`Listening on ${port}`))