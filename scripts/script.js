// Constants for HTML elements
const selectBtn = document.querySelector('#select-btn');
const petSelector = document.querySelector('#pet-selector');
const selectedPet = document.querySelector('#selected-pet');
const enemyPet = document.querySelector("#enemy-pet");
const buttonsContainer = document.querySelector("#buttons-container");
const attackResultContainer = document.querySelector("#attack-result");
const attackResultText = attackResultContainer.firstElementChild;

// Variables
let playerPet, computerPet, playerAttack, enemyAttack, result;

// Mokepon data
const mokepons = [
    { name: 'Hipodoge', type: ['water'] },
    { name: 'Suggles', type: ['water'] },
    { name: 'Capipepo', type: ['earth'] },
    { name: 'Todd', type: ['earth'] },
    { name: 'Ratigueya', type: ['fire'] },
    { name: 'Kailamor', type: ['fire'] },
    { name: 'Tucapalma', type: ['water', 'earth'] },
    { name: 'Pydos', type: ['earth', 'fire'] },
];

const attacks = [
    {name:'fire', icon: '🔥'},
    {name:'water', icon: '💧'},
    {name:'earth', icon: '🌱'}
];

const winRules = {
    'water' : 'fire',
    'earth' : 'water',
    'fire' : 'earth'
};


// Event listener for selecting a pet
function selectPet(e) {
    e.preventDefault();
    playerPet = selectMokeponByName(petSelector.value);
    computerPet = selectRandomMokepon();
    selectedPet.innerText = playerPet ? playerPet.name : 'No pet found';
    enemyPet.innerText = computerPet ? computerPet.name : 'No pet found';
    attackResultText.innerText = '';
}

// Event listener for selecting an attack type
function attackType(e) {
    if (e.target.tagName === 'BUTTON') {
        if(playerPet){
            playerAttack = attacks.find(attack => attack.name === e.target.value);
            randomEnemyAttack();
            startBattle();
        }else{
            showResult();
        }
    }
}

function startBattle(){
    console.log(playerAttack, enemyAttack, winRules[playerAttack.name]);
    if(winRules[playerAttack.name] === enemyAttack.name){
        result = 'Ganas';
    }else if(playerAttack.name === enemyAttack.name){
        result = 'Empate';
    }else{
        result = 'Pierdes';
    }
    showResult();
}

function showResult(){
    if(playerPet){
        attackResultText.innerText = `${playerPet.name} atacó con ${playerAttack.icon} \n ${computerPet.name} atacó con ${enemyAttack.icon} \n ${result}`;
    }else{
        attackResultText.innerText = `No has seleccionado una mascota!`;
    }
}

function randomEnemyAttack(){
    enemyAttack = attacks[getRandomInt(0, attacks.length-1)];
}

// Function to select a random Mokepon
function selectRandomMokepon() {
    return mokepons[getRandomInt(0, mokepons.length - 1)];
}

// Function to select a Mokepon by name
function selectMokeponByName(nameToFind) {
    return mokepons.find(mokepon => mokepon.name === nameToFind);
}

// Function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listeners
selectBtn.addEventListener('click', selectPet);
buttonsContainer.addEventListener('click', attackType);