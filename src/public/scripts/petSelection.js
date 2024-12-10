function renderPokemonToChoose(
  mokeponIndex,
  elements,
  mokepons,
  selectedIcons
) {
  elements.characterImg.src =
    mokepons[mokeponIndex].image.src;
  elements.characterTitle.innerText =
    mokepons[mokeponIndex].name;
  selectedIcons = findIcons(mokepons[mokeponIndex]);
  elements.characterType.innerText = selectedIcons;
}

//Find the type icon for each pet
function findIcons(pet, attacks) {
  return pet
    ? pet.type
        .map(
          (type) =>
            attacks.find((attack) => attack.name === type)
              .icon
        )
        .join('')
    : '';
}

// Event listener for selecting a pet
function selectPet(e) {
  e.preventDefault();
  player.pet = mokepons[currentPokemonIndex];
  enemies.forEach(
    (enemy) => (enemy.pet = selectRandomMokepon())
  );
  elements.selectPetSection.style.display = 'none';
  updateServerPet();
  initiateMap();
}

async function updateServerPet() {
  const response = await fetch(
    `${addressServer}:${portServer}/mokepon/${player.id}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mokepon: player.pet
      })
    }
  );
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
