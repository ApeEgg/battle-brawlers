import type { Character, Race } from '$src/types/character';
import ABILITIES from '$src/constants/ABILITIES';

export type CharacterKey = Race | 'creature';

const DEFAULT_MAX_HP = 12;
const DEFAULT_EQUIPMENT = {
  mainHand: null,
  offHand: null,
  armor: null,
  accessory: null,
  trinket: null
};

export default {
  elf: () => ({
    id: crypto.randomUUID(),
    name: 'npc1',
    race: 'elf',
    image: 'elf/01.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4,
      armor: 0
    },
    maxTicks: 15,
    abilities: [
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast')
    ]
  }),
  human: () => ({
    id: crypto.randomUUID(),
    name: 'npc2',
    race: 'human',
    image: 'human/01.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1,
      armor: 0
    },
    maxTicks: 15,
    abilities: [ABILITIES('basicAttackSlow'), ABILITIES('block'), ABILITIES('basicAttackSlow')]
  }),
  troll: () => ({
    id: crypto.randomUUID(),
    name: 'npc3',
    race: 'troll',
    image: 'troll/01.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1,
      armor: 0
    },
    maxTicks: 15,
    abilities: [
      ABILITIES('basicAttackSlow'),
      ABILITIES('basicAttackSlow'),
      ABILITIES('basicAttackSlow')
    ]
  }),
  dwarf: () => ({
    id: crypto.randomUUID(),
    name: 'npc4',
    race: 'dwarf',
    image: 'dwarf/01.png',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1,
      armor: 0
    },
    maxTicks: 15,
    abilities: [
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular')
    ]
  }),
  goblin: () => ({
    id: crypto.randomUUID(),
    name: 'npc5',
    race: 'goblin',
    image: 'goblin/01.png',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1,
      armor: 0
    },
    maxTicks: 15,
    abilities: [
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast')
    ]
  }),
  // Creatures
  succubus: () => ({
    id: crypto.randomUUID(),
    name: 'Succubus',
    race: 'creature',
    image: 'creature/succubus.png',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description:
      'The Succubus is a fearsome warrior whose raw power and unyielding rage make her a deadly foe on the battlefield. Known for her brutal combat style, she thrives in the chaos of close-range encounters.<br /><br />Her most terrifying ability is her relentless spinning attack, where she whirls her weapons with terrifying force, striking all who dare stand too close. This savage technique allows her to mow through groups of enemies with devastating efficiency, leaving little room for her opponents to retaliate.',
    combatStats: {
      maxHealth: 70,
      currentHealth: 50,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3,
      armor: 0
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('basicAttackRegular'), ABILITIES('spin')]
  }),
  rat: () => ({
    id: crypto.randomUUID(),
    name: 'Rat',
    race: 'creature',
    image: 'creature/rat.png',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description: 'Snirvel.',
    combatStats: {
      maxHealth: 20,
      currentHealth: 50,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3,
      armor: 0
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab')
    ]
  }),
  undead: () => ({
    id: crypto.randomUUID(),
    name: 'Undead',
    race: 'creature',
    image: 'creature/undead.png',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description: 'ÖÖÖÖh.',
    combatStats: {
      maxHealth: 20,
      currentHealth: 50,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3,
      armor: 0
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab')
    ]
  })
} as Record<string, () => Character>;
