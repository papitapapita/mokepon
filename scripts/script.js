// Constants for HTML elements
const elements = {
    selectBtn: document.querySelector('#select-btn'),
    petSelector: document.querySelector('#pet-selector'),
    selectedPet: document.querySelector('#selected-pet'),
    enemyPet: document.querySelector("#enemy-pet"),
    buttonsContainer: document.querySelector("#buttons-container"),
    attackResultContainer: document.querySelector("#attack-result"),
    attackBtns: document.querySelectorAll(".attack-btn"),
    matchResultContainer: document.querySelector("#match-result"),
    restartMatchBtn: document.querySelector("#restart-btn"),
    selectAttackContainer: document.querySelector('#select-attack')
};

// Variables
let playerPet, computerPet, playerAttack, enemyAttack, result, playerLives, enemyLives, matchResult;

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
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'earth', icon: '🌱' },
];

const winRules = {
    'water': 'fire',
    'earth': 'water',
    'fire': 'earth',
};

// Event listener for selecting a pet
function selectPet(e) {
    e.preventDefault();
    playerPet = selectMokeponByName(elements.petSelector.value);
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

function startGame(){
    playerLives = 3;
    enemyLives = 3;
    playerPet = '';
    computerPet = '';
    playerAttack = '';
    enemyAttack = '';
    clearAttackResult();
    elements.matchResultContainer.innerHTML = '';
    render();
    enableAttackButtons();
    elements.selectBtn.removeAttribute('disabled');
    elements.restartMatchBtn.style.display = 'none';
}

// Event listeners
elements.selectBtn.addEventListener('click', selectPet);
elements.buttonsContainer.addEventListener('click', attackType);
elements.restartMatchBtn.addEventListener('click', startGame);

//Initialization
startGame();