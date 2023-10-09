// Constants for HTML elements
const elements = {
    selectBtn: document.querySelector('#select-btn'),
    selectedPet: document.querySelector('#selected-pet'),
    enemyPet: document.querySelector("#enemy-pet"),
    buttonsContainer: document.querySelector("#buttons-container"),
    attackResultContainer: document.querySelector("#attack-result"),
    attackBtns: document.querySelectorAll(".attack-btn"),
    matchResultContainer: document.querySelector("#match-result"),
    restartMatchBtn: document.querySelector("#restart-btn"),
    selectAttackContainer: document.querySelector('#select-attack'),
    characterImg: document.querySelector('#character-img'),
    characterTitle: document.querySelector('#character-title'),
    characterType: document.querySelector('#character-type'),
    selectLeftBtn: document.querySelector('#select-left-btn'),
    selectRightBtn: document.querySelector('#select-right-btn'),
};

// Variables
let playerPet, computerPet, playerAttack, enemyAttack, result, playerLives, enemyLives, matchResult, pokemonCurrentIndex;

// Mokepon data
const mokepons = [
    { name: 'Charmander', type: ['fire'], img: 'img/charmander.png' },
    { name: 'Vulpix', type: ['fire'], img: 'img/vulpix.png' },
    { name: 'Scovillain', type: ['fire', 'grass'], img: 'img/scovillain.png' },
    { name: 'Squirtle', type: ['water'], img: 'img/squirtle.png' },
    { name: 'Psyduck', type: ['water'], img: 'img/psyduck.png' },
    { name: 'Volcanion', type: ['water', 'fire'], img: 'img/volcanion.png' },
    { name: 'Bulbasaur', type: ['grass'], img: 'img/bulbasaur.png' },
    { name: 'Bellsprout', type: ['grass'], img: 'img/bellsprout.png' },
    { name: 'Lotad', type: ['water', 'grass'], img: 'img/lotad.png' },
];

const attacks = [
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'grass', icon: '🌱' },
];

const winRules = {
    'water': 'fire',
    'grass': 'water',
    'fire': 'grass',
};

// Event listener for selecting a pet
function selectPet(e) {
    e.preventDefault();
    playerPet = mokepons[pokemonCurrentIndex] //selectMokeponByName();
    computerPet = selectRandomMokepon();
    render();
    clearAttackResult();
    enableAttackButtons();
}

// Event listener for selecting an attack type
function attackType(e) {
    if (e.target.tagName === 'BUTTON') {
        if (playerPet) {
            playerAttack = attacks.find(attack => attack.name === e.target.value);
            elements.selectBtn.setAttribute('disabled','true');
            randomEnemyAttack();
            startBattle();
        } else {
            showResult('No has seleccionado una mascota!');
        }
    }
}

//Render the UI elements
function render(){
    const playerIcons = findIcons(playerPet);
    const enemyIcons = findIcons(computerPet);

    elements.selectedPet.innerText = playerPet ? `${playerPet.name} ${playerIcons} ${livesCounter(playerLives)}` : '';
    elements.enemyPet.innerText = computerPet ? `${computerPet.name} ${enemyIcons} ${livesCounter(enemyLives)}` : '';
}

//Clears the attack result
function clearAttackResult() {
    elements.attackResultContainer.innerHTML = '';
}

//Counts lives with heart emojis
function livesCounter(counter){
    return '❤️'.repeat(counter);
}

// Enables attack buttons
function enableAttackButtons() {
    elements.attackBtns.forEach(element => {
        element.style.display = playerPet ? 'inline-block' : 'none';
        element.removeAttribute('disabled');
    });
}

// Handles the battle logic
function startBattle() {
    elements.restartMatchBtn.style.display = 'inline-block';
    if (winRules[playerAttack.name] === enemyAttack.name) {
        result = 'Ganas';
        enemyLives--;
    } else if (playerAttack.name === enemyAttack.name) {
        result = 'Empate';
    } else {
        result = 'Pierdes';
        playerLives--;
    }

    showResult(`${playerPet.name} atacó con ${playerAttack.icon} \n ${computerPet.name} atacó con ${enemyAttack.icon} \n ${result}`);
    render();

    if (enemyLives === 0 || playerLives === 0) {
        matchResult = enemyLives === 0 ? 'Ganaste la batalla!' : 'Perdiste la batalla!';
        elements.matchResultContainer.innerHTML = `<p>${matchResult}</p>`;
        disableAttackButtons();
    }
}

// Displays the battle result
function showResult(message) {
    let resultText = document.createElement('p');
    resultText.innerText = message;
    elements.attackResultContainer.appendChild(resultText);
}

function disableAttackButtons() {
    elements.attackBtns.forEach(element => element.setAttribute('disabled', ''));
}

//Find the type icon for each pet
function findIcons(pet){
    return pet ? pet.type.map(type => attacks.find(attack => attack.name === type).icon).join('') : '';

}

// Randomly select an attack
function randomEnemyAttack() {
    enemyAttack = attacks[getRandomInt(0, attacks.length - 1)];
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

function loadPokemon(mokeponIndex){
    elements.characterImg.src = mokepons[mokeponIndex].img;
    elements.characterTitle.innerText = mokepons[mokeponIndex].name;
    elements.characterType.innerText = findIcons(mokepons[mokeponIndex]);
}

function startGame(){
    playerLives = 3;
    enemyLives = 3;
    playerPet = '';
    computerPet = '';
    playerAttack = '';
    enemyAttack = '';
    pokemonCurrentIndex = 0;
    clearAttackResult();
    elements.matchResultContainer.innerHTML = '';
    render();
    enableAttackButtons();
    elements.selectBtn.removeAttribute('disabled');
    elements.restartMatchBtn.style.display = 'none';
    loadPokemon(pokemonCurrentIndex);
}


// Event listeners
elements.selectBtn.addEventListener('click', selectPet);
elements.buttonsContainer.addEventListener('click', attackType);
elements.restartMatchBtn.addEventListener('click', startGame);
elements.selectLeftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(pokemonCurrentIndex > 0){
        loadPokemon(--pokemonCurrentIndex);
    }
});
elements.selectRightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(pokemonCurrentIndex < mokepons.length-1){
        loadPokemon(++pokemonCurrentIndex);
    }
});

//Initialization
startGame();