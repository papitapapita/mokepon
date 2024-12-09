'use strict';
// GLOBALS

class Mokepon{
    constructor(name, type, imgSrc, attacks){
        this.name = name;
        this.type = type;
        this.image = new Image();
        this.image.src = imgSrc; 
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
        this.id = 0;
        this.pet = pet;
        this.attack = attack;
        this.score = 0;
        this.icons = icons;
        this.result = result;
        this.petPosition = {
            x: 20,
            y: 30,
            height: 80,
            width: 80,
            speed: 5,
        };
        this.limits = {
            top: this.petPosition.y,
            bottom: this.petPosition.y + this.petPosition.height,
            right: this.petPosition.x + this.petPosition.width,
            left: this.petPosition.x
        }
    }

    drawPet(){
        elements.canvasContext.drawImage(this.pet.image,this.petPosition.x, this.petPosition.y, this.petPosition.width, this.petPosition.height);
    }

    setLimits(){
        this.limits.top = this.petPosition.y + 20;
        this.limits.bottom = this.petPosition.y + this.petPosition.height - 20;
        this.limits.right = this.petPosition.x + this.petPosition.width - 20;
        this.limits.left = this.petPosition.x + 20;
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
    battlefieldSection: document.querySelector('#battlefield'),
    canvasContainer: document.querySelector('.map'),
    canvas: document.querySelector('#canvas'),
    canvasContext: canvas.getContext('2d')
};

// Variables
let currentPokemonIndex, selectedIcons, player, enemies, round, selectedEnemy;
let map = new Image();
let portServer = 5002;
let addressServer = 'http://localhost';
map.src = 'img/mokemap.jpg';

let keysPressed = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
};

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
    elements.characterImg.src = mokepons[mokeponIndex].image.src;
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
    enemies.forEach(enemy => enemy.pet = selectRandomMokepon());
    elements.selectPetSection.style.display = 'none';
    updateServerPet();
    initiateMap();
}

async function updateServerPet(){
    const response = await fetch(`${addressServer}:${portServer}/mokepon/${player.id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: player.pet
        })
    });
    console.log(response.status);
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
// ---------------- MAP ---------------//
// ------------------------------------//

function initiateMap(){
    
    elements.canvasContainer.style.display = 'block';
    enemies.forEach(enemy => {
        enemy.petPosition.x = getRandomInt(80, elements.canvas.width - 80);
        enemy.petPosition.y =  getRandomInt(80, elements.canvas.height - 80);
    })
    drawPets();
}

function clearCanvas(){
    elements.canvasContext.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
}

function moveCharacter(){
    //debugger
    if(keysPressed.ArrowUp && player.petPosition.y > 5){
        player.petPosition.y -= player.petPosition.speed;
    }
    if(keysPressed.ArrowDown && player.petPosition.y < (elements.canvas.height - player.petPosition.height - 5)){
        player.petPosition.y += player.petPosition.speed;
    }
    if(keysPressed.ArrowLeft && player.petPosition.x > 5){
        player.petPosition.x -= player.petPosition.speed;
    }
    if(keysPressed.ArrowRight && player.petPosition.x < (elements.canvas.width - player.petPosition.width - 5)){
        player.petPosition.x += player.petPosition.speed;
    }

    enemies.forEach(enemy => {
        if (checkCollision(enemy)) {
            selectedEnemy = enemy;
            initiateBattlefield();
            return;   
        }
    });
    
    updateServerPosition(player.petPosition.x, player.petPosition.y);
    updateCanvas();
}

async function updateServerPosition(x, y){
    const response = await fetch(`${addressServer}:${portServer}/mokepon/${player.id}/position`, {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            x,y
        })
    });
    console.log(response.status);
}

function updateCanvas(){
    clearCanvas();
    drawPets();
}

function drawPets(){
    elements.canvasContext.drawImage(map, 0, 0, elements.canvas.width, elements.canvas.height);
    player.drawPet();
    enemies.forEach(enemy => enemy.drawPet());
    
}

function checkCollision(enemy){
    player.setLimits();
    enemy.setLimits()
    if (player.limits.bottom < enemy.limits.top ||
        player.limits.top > enemy.limits.bottom ||
        player.limits.right < enemy.limits.left ||
        player.limits.left > enemy.limits.right ) {
            return false;
    }
    stopMovement();
    alert(`Colission with ${enemy.pet.name}`);
    return true;
}

function stopMovement(){
    document.removeEventListener('keydown', keyDownEvent);
    document.removeEventListener('keyup', keyUpEvent);
}

// ------------------------------------//
// ------------ BATTLEFIELD -----------//
// ------------------------------------//


function initiateBattlefield(){
    debugger;
    clearAttackResult();
    settleBattle();
    round = 1;
}

function clearAttackResult() {
    elements.enemyAttackResult.innerHTML = '';
    elements.playerAttackResult.innerHTML = '';
}

function settleBattle(){
    player.icons = selectedIcons;
    selectedEnemy.icons = findIcons(selectedEnemy.pet);
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
    //elements.canvas.style.display = 'none';
    elements.battlefieldSection.style.display = 'block';
    elements.selectedCharacterTitle.innerText = `${player.icons} ${player.pet.name} ${player.icons}`;
    elements.selectedCharacterImg.src = player.pet.image.src;

    elements.enemyCharacterTitle.innerText = `${selectedEnemy.icons} ${selectedEnemy.pet.name} ${selectedEnemy.icons}`;
    elements.enemyCharacterImg.src = selectedEnemy.pet.image.src;

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

// Event listener for selecting an attack type
function attackType(e) {
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
    if (winRules[player.attack.name] === selectedEnemy.attack.name) {
        player.result = 'green';
        selectedEnemy.result = 'red'
        player.score++;
    } else if (player.attack.name === selectedEnemy.attack.name) {
        player.result = 'grey';
        selectedEnemy.result = 'grey'
    } else {
        player.result = 'red';
        selectedEnemy.result = 'green'
        selectedEnemy.score++;
    }

    showResult();
    disableUsedAttack(player);
    disableUsedAttack(selectedEnemy);
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
    if(selectedEnemy.score === 3 || player.score === 3 || round === 5){
        let matchResult = "";
        if(selectedEnemy.score > player.score){
            matchResult = 'Perdiste la batalla!';
        }else if(selectedEnemy.score < player.score){
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

function renderScore(){
    elements.playerScore.innerText = player.score;
    elements.enemyScore.innerText = selectedEnemy.score;
}

// Displays the battle result
function showResult() {
    let playerAttackContainer = document.createElement('p');
    let enemyAttackContainer = document.createElement('p');
    playerAttackContainer.innerText = `${player.attack.name} ${player.attack.icon}`;
    enemyAttackContainer.innerText = `${selectedEnemy.attack.name} ${selectedEnemy.attack.icon}`;
    playerAttackContainer.style.backgroundColor = resultColors[player.result];
    enemyAttackContainer.style.backgroundColor = resultColors[selectedEnemy.result];
    elements.enemyAttackResult.appendChild(enemyAttackContainer);
    elements.playerAttackResult.appendChild(playerAttackContainer);
    renderScore();
}

// Randomly select an attack
function randomEnemyAttack() {
    do{
        selectedEnemy.attack = selectedEnemy.pet.attacks[getRandomInt(0, selectedEnemy.pet.attacks.length - 1)];
    }while(!selectedEnemy.attack.available)
}


// ------------------------------------//
// --------------- MAIN ---------------//
// ------------------------------------//

function startGame(){
    player = new GameCharacter();
    enemies = [new GameCharacter(), new GameCharacter(), new GameCharacter()];
    joinGame();
    currentPokemonIndex = 0;

    elements.matchResultContainer.innerHTML = '';
    elements.buttonsContainer.innerHTML = '';
    elements.restartMatchBtn.style.display = 'none';
    elements.battlefieldSection.style.display = 'none';
    elements.canvasContainer.style.display = 'none';
    elements.selectPetSection.style.display = 'block';
    document.addEventListener('keyup', keyUpEvent);
    document.addEventListener('keydown', keyDownEvent);

    renderPokemonToChoose(currentPokemonIndex);
}

async function joinGame(){
    try{
        const response = await fetch(`${addressServer}:${portServer}/join`);
        if(response.ok){
            const data = await response.json();
            player.id = data;
            console.log(player.id);
        }else{
            throw Error("Status " + response.status);
        }
    }catch(err){
        console.error('There was something wrong: ' + err);
    }
}

elements.selectBtn.addEventListener('click', (e) => {
    selectPet(e, currentPokemonIndex);
});
elements.buttonsContainer.addEventListener('click', attackType);
elements.restartMatchBtn.addEventListener('click', startGame);
elements.selectLeftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(currentPokemonIndex > 0){
        renderPokemonToChoose(--currentPokemonIndex);
    }
});
elements.selectRightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(currentPokemonIndex < mokepons.length-1){
        renderPokemonToChoose(++currentPokemonIndex);
    }
});


function keyDownEvent(event){
    if(Object.keys(keysPressed).includes(event.key)){
        keysPressed[event.key] = true;
        moveCharacter();
    }
}



function keyUpEvent(event){
    if(Object.keys(keysPressed).includes(event.key)){
        keysPressed[event.key] = false;
    }
}

//Initialization
startGame();
