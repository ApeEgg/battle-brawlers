import type { Character, Race } from '$src/types/character';

const DEFAULT_MAX_HP = 20;

export default {
  elf: {
    name: '',
    race: 'elf',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1
    },
    abilities: []
  },
  human: {
    name: '',
    race: 'human',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3
    },
    abilities: []
  },
  troll: {
    name: '',
    race: 'troll',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 6
    },
    abilities: []
  },
  dwarf: {
    name: '',
    race: 'dwarf',
    size: 0.75,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: []
  }
} as Record<Race, Character>;
