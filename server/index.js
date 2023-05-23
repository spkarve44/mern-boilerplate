const express = require("express");
const axios = require("axios");
var cors = require("cors");

const CLIENT_ID = "5974fefed1b80dfa0dc5";
const CLIENT_SECRET = "ef6554b97bae2fa5f5a5c9ec66ddf6dc930951a8";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
    console.log(req.query.code);
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        console.log(JSON.stringify(response.data));
        res.redirect(
            `http://localhost:3000?access_token=${response.data.access_token}`
        );
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
