import Mokepon from '../../model/Mokepon.js';
import Attack from '../../model/Attack.js';

const attacks = [
  { name: 'fire', icon: '🔥' },
  { name: 'water', icon: '💧' },
  { name: 'grass', icon: '🌱' }
];

const mokepons = [
  new Mokepon(
    'Charmander',
    ['fire'],
    'img/charmander.png',
    [
      new Attack(1, 'fire', 'fire', '🔥', true),
      new Attack(2, 'fire', 'fire', '🔥', true),
      new Attack(3, 'fire', 'fire', '🔥', true),
      new Attack(4, 'water', 'water', '💧', true),
      new Attack(5, 'grass', 'grass', '🌱', true)
    ]
  ),
  new Mokepon('Vulpix', ['fire'], 'img/vulpix.png', [
    new Attack(1, 'fire', 'fire', '🔥', true),
    new Attack(2, 'fire', 'fire', '🔥', true),
    new Attack(3, 'water', 'water', '💧', true),
    new Attack(4, 'water', 'water', '💧', true),
    new Attack(5, 'grass', 'grass', '🌱', true)
  ]),
  new Mokepon(
    'Scovillain',
    ['fire', 'grass'],
    'img/scovillain.png',
    [
      new Attack(1, 'fire', 'fire', '🔥', true),
      new Attack(2, 'fire', 'fire', '🔥', true),
      new Attack(3, 'grass', 'grass', '🌱', true),
      new Attack(4, 'grass', 'grass', '🌱', true),
      new Attack(5, 'water', 'water', '💧', true)
    ]
  ),
  new Mokepon('Squirtle', ['water'], 'img/squirtle.png', [
    new Attack(1, 'water', 'water', '💧', true),
    new Attack(2, 'water', 'water', '💧', true),
    new Attack(3, 'water', 'water', '💧', true),
    new Attack(4, 'water', 'water', '💧', true),
    new Attack(5, 'grass', 'grass', '🌱', true)
  ]),
  new Mokepon('Psyduck', ['water'], 'img/psyduck.png', [
    new Attack(1, 'water', 'water', '💧', true),
    new Attack(2, 'water', 'water', '💧', true),
    new Attack(3, 'fire', 'fire', '🔥', true),
    new Attack(4, 'grass', 'grass', '🌱', true),
    new Attack(5, 'grass', 'grass', '🌱', true)
  ]),
  new Mokepon(
    'Volcanion',
    ['water', 'fire'],
    'img/volcanion.png',
    [
      new Attack(1, 'fire', 'fire', '🔥', true),
      new Attack(2, 'fire', 'fire', '🔥', true),
      new Attack(3, 'fire', 'fire', '🔥', true),
      new Attack(4, 'water', 'water', '💧', true),
      new Attack(5, 'water', 'water', '💧', true)
    ]
  ),
  new Mokepon('Bulbasaur', ['grass'], 'img/bulbasaur.png', [
    new Attack(1, 'fire', 'fire', '🔥', true),
    new Attack(2, 'fire', 'fire', '🔥', true),
    new Attack(3, 'fire', 'fire', '🔥', true),
    new Attack(4, 'water', 'water', '💧', true),
    new Attack(5, 'grass', 'grass', '🌱', true)
  ]),
  new Mokepon(
    'Bellsprout',
    ['grass'],
    'img/bellsprout.png',
    [
      new Attack(1, 'fire', 'fire', '🔥', true),
      new Attack(2, 'fire', 'fire', '🔥', true),
      new Attack(3, 'fire', 'fire', '🔥', true),
      new Attack(4, 'water', 'water', '💧', true),
      new Attack(5, 'grass', 'grass', '🌱', true)
    ]
  ),
  new Mokepon(
    'Lotad',
    ['water', 'grass'],
    'img/lotad.png',
    [
      new Attack(1, 'fire', 'fire', '🔥', true),
      new Attack(2, 'fire', 'fire', '🔥', true),
      new Attack(3, 'fire', 'fire', '🔥', true),
      new Attack(4, 'water', 'water', '💧', true),
      new Attack(5, 'grass', 'grass', '🌱', true)
    ]
  )
];

const winRules = {
  water: 'fire',
  grass: 'water',
  fire: 'grass'
};

const resultColors = {
  red: '#DD8B59',
  green: '#9CD24E',
  grey: '#FBFBF9'
};

export { attacks, mokepons, winRules, resultColors };
