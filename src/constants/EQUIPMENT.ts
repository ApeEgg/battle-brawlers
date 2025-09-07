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
    abilities: [ABILITIES('slash'), ABILITIES('slash'), ABILITIES('slash')]
  },
  shield: {
    prettyName: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {},
    abilities: [ABILITIES('block'), ABILITIES('block')]
  },
  ring: {
    prettyName: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    combatStats: {
      maxHealth: 5
    },
    abilities: [ABILITIES('spin')]
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
      ABILITIES('slash', false, { overrides: { ticks: 4 } }),
      ABILITIES('slash', false, { overrides: { ticks: 4 } }),
      ABILITIES('slash', false, { overrides: { ticks: 4 } })
    ]
  },
  leatherArmor: {
    prettyName: 'Leather Armor',
    description: 'Fine protection.',
    slotsIn: 'armor',
    combatStats: {
      maxArmor: 1
    },
    abilities: []
  },
  giantsHeart: {
    prettyName: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    combatStats: {},
    abilities: [ABILITIES('stun')]
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
