import GameCharacter from './public/scripts/models/GameCharacter.js';
import Mokepon from './model/Mokepon.js';
import express from 'express';
import cors from 'cors';
import path from 'node:path';

const __dirname = import.meta.dirname;
const app = express();
const playersList = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

app.get('/join', (req, res) => {
  const player = new GameCharacter(
    `${Math.floor(Math.random() * 100)}`
  );
  playersList.push(player);
  res.send(player.id);
});

app.get('/players', (req, res) => {
  console.log(playersList);
  res.send(JSON.stringify(playersList));
});

app.post('/mokepon/:playerId', (req, res) => {
  const playerId = req.params.playerId || '';
  const mokeponData = req.body.mokepon || '';
  //const mokepon = new Mokepon(mokeponData.name);
  const playerIndex = playersList.findIndex(
    (player) => player.id == playerId
  );
  if (playerIndex >= 0) {
    playersList[playerIndex].pet = mokeponData;
  }
  res.end();
});

app.post('/mokepon/:playerId/position', (req, res) => {
  const playerId = req.params.playerId || '';
  const playerIndex = playersList.findIndex(
    (player) => player.id == playerId
  );
  if (playerIndex >= 0) {
    const position = { x: req.body.x, y: req.body.y } || {};
    playersList[playerIndex].position = position;
  }
  res.end();
});

app.listen(5002, () => {
  console.log('Server Working');
});
