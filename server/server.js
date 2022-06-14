const PORT = process.env.PORT || 8000
const path = require('path');
const express = require('express')
const cors = require('cors')
const qs = require('qs');
const axios = require('axios')

require('dotenv').config()

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors())

let client_id = process.env.client_id
let client_secret = process.env.client_secret

app.get('/api/getToken', (req, res) => {

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

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))