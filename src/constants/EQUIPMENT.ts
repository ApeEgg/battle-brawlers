import ABILITIES from '$src/constants/ABILITIES';
import type { EquipmentRef } from '$src/types/equipment';
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
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast'),
      ABILITIES('basicAttackFast')
    ]
  },
  shield: {
    prettyName: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {},
    abilities: [ABILITIES('block'), ABILITIES('basicAttackFast')]
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
  greatSword: {
    prettyName: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 3
    },
    abilities: [
      ABILITIES('basicAttackSlow'),
      ABILITIES('basicAttackSlow'),
      ABILITIES('basicAttackSlow')
    ]
  },
  leatherArmor: {
    prettyName: 'Leather Armor',
    description: 'Fine protection.',
    slotsIn: 'armor',
    combatStats: {
      armor: 1
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
    combatStats: {},
    abilities: [ABILITIES('lacerate')]
  }
};

export default (id: string | EquipmentRef, fullBody: boolean = false) =>
  entity(
    ALL_EQUIPMENT,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody
  );
