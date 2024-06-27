import {elements, player, enemy,findIcons} from './globals';

function initiateBattlefield(){
    clearAttackResult();
    settleBattle();
    enableAttackButtons();
}

//Clears the attack result
function clearAttackResult() {
    elements.enemyAttackResult.innerHTML = '';
    elements.playerAttackResult.innerHTML = '';
}

function settleBattle(){
    player.icons = findIcons(player.pet);
    enemy.icons = findIcons(enemy.pet);
    elements.selectPetSection.style.display = 'none';
    renderBattlefield();
}

function enableAttackButtons() {
    elements.attackBtns = document.querySelectorAll('.battlefield__attack-btn');
    elements.attackBtns.forEach(element => {
        element.style.display = player.pet ? 'inline-block' : 'none';
        element.removeAttribute('disabled');
    });
}

function renderBattlefield(){
    elements.battlefieldSection.style.display = 'block'
    elements.selectedCharacterTitle.innerText = `${player.icons} ${player.pet.name} ${player.icons}`;
    elements.selectedCharacterImg.src = mokepons.find(mokepon => mokepon.name === player.pet.name).img;

    elements.enemyCharacterTitle.innerText = `${enemy.icons} ${enemy.pet.name} ${enemy.icons}`;
    elements.enemyCharacterImg.src = mokepons.find(mokepon => mokepon.name === enemy.pet.name).img;

    renderButtons();
    renderLives();
}

function renderButtons(){
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    buttonsContainer.className = 'battlefield--user-attackas-container';
    for(const attack of player.pet.attacks){
        const button = document.createElement('button');
        button.value = attack.name;
        button.className = 'battlefield__attack-btn';
        button.innerText = `${attack.name} ${attack.icon}`;
        buttonsContainer.appendChild(button);
    }
    console.log(buttonsContainer.innerHTML);
    elements.buttonsContainer.innerHTML = buttonsContainer.innerHTML;
}

function renderLives(){
    elements.playerLives.innerText = livesCounter(playerLives);
    elements.enemyLives.innerText = livesCounter(enemyLives);
}

function livesCounter(counter){
    return '❤️'.repeat(counter);
}

export default {initiateBattlefield};