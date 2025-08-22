import type { Character, Race } from '$src/types/character';

export default {
  elf: {
    name: '',
    race: 'elf',
    combatStats: {
      maxHealth: 40,
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
    combatStats: {
      maxHealth: 40,
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
    combatStats: {
      maxHealth: 40,
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
    combatStats: {
      maxHealth: 40,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: []
  }
} as Record<Race, Character>;
