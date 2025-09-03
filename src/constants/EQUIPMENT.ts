import entity from '$src/ts/abilityEntity';

export default {
  sword: {
    prettyName: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    combatStats: {
      damage: 1
    },
    abilities: [
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast'),
      entity.ability('basicAttackFast')
    ]
  },
  shield: {
    prettyName: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    combatStats: {},
    abilities: [entity.ability('block'), entity.ability('basicAttackFast')]
  },
  ring: {
    prettyName: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    combatStats: {
      maxHealth: 5
    },
    abilities: [entity.ability('spin')]
  },
  greatsword: {
    prettyName: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    combatStats: {
      damage: 3
    },
    abilities: [
      entity.ability('basicAttackSlow'),
      entity.ability('basicAttackSlow'),
      entity.ability('basicAttackSlow')
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
    abilities: [entity.ability('stun')]
  },
  dagger: {
    prettyName: 'Heartpiercer',
    description: 'A really sharp dagger.',
    slotsIn: 'oneHand',
    combatStats: {},
    abilities: [entity.ability('lacerate')]
  }
};
