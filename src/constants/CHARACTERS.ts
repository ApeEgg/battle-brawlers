import type { Character, Race } from '$src/types/character';
import ABILITIES from '$src/constants/ABILITIES';

type CharacterKey = Race | 'berserker' | 'missingo';

const DEFAULT_MAX_HP = 12;

export default {
  elf: () => ({
    id: crypto.randomUUID(),
    name: 'npc1',
    race: 'elf',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast()
    ]
  }),
  human: () => ({
    id: crypto.randomUUID(),
    name: 'npc2',
    race: 'human',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular()
    ]
  }),
  troll: () => ({
    id: crypto.randomUUID(),
    name: 'npc3',
    race: 'troll',
    size: 1,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackSlow(),
      ABILITIES.basicAttackSlow(),
      ABILITIES.basicAttackSlow()
    ]
  }),
  dwarf: () => ({
    id: crypto.randomUUID(),
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
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular()
    ]
  }),
  goblin: () => ({
    id: crypto.randomUUID(),
    name: 'npc5',
    race: 'goblin',
    size: 0.75,
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackFast()
    ]
  }),
  // Creatures
  berserker: () => ({
    id: crypto.randomUUID(),
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
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackRegular()
    ]
  }),
  missingo: () => ({
    id: crypto.randomUUID(),
    name: 'Missingo',
    race: 'troll',
    size: 0.75,
    combatStats: {
      maxHealth: 100,
      currentHealth: 100,
      maxEnergy: 12,
      currentEnergy: 6,
      damage: 4
    },
    abilities: [
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackSlow(),
      ABILITIES.stun(),
      ABILITIES.block(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackSlow(),
      ABILITIES.stun(),
      ABILITIES.block(),
      ABILITIES.basicAttackFast(),
      ABILITIES.basicAttackRegular(),
      ABILITIES.basicAttackSlow(),
      ABILITIES.stun(),
      ABILITIES.block()
    ]
  })
} as Record<CharacterKey, () => Character>;
