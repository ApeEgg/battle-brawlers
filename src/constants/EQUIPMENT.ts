import ABILITIES from '$src/constants/ABILITIES';
import type { Equipment, EquipmentRef } from '$src/types/equipment';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepMerge } from '$src/helpers';

export const ALL_EQUIPMENT = {
  sword: {
    name: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [ABILITIES('swing'), ABILITIES('swing')]
  },
  axe: {
    name: 'Axe',
    description: 'A simple axe.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [ABILITIES('swing'), ABILITIES('swing')]
  },
  hammer: {
    name: 'Hammer',
    description: 'A simple hammer.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [
      ABILITIES('slam', false, { overrides: { ticks: 3 } }),
      ABILITIES('slam', false, { overrides: { ticks: 3 } })
    ]
  },
  shield: {
    name: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {},
    abilities: [ABILITIES('block'), ABILITIES('shieldBash')]
  },
  ring: {
    name: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    combatStats: {
      maxHealth: 5,
      damage: 1
    },
    abilities: []
  },
  twoHandedAxe: {
    name: 'Two-handed Axe',
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
  club: {
    name: 'Club',
    description: "A mighty two-handed club.<br />It's slammer time!",
    slotsIn: 'twoHand',
    combatStats: {
      damage: 7
    },
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam')]
  },
  greatSword: {
    name: 'Greatsword',
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
    name: 'Bow',
    description: 'A simple bow.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 6
    },
    abilities: [ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce')]
  },
  leatherBoots: {
    name: 'Leather Boots',
    description: 'Fine protection.',
    slotsIn: 'armor',
    combatStats: {
      maxArmor: 1
    },
    abilities: [ABILITIES('kick')]
  },
  giantsHeart: {
    name: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    combatStats: {
      maxHealth: 1,
      damage: 1,
      maxArmor: 1
    },
    abilities: [ABILITIES('demoralizingShout')]
  },
  dagger: {
    name: 'Dagger',
    description: 'A really sharp dagger.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [ABILITIES('stab'), ABILITIES('stab'), ABILITIES('stab'), ABILITIES('lacerate')]
  }
};

// export default (id: string | EquipmentRef, fullBody: boolean = false) =>
//   entity(
//     ALL_EQUIPMENT,
//     typeof id === 'string' ? id : id.id,
//     typeof id === 'string' ? undefined : id.uuid,
//     fullBody
//   ) as Equipment;

export default (id: string | EquipmentRef, fullBody: boolean = false, meta?: DynamicObject) =>
  entity(
    ALL_EQUIPMENT,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody,
    typeof id === 'string'
      ? meta?.overrides
      : meta?.overrides
        ? deepMerge(id.overrides || {}, meta.overrides || {})
        : id.overrides
  ) as Equipment;
