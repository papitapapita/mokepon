class GameCharacter{
    constructor(id, pet){
        this.id = id;
        this.pet = pet;
        this.position = {
            x: 0,
            y: 0
        };
    }
}

class Mokepon{
    constructor(name){
        this.name = name;
    }
}

const playersList = [];

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/join", (req, res) => {
    const player = new GameCharacter(`${Math.floor(Math.random() * 100)}`);
    playersList.push(player);
    res.send(player.id);
});

app.get("/players", (req, res) => {
    console.log(playersList);
    res.send(JSON.stringify(playersList));
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || "";
    const mokeponData = req.body.mokepon || "";
    //const mokepon = new Mokepon(mokeponData.name);
    const playerIndex = playersList.findIndex(player => player.id == playerId);
    if(playerIndex >= 0){
        playersList[playerIndex].pet = mokeponData;
    }
    res.end();
});

app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || "";
    const playerIndex = playersList.findIndex(player => player.id == playerId);
    if(playerIndex >= 0){
        const position = {x: req.body.x, y: req.body.y} || {};
        playersList[playerIndex].position = position;
    }
    res.end();
});


app.listen(5002, () => {
    console.log('Server Working');
});