const PORT = process.env.PORT || 8000
const path = require('path');
const express = require('express')
const cors = require('cors')
const qs = require('qs');
const axios = require('axios');
const { response } = require('express');

require('dotenv').config()

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors())

let client_id = process.env.client_id
let client_secret = process.env.client_secret

const getToken = () => {
    const options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        data: qs.stringify({ 'grant_type': 'client_credentials' })
    }

    return axios.request(options)
        .then(response => {
            return response.data['access_token']
        }).catch(
            err => {
                return err.response
            }
        )
}

app.get('/api/getPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id
    const token = await getToken()

    const options = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}?fields=id,owner,description,name,images,tracks(href,next,total)`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    axios.request(options)
        .then(response => {
            res.json(response.data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({
                message: err
            })
        })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))