function selectPet(e) {
    e.preventDefault();
    playerPet = selectMokeponByName(petSelector.value);
    computerPet = selectRandomMokepon();
    selectedPet.innerText = playerPet ? playerPet.name : 'No pet found';
    enemyPet.innerText = computerPet ? computerPet.name : 'No pet found';
}

function selectRandomMokepon() {
    const randomIndex = getRandomInt(0, mokepons.length - 1);
    return mokepons[randomIndex];
}

function selectMokeponByName(nameToFind) {
    return mokepons.find(mokepon => mokepon.name === nameToFind);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const selectBtn = document.querySelector('#select-btn');
const petSelector = document.querySelector('#pet-selector');
const selectedPet = document.querySelector('#selected-pet');
const enemyPet = document.querySelector("#enemy-pet");
let playerPet, computerPet;

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

selectBtn.addEventListener('click', selectPet);
