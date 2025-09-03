import type { Character, Race } from '$src/types/character';
import entity from '$src/ts/abilityEntity';

type CharacterKey = Race | 'berserker' | 'missingo';

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
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular')
    ]
  }),
  human: () => ({
    id: crypto.randomUUID(),
    name: 'npc2',
    race: 'human',
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
      entity.ability('basicAttackSlow'),
      entity.ability('block'),
      entity.ability('basicAttackSlow')
    ]
  }),
  troll: () => ({
    id: crypto.randomUUID(),
    name: 'npc3',
    race: 'troll',
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
      entity.ability('basicAttackSlow'),
      entity.ability('basicAttackSlow'),
      entity.ability('basicAttackSlow')
    ]
  }),
  dwarf: () => ({
    id: crypto.randomUUID(),
    name: 'npc4',
    race: 'dwarf',
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
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular'),
      entity.ability('basicAttackRegular')
    ]
  }),
  goblin: () => ({
    id: crypto.randomUUID(),
    name: 'npc5',
    race: 'goblin',
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
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast')
    ]
  }),
  // Creatures
  berserker: () => ({
    id: crypto.randomUUID(),
    name: 'Berserker',
    race: 'human',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description:
      'The Berserker is a fearsome warrior whose raw power and unyielding rage make him a deadly foe on the battlefield. Known for his brutal combat style, he thrives in the chaos of close-range encounters.<br /><br />His most terrifying ability is his relentless spinning attack, where he whirls his weapons with terrifying force, striking all who dare stand too close. This savage technique allows him to mow through groups of enemies with devastating efficiency, leaving little room for his opponents to retaliate.',
    combatStats: {
      maxHealth: 70,
      currentHealth: 50,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3,
      armor: 0
    },
    maxTicks: Infinity,
    abilities: [entity.ability('basicAttackRegular'), entity.ability('spin')]
  }),
  missingo: () => ({
    id: crypto.randomUUID(),
    name: 'Missingo',
    race: 'troll',
    size: 0.75,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    combatStats: {
      maxHealth: 50,
      currentHealth: 50,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4,
      armor: 0
    },
    maxTicks: Infinity,
    abilities: [entity.ability('basicAttackFast')]
  })
} as Record<CharacterKey, () => Character>;
