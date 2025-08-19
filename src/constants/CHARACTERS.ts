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
      damage: 2
    },
    actions: []
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
    actions: []
  },
  troll: {
    name: '',
    race: 'troll',
    combatStats: {
      maxHealth: 40,
      currentHealth: 10,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    actions: []
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
    actions: []
  }
} as Record<Race, Character>;
