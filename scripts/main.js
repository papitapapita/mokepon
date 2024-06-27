import {elements, mokepons, player, enemy} from './globals';
import {renderPokemonToChoose, selectPet} from './petSelection';
let currentPokemonIndex;

function startGame(){
    player = new GameCharacter();
    enemy = new GameCharacter();
    currentPokemonIndex = 0;
    elements.matchResultContainer.innerHTML = '';
    elements.restartMatchBtn.style.display = 'none';
    elements.battlefieldSection.style.display = 'none';
    elements.selectPetSection.style.display = 'block';
    renderPokemonToChoose(currentPokemonIndex);
}

// Event listeners
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

//Initialization
startGame();

