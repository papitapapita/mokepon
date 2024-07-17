'use strict';
// GLOBALS

class Mokepon{
    constructor(name, type, img, attacks){
        this.name = name;
        this.type = type;
        this.img = img;
        this.attacks = attacks;
    }
}

class Attack{
    constructor(id, name, type, icon, available){
        this.id = id;
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.available = available;
    }
}

class GameCharacter{
    constructor(pet, attack, icons, result){
        this.pet = pet;
        this.attack = attack;
        this.score = 0;
        this.icons = icons;
        this.result = result;
    }
}

// Constants for HTML elements
const elements = {
    selectBtn: document.querySelector('#select-btn'),
    selectedPet: document.querySelector('#selected-pet'),
    selectPetSection: document.querySelector('#select-pet'),
    enemyPet: document.querySelector("#enemy-pet"),
    buttonsContainer: document.querySelector("#buttons-container"),
    attackBtns: document.querySelectorAll(".battlefield__attack-btn"),
    matchResultContainer: document.querySelector("#match-result"),
    restartMatchBtn: document.querySelector("#restart-btn"),
    selectAttackContainer: document.querySelector('#select-attack'),
    characterImg: document.querySelector('#character-img'),
    selectedCharacterImg: document.querySelector('#selected-character-img'),
    enemyCharacterImg: document.querySelector('#enemy-character-img'),
    characterTitle: document.querySelector('#character-title'),
    selectedCharacterTitle: document.querySelector('#selected-character-title'),
    enemyCharacterTitle: document.querySelector('#enemy-character-title'),
    characterType: document.querySelector('#character-type'),
    selectLeftBtn: document.querySelector('#select-left-btn'),
    selectRightBtn: document.querySelector('#select-right-btn'),
    playerScore: document.querySelector('#player-score'),
    enemyScore: document.querySelector('#enemy-score'),
    enemyAttackResult: document.querySelector('#enemy-attack-result'),
    playerAttackResult: document.querySelector('#player-attack-result'),
    battlefieldSection: document.querySelector('#battlefield')
};

// Variables
let currentPokemonIndex, selectedIcons, player, enemy, round;

const attacks = [
    
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'grass', icon: '🌱' },
];

const mokepons = [
    new Mokepon('Charmander', ['fire'],'img/charmander.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Vulpix', ['fire'], 'img/vulpix.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'water', 'water', '💧', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Scovillain', ['fire', 'grass'], 'img/scovillain.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'grass', 'grass', '🌱', true), new Attack(4, 'grass', 'grass', '🌱', true), new Attack(5, 'water', 'water', '💧', true)]),
    new Mokepon('Squirtle', ['water'], 'img/squirtle.png', [new Attack(1, 'water', 'water', '💧', true), new Attack(2, 'water', 'water', '💧', true), new Attack(3, 'water', 'water', '💧', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Psyduck', ['water'], 'img/psyduck.png', [new Attack(1, 'water', 'water', '💧', true), new Attack(2, 'water', 'water', '💧', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'grass', 'grass', '🌱', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Volcanion', ['water', 'fire'], 'img/volcanion.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'water', 'water', '💧', true)]),
    new Mokepon('Bulbasaur', ['grass'], 'img/bulbasaur.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Bellsprout', ['grass'], 'img/bellsprout.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
    new Mokepon('Lotad', ['water', 'grass'], 'img/lotad.png', [new Attack(1, 'fire', 'fire', '🔥', true), new Attack(2, 'fire', 'fire', '🔥', true), new Attack(3, 'fire', 'fire', '🔥', true), new Attack(4, 'water', 'water', '💧', true), new Attack(5, 'grass', 'grass', '🌱', true)]),
]


const winRules = {
    'water': 'fire',
    'grass': 'water',
    'fire': 'grass',
};

const resultColors = {
    'red':'#DD8B59',
    'green':'#9CD24E',
    'grey':'#FBFBF9'
}

//------------------------------------//
//---------- PET SELECTION -----------//
//-----------------------------------//

function renderPokemonToChoose(mokeponIndex){
    elements.characterImg.src = mokepons[mokeponIndex].img;
    elements.characterTitle.innerText = mokepons[mokeponIndex].name;
    selectedIcons =  findIcons(mokepons[mokeponIndex]);
    elements.characterType.innerText = selectedIcons;
}

//Find the type icon for each pet
function findIcons(pet){
    return pet ? pet.type.map(type => attacks.find(attack => attack.name === type).icon).join('') : '';
}

// Event listener for selecting a pet
function selectPet(e) {
    e.preventDefault();
    player.pet = mokepons[currentPokemonIndex];
    enemy.pet = selectRandomMokepon();
    initiateBattlefield();
}

// Function to select a random Mokepon
function selectRandomMokepon() {
    return mokepons[getRandomInt(0, mokepons.length - 1)];
}

// Function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ------------------------------------//
// ------------ BATTLEFIELD -----------//
// ------------------------------------//


function initiateBattlefield(){
    clearAttackResult();
    settleBattle();
    //enableAttackButtons();
    round = 1;
}

function clearAttackResult() {
    elements.enemyAttackResult.innerHTML = '';
    elements.playerAttackResult.innerHTML = '';
}

function settleBattle(){
    player.icons = selectedIcons;
    enemy.icons = findIcons(enemy.pet);
    elements.selectPetSection.style.display = 'none';
    renderBattlefield();
}

// Enables attack buttons
function enableAttackButtons() {
    elements.attackBtns = document.querySelectorAll('.battlefield__attack-btn');
    elements.attackBtns.forEach(element => {
        element.style.display = player.pet ? 'inline-block' : 'none';
        element.removeAttribute('disabled');
    });
}

//Render the UI elements
function renderBattlefield(){
    elements.battlefieldSection.style.display = 'block'
    elements.selectedCharacterTitle.innerText = `${player.icons} ${player.pet.name} ${player.icons}`;
    //elements.selectedCharacterImg.src = mokepons.find(mokepon => mokepon.name === player.pet.name).img;
    elements.selectedCharacterImg.src = player.pet.img;

    elements.enemyCharacterTitle.innerText = `${enemy.icons} ${enemy.pet.name} ${enemy.icons}`;
    //elements.enemyCharacterImg.src = mokepons.find(mokepon => mokepon.name === enemy.pet.name).img;
    elements.enemyCharacterImg.src = enemy.pet.img;

    renderButtons();
    renderScore();
}

function renderButtons(){
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    buttonsContainer.className = 'battlefield--user-attacks-container';
    for(const attack of player.pet.attacks){
        const button = document.createElement('button');
        button.value = attack.id;
        button.className = 'battlefield__attack-btn';
        button.innerText = `${attack.icon} ${attack.name} ${attack.icon}`;
        buttonsContainer.appendChild(button);
    }
    elements.buttonsContainer.innerHTML = buttonsContainer.innerHTML;
}

/*
function renderLives(){
    elements.playerLives.innerText = renderScore(player.lives);
    elements.enemyLives.innerText = renderScore(enemy.lives);
}*/

//Counts lives with heart emojis
/*function livesCounter(counter){
    return '❤️'.repeat(counter);
}*/


// Event listener for selecting an attack type
function attackType(e) {
    debugger
    e.preventDefault()
    if (e.target.tagName === 'BUTTON') {
        player.attack = player.pet.attacks.find(attack => attack.id == e.target.value);
        randomEnemyAttack();
        startBattle();
        e.target.disabled = true;
    }
}

// Handles the battle logic
function startBattle() {
    if (winRules[player.attack.name] === enemy.attack.name) {
        player.result = 'green';
        enemy.result = 'red'
        player.score++;
        //enemy.lives--;
    } else if (player.attack.name === enemy.attack.name) {
        player.result = 'grey';
        enemy.result = 'grey'
    } else {
        player.result = 'red';
        enemy.result = 'green'
        enemy.score++;
        //player.lives--;
    }

    showResult();
    //renderLives();
    disableUsedAttack(player);
    disableUsedAttack(enemy);
    evaluateResult();
    
}

function endMatch(){
    elements.attackBtns = document.querySelectorAll(".battlefield__attack-btn")
    elements.attackBtns.forEach(element => element.setAttribute('disabled', ''));
    elements.restartMatchBtn.style.display = 'inline-block';
    player.pet.attacks.forEach(attack => attack.available = true);
}

function disableUsedAttack(gameCharacter){
    if(gameCharacter.pet){
        let attacks = gameCharacter.pet.attacks;
        let selectedAttack = attacks.find(attack => attack.id == gameCharacter.attack.id);
        //Set availability of the attack to false
        selectedAttack.available = false;
    }
}

function evaluateResult(){
    if(enemy.score === 3 || player.score === 3 || round === 5){
        let matchResult = "";
        if(enemy.score > player.score){
            matchResult = 'Perdiste la batalla!';
        }else if(enemy.score < player.score){
            matchResult = 'Ganaste la batalla!';
        }else{
            matchResult = 'Empate!';
        }
        elements.matchResultContainer.innerHTML = `<p>${matchResult}</p>`;
        endMatch();
        return;
    }
    round++;
}

function enableAttacks(gameCharacter){

}

function renderScore(){
    elements.playerScore.innerText = player.score;
    elements.enemyScore.innerText = enemy.score;
}

// Displays the battle result
function showResult() {
    let playerAttackContainer = document.createElement('p');
    let enemyAttackContainer = document.createElement('p');
    playerAttackContainer.innerText = `${player.attack.name} ${player.attack.icon}`;
    enemyAttackContainer.innerText = `${enemy.attack.name} ${enemy.attack.icon}`;
    playerAttackContainer.style.backgroundColor = resultColors[player.result];
    enemyAttackContainer.style.backgroundColor = resultColors[enemy.result];
    elements.enemyAttackResult.appendChild(enemyAttackContainer);
    elements.playerAttackResult.appendChild(playerAttackContainer);
    renderScore();
}

// Randomly select an attack
function randomEnemyAttack() {
    do{
        enemy.attack = enemy.pet.attacks[getRandomInt(0, enemy.pet.attacks.length - 1)];
    }while(!enemy.attack.available)
}


// ------------------------------------//
// --------------- MAIN ---------------//
// ------------------------------------//

function startGame(){
    debugger;
    player = new GameCharacter();
    enemy = new GameCharacter();
    currentPokemonIndex = 0;

    elements.matchResultContainer.innerHTML = '';
    elements.buttonsContainer.innerHTML = '';
    elements.restartMatchBtn.style.display = 'none';
    elements.battlefieldSection.style.display = 'none';
    elements.selectPetSection.style.display = 'block';

    renderPokemonToChoose(currentPokemonIndex);
}

elements.selectBtn.addEventListener('click', (e) => {
    debugger
    selectPet(e, currentPokemonIndex);
});
elements.buttonsContainer.addEventListener('click', attackType);
elements.restartMatchBtn.addEventListener('click', startGame);
elements.selectLeftBtn.addEventListener('click', (e) => {
    debugger
    e.preventDefault();
    if(currentPokemonIndex > 0){
        renderPokemonToChoose(--currentPokemonIndex);
    }
});
elements.selectRightBtn.addEventListener('click', (e) => {
    debugger
    e.preventDefault();
    if(currentPokemonIndex < mokepons.length-1){
        renderPokemonToChoose(++currentPokemonIndex);
    }
});


//Initialization
startGame();
