import type { Character, Race } from '$src/types/character';
import ABILITIES from '$src/constants/ABILITIES';

const DEFAULT_MAX_HP = 20;

export default {
  elf: {
    name: 'npc1',
    race: 'elf',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 1
    },
    abilities: [
      ABILITIES.basicAttackFast,
      ABILITIES.basicAttackFast,
      ABILITIES.basicAttackFast,
      ABILITIES.basicAttackFast,
      ABILITIES.basicAttackFast,
      ABILITIES.basicAttackFast
    ]
  },
  human: {
    name: 'npc2',
    race: 'human',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 3
    },
    abilities: [ABILITIES.basicAttackSlow, ABILITIES.basicAttackSlow, ABILITIES.basicAttackSlow]
  },
  troll: {
    name: 'npc3',
    race: 'troll',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 6
    },
    abilities: [ABILITIES.basicAttackSlow, ABILITIES.basicAttackSlow, ABILITIES.basicAttackSlow]
  },
  dwarf: {
    name: 'npc4',
    race: 'dwarf',
    size: 0.75,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackRegular,
      ABILITIES.block,
      ABILITIES.stun,
      ABILITIES.basicAttackRegular,
      ABILITIES.stun,
      ABILITIES.stun
    ]
  },
  // Creatures
  berserker: {
    name: 'Berserker',
    race: 'dwarf',
    size: 0.75,
    combatStats: {
      maxHealth: 100,
      currentHealth: 100,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackRegular,
      ABILITIES.block,
      ABILITIES.stun,
      ABILITIES.basicAttackRegular,
      ABILITIES.stun,
      ABILITIES.stun
    ]
  }
} as Record<Race, Character>;
