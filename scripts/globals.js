class Mokepon{
    constructor(name, type, img, attacks){
        this.name = name;
        this.type = type;
        this.img = img;
        this.attacks = attacks;
    }
}

class GameCharacter{
    constructor(pet, attack, score, icons, result){
        this.pet = pet;
        this.Attack = attack;
        this.score = score;
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
    playerLives: document.querySelector('#player-lives'),
    enemyLives: document.querySelector('#enemy-lives'),
    enemyAttackResult: document.querySelector('#enemy-attack-result'),
    playerAttackResult: document.querySelector('#player-attack-result'),
    battlefieldSection: document.querySelector('#battlefield')
};

const attacks = [
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'grass', icon: '🌱' },
];

const player = null;
const enemy = null;


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

//Find the type icon for each pet
function findIcons(pet){
    return pet ? pet.type.map(type => attacks.find(attack => attack.name === type).icon).join('') : '';
}

export default {elements, mokepons, player, enemy, attacks, findIcons};