const express = require('express');
const app = express();

app.get("/join", (req, res) => {
    const playerId = `${Math.random()}`;
    res.setHeader('Access-Control-Allow-Origin', '*' )
    res.send(playerId);
})

app.listen(5002, () => {
    console.log('Server Working');
})