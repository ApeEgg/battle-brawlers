import type { Character } from '$src/types/character';

export default {
  elf: {
    prettyName: 'Elf',
    combatStats: {
      maxHealth: 10,
      damage: 2
    }
  },
  human: {
    prettyName: 'Human',
    combatStats: {
      maxHealth: 12,
      damage: 3
    }
  },
  troll: {
    prettyName: 'Troll',
    combatStats: {
      maxHealth: 18,
      damage: 4
    }
  }
} as Character;
