const PORT = 8000

const express = require('express')
const cors = require('cors')
const qs = require('qs');
const axios = require('axios')

require('dotenv').config()

const app = express()
let client_id = process.env.client_id
let client_secret = process.env.client_secret

app.use(cors())

app.get('/getToken', (req, res) => {

    const options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        data: qs.stringify({ 'grant_type': 'client_credentials' })
    }
    axios.request(options)
        .then(response => res.json(response.data))
        .catch(err => res.json(err))

})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))