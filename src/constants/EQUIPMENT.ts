import type { Equipment } from '$src/types/equipment';
import ABILITIES from '$src/constants/ABILITIES';

export default {
  sword: () => ({
    uuid: crypto.randomUUID(),
    id: 'sword',
    prettyName: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 3
    },
    abilities: [ABILITIES.basicAttackFast(), ABILITIES.basicAttackRegular()]
  }),
  shield: () => ({
    uuid: crypto.randomUUID(),
    id: 'shield',
    prettyName: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {
      damage: 3
    },
    abilities: [ABILITIES.block()]
  }),
  ring: () => ({
    uuid: crypto.randomUUID(),
    id: 'ring',
    prettyName: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    combatStats: {
      maxHealth: 5
    },
    abilities: []
  }),
  twoHandedSword: () => ({
    uuid: crypto.randomUUID(),
    id: 'twoHandedSword',
    prettyName: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 6
    },
    abilities: [ABILITIES.basicAttackSlow()]
  }),
  leatherArmor: () => ({
    uuid: crypto.randomUUID(),
    id: 'leatherArmor',
    prettyName: 'Leather Armor',
    description: 'Fine protection.',
    slotsIn: 'armor',
    combatStats: {
      armor: 2
    },
    abilities: []
  }),
  giantsHeart: () => ({
    uuid: crypto.randomUUID(),
    id: 'giantsHeart',
    prettyName: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    combatStats: {
      damage: 1
    },
    abilities: [ABILITIES.stun()]
  })
} as Record<string, () => Equipment>;
