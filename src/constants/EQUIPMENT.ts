import ABILITIES from '$src/constants/ABILITIES';
import type { Equipment, EquipmentRef } from '$src/types/equipment';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepAdd, deepMerge } from '$src/helpers';

const DEFAULT_COST = 100;
const DEFAULT_LEVEL = 1;

export const ALL_EQUIPMENT = {
  sword: {
    name: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    },
    abilities: [ABILITIES('swing'), ABILITIES('swing')]
  },
  axe: {
    name: 'Axe',
    description: 'A simple axe.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    },
    abilities: [ABILITIES('swing'), ABILITIES('swing')]
  },
  hammer: {
    name: 'Hammer',
    description: 'A simple hammer.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    },
    abilities: [
      ABILITIES('slam', false, { overrides: { ticks: 3 } }),
      ABILITIES('slam', false, { overrides: { ticks: 3 } })
    ]
  },
  improvedHammer: {
    name: 'Improved Hammer',
    description: 'A improved hammer.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: 3,
    combatStats: {
      damage: 0
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
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {},
    abilities: [ABILITIES('block'), ABILITIES('shieldBash')]
  },
  twoHandedAxe: {
    name: 'Two-handed Axe',
    description: 'A mighty two-handed axe.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
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
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    },
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam')]
  },
  greatSword: {
    name: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
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
    cost: DEFAULT_COST * 2,
    level: 5,
    combatStats: {
      damage: 0
    },
    abilities: [ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce')]
  },
  dagger: {
    name: 'Dagger',
    description: 'A really sharp dagger.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: 15,
    combatStats: {
      damage: 0
    },
    abilities: [ABILITIES('stab'), ABILITIES('stab'), ABILITIES('stab'), ABILITIES('lacerate')]
  },
  giantsHeart: {
    name: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    cost: DEFAULT_COST,
    level: 10,
    combatStats: {
      maxHealth: 1,
      damage: 1,
      maxArmor: 1
    },
    abilities: [ABILITIES('demoralizingShout')]
  },
  leatherBoots: {
    name: 'Leather Boots',
    description: 'Fine protection.',
    slotsIn: 'armor',
    cost: DEFAULT_COST,
    level: 20,
    combatStats: {
      maxArmor: 0
    },
    abilities: [ABILITIES('kick')]
  },
  ring: {
    name: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    cost: DEFAULT_COST,
    level: 29,
    combatStats: {
      maxHealth: 5,
      damage: 1
    },
    abilities: []
  }
};

// export default (id: string | EquipmentRef, fullBody: boolean = false) =>
//   entity(
//     ALL_EQUIPMENT,
//     typeof id === 'string' ? id : id.id,
//     typeof id === 'string' ? undefined : id.uuid,
//     fullBody
//   ) as Equipment;

const applyScaling = (equipment: Equipment | EquipmentRef) => {
  const isWeapon = ['oneHand', 'twoHand'].includes(equipment?.slotsIn);
  if (isWeapon) {
    const multiplier = equipment?.slotsIn === 'twoHand' ? 2 : 1;
    const level = equipment.level || 0;
    const combatStats = {
      damage: level * multiplier
    };

    equipment.combatStats = deepAdd(equipment.combatStats, combatStats);
  }
  const isArmor = ['armor'].includes(equipment?.slotsIn);
  if (isArmor) {
    const level = equipment.level || 0;
    const combatStats = {
      maxArmor: level * 1
    };

    equipment.combatStats = deepAdd(equipment.combatStats, combatStats);
  }
  return equipment;
};

export default (id: string | EquipmentRef, fullBody: boolean = false, meta?: DynamicObject) =>
  applyScaling(
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
    ) as Equipment
  ) as Equipment;
