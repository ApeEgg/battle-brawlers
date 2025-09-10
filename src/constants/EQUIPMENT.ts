import ABILITIES from '$src/constants/ABILITIES';
import type { Equipment, EquipmentRef } from '$src/types/equipment';
import entity from '$src/ts/entity';

export const ALL_EQUIPMENT = {
  sword: {
    prettyName: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('stab', false, { overrides: { basic: false, ticks: 1 } })
    ]
  },
  shield: {
    prettyName: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {},
    abilities: [ABILITIES('block'), ABILITIES('shieldBash')]
  },
  ring: {
    prettyName: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    combatStats: {
      maxHealth: 5
    },
    abilities: []
  },
  twoHandedAxe: {
    prettyName: 'Two-handed Axe',
    description: 'A mighty two-handed axe.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 3
    },
    abilities: [
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('whirlwind', false, { overrides: { ticks: 4, chainLink: 4 } })
    ]
  },
  twoHandedHammer: {
    prettyName: 'Two-handed Hammer',
    description: "A mighty two-handed hammer.<br />It's slammer time!",
    slotsIn: 'twoHand',
    combatStats: {
      damage: 7
    },
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam')]
  },
  greatSword: {
    prettyName: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 2
    },
    abilities: [
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } })
    ]
  },
  bow: {
    prettyName: 'Bow',
    description: 'A simple bow.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 6
    },
    abilities: [
      ABILITIES('bowshot'),
      ABILITIES('bowshot'),
      ABILITIES('bowshot'),
      ABILITIES('bowshot')
    ]
  },
  leatherBoots: {
    prettyName: 'Leather Boots',
    description: 'Fine protection.',
    slotsIn: 'armor',
    combatStats: {
      maxArmor: 1
    },
    abilities: [ABILITIES('kick')]
  },
  giantsHeart: {
    prettyName: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    combatStats: {
      maxHealth: 1,
      damage: 1,
      maxArmor: 1
    },
    abilities: []
  },
  dagger: {
    prettyName: 'Heartpiercer',
    description: 'A really sharp dagger.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [ABILITIES('stab'), ABILITIES('stab'), ABILITIES('stab'), ABILITIES('lacerate')]
  }
};

export default (id: string | EquipmentRef, fullBody: boolean = false) =>
  entity(
    ALL_EQUIPMENT,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody
  ) as Equipment;
