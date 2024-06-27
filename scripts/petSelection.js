'use strict';

const {elements, player, enemy, attacks} = require('./globals');
const {initiateBattlefield} = require('./battlefield');

function renderPokemonToChoose(mokeponIndex){
    elements.characterImg.src = mokepons[mokeponIndex].img;
    elements.characterTitle.innerText = mokepons[mokeponIndex].name;
    elements.characterType.innerText = findIcons(mokepons[mokeponIndex]);
}

function selectPet(e, currentPokemonIndex) {
    e.preventDefault();
    player.pet = mokepons[currentPokemonIndex];
    enemy.pet = selectRandomMokepon();
    initiateBattlefield();
}

function selectRandomMokepon() {
    return mokepons[getRandomInt(0, mokepons.length - 1)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {renderPokemonToChoose, selectPet};
