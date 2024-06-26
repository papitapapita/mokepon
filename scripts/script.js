class Mokepon{
    constructor(name, type, img, attacks){
        this.name = name;
        this.type = type;
        this.img = img;
        this.attacks = attacks;
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
    playerLives: document.querySelector('#player-lives'),
    enemyLives: document.querySelector('#enemy-lives'),
    enemyAttackResult: document.querySelector('#enemy-attack-result'),
    playerAttackResult: document.querySelector('#player-attack-result'),
    battlefieldSection: document.querySelector('#battlefield')
};

// Variables
let playerPet, computerPet, playerAttack, enemyAttack, playerLives, enemyLives, matchResult, pokemonCurrentIndex, playerIcons, enemyIcons, playerResult, enemyResult;


const attacks = [
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'grass', icon: '🌱' },
];

const mokepons = [
    new Mokepon('Charmander', ['fire'],'img/charmander.png', [attacks[0], attacks[0], attacks[0], attacks[1], attacks[2]]),
    new Mokepon('Vulpix', ['fire'], 'img/vulpix.png', [attacks[0], attacks[0], attacks[1], attacks[1], attacks[2]]),
    new Mokepon('Scovillain', ['fire', 'grass'], 'img/scovillain.png', [attacks[0], attacks[0], attacks[2], attacks[2], attacks[1]]),
    new Mokepon('Squirtle', ['water'], 'img/squirtle.png', [attacks[1], attacks[1], attacks[1], attacks[1], attacks[2]]),
    new Mokepon('Psyduck', ['water'], 'img/psyduck.png', [attacks[1], attacks[1], attacks[0], attacks[2], attacks[2]]),
    new Mokepon('Volcanion', ['water', 'fire'], 'img/volcanion.png', [attacks[0], attacks[0], attacks[0], attacks[1], attacks[1]]),
    new Mokepon('Bulbasaur', ['grass'], 'img/bulbasaur.png', [attacks[0], attacks[0], attacks[0], attacks[1], attacks[2]]),
    new Mokepon('Bellsprout', ['grass'], 'img/bellsprout.png', [attacks[0], attacks[0], attacks[0], attacks[1], attacks[2]]),
    new Mokepon('Lotad', ['water', 'grass'], 'img/lotad.png', [attacks[0], attacks[0], attacks[0], attacks[1], attacks[2]]),
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

// Event listener for selecting a pet
function selectPet(e) {
    e.preventDefault();
    playerPet = mokepons[pokemonCurrentIndex];
    computerPet = selectRandomMokepon();
    clearAttackResult();
    settleBattle();
    enableAttackButtons();
}

function renderButtons(mokepon){
    const buttonsContainer = document.createElement('div');
    for(const attack of mokepon.attacks){
        const button = document.createElement('button');
        //button.setAttribute('value', attack.name);
        /*button.setAttribute('class', );
        button.setAttribute('id')*/
        button.value = attack.name;
        button.className = 'battlefield__attack-btn';
        buttonsContainer.appendChild(button);
    }
}

function settleBattle(){
    playerIcons = findIcons(playerPet);
    enemyIcons = findIcons(computerPet);
    elements.selectPetSection.style.display = 'none';
    renderBattlefield();
}

// Event listener for selecting an attack type
function attackType(e) {
    e.preventDefault()
    if (e.target.tagName === 'BUTTON') {
        playerAttack = attacks.find(attack => attack.name === e.target.value);
        randomEnemyAttack();
        startBattle();
    }
}

//Render the UI elements
function renderBattlefield(){
    elements.battlefieldSection.style.display = 'block'
    elements.selectedCharacterTitle.innerText = `${playerIcons} ${playerPet.name} ${playerIcons}`;
    elements.selectedCharacterImg.src = mokepons.find(mokepon => mokepon.name === playerPet.name).img;

    elements.enemyCharacterTitle.innerText = `${enemyIcons} ${computerPet.name} ${enemyIcons}`;
    elements.enemyCharacterImg.src = mokepons.find(mokepon => mokepon.name === computerPet.name).img;

    renderLives();
}

function renderLives(){
    elements.playerLives.innerText = livesCounter(playerLives);
    elements.enemyLives.innerText = livesCounter(enemyLives);
}

//Clears the attack result
function clearAttackResult() {
    elements.enemyAttackResult.innerHTML = '';
    elements.playerAttackResult.innerHTML = '';
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
    if (winRules[playerAttack.name] === enemyAttack.name) {
        playerResult = 'green';
        enemyResult = 'red'
        enemyLives--;
    } else if (playerAttack.name === enemyAttack.name) {
        playerResult = 'grey';
        enemyResult = 'grey'
    } else {
        playerResult = 'red';
        enemyResult = 'green'
        playerLives--;
    }

    showResult();
    renderLives();

    if (enemyLives === 0 || playerLives === 0) {
        matchResult = enemyLives === 0 ? 'Ganaste la batalla!' : 'Perdiste la batalla!';
        elements.matchResultContainer.innerHTML = `<p>${matchResult}</p>`;
        elements.attackBtns.forEach(element => element.setAttribute('disabled', ''));
        elements.restartMatchBtn.style.display = 'inline-block';
    }
}

// Displays the battle result
function showResult() {
    let playerAttackContainer = document.createElement('p');
    let enemyAttackContainer = document.createElement('p');
    playerAttackContainer.innerText = `${playerAttack.name} ${attacks.find(attack => attack.name === playerAttack.name).icon}`;
    enemyAttackContainer.innerText = `${enemyAttack.name} ${attacks.find(attack => attack.name === enemyAttack.name).icon}`;
    playerAttackContainer.style.backgroundColor = resultColors[playerResult];
    enemyAttackContainer.style.backgroundColor = resultColors[enemyResult];
    elements.enemyAttackResult.appendChild(enemyAttackContainer);
    elements.playerAttackResult.appendChild(playerAttackContainer);
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
    elements.matchResultContainer.innerHTML = '';
    elements.restartMatchBtn.style.display = 'none';
    elements.battlefieldSection.style.display = 'none';
    elements.selectPetSection.style.display = 'block';
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