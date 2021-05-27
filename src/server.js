require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

app.post("/getToken", (req, res) => {
    const REDIRECT_URI = req.body.redirect_uri;
    const AUTH_CODE = req.body.code;
    const TOKEN_REQUEST_BODY = {
        grant_type: "authorization_code",
        code: AUTH_CODE,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }

    fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.entries(TOKEN_REQUEST_BODY).map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(value)).join("&")
    }).then(resp => resp.json())
        .then(data => res.send({ ...data, ...{ status: "success" } }))
        .catch(err => {
            console.log("[error]: ", err);
            res.send({ ...data, ...{ status: "error" } })
        })
})

app.post('/refreshToken', (req, res) => {
    const REFRESH_TOKEN = req.body.refresh_token;

    const REFRESH_TOKEN_BODY = {
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
    };

    // base64 string of CLIENT_ID:CLIENT_SECRET
    const buf = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET, "utf-8");
    const ENCODED_AUTH_HEADER = buf.toString("base64");

    fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${ENCODED_AUTH_HEADER}`
        },
        body: Object.entries(REFRESH_TOKEN_BODY).map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(value)).join("&")
    }).then(resp => resp.json())
        .then(data => res.send({ ...data, ...{ status: "success" } }))
        .catch(err => {
            console.log(err)
            res.send({...data, ...{status: "error"}})
        })

})

app.get("/monitor", (req, res) => res.send("Server up and running"))
app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))