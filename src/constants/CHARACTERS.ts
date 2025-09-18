import type { Character, CharacterRef, Race } from '$src/types/character';
import ABILITIES from '$src/constants/ABILITIES';
import type { DynamicObject } from '$src/types/common';
import entity from '$src/ts/entity';
import { deepMerge } from '$src/helpers';

export type CharacterKey = Race | 'creature';

const DEFAULT_MAX_HP = 24;
const DEFAULT_DAMAGE = 10;
const DEFAULT_MAX_TICKS = 12;

export const DEFAULT_EQUIPMENT = {
  mainHand: null,
  offHand: null,
  armor: null,
  accessory: null,
  trinket: null
};

// !!!IMPORTANT!!!
// Don't use { overrides } here, it breaks playable characters
// inheriting. If "creatures" need overrides, add them to the specific creature.

export const ALL_CHARACTERS = {
  elf: {
    name: 'Elon',
    race: 'elf',
    image: 'elf/01.png',
    size: 1.2,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    // woundLimit: 8,
    // concussionLimit: 8,
    // comboLimit: 8,
    // exosedLimit: 8,
    element: 'nature',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('swing')
    ]
  },
  human: {
    name: 'Hebert',
    race: 'human',
    image: 'human/01.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    element: 'frost',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [ABILITIES('slam'), ABILITIES('block'), ABILITIES('slam')]
  },
  troll: {
    name: 'Throk',
    race: 'troll',
    image: 'troll/01.png',
    size: 1.1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    element: 'earth',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam')]
  },
  dwarf: {
    name: 'Durak',
    race: 'dwarf',
    image: 'dwarf/01.png',
    size: 0.8,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    element: 'fire',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam')]
  },
  goblin: {
    name: 'Grish',
    race: 'goblin',
    image: 'goblin/01.png',
    size: 0.8,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    element: 'lightning',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab')
    ]
  },
  // Creatures
  succubus: {
    name: 'Succubus',
    race: 'creature',
    image: 'creature/succubus.png',
    size: 1.2,
    equipment: DEFAULT_EQUIPMENT,
    description:
      'The Succubus is a fearsome warrior whose raw power and unyielding rage make her a deadly foe on the battlefield. Known for her brutal combat style, she thrives in the chaos of close-range encounters.<br /><br />Her most terrifying ability is her relentless spinning attack, where she whirls her weapons with terrifying force, striking all who dare stand too close. This savage technique allows her to mow through groups of enemies with devastating efficiency, leaving little room for her opponents to retaliate.',
    element: '',
    combatStats: {
      maxHealth: 70,
      currentHealth: 70,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('swing'), ABILITIES('whirlwind', false, { overrides: { basic: true } })]
  },
  rat: {
    name: 'Fat rat',
    race: 'creature',
    image: 'creature/rat.png',
    size: 1.15,
    equipment: DEFAULT_EQUIPMENT,
    description: 'Snirvel.',
    element: '',
    combatStats: {
      maxHealth: 50,
      currentHealth: 50,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('bite'), ABILITIES('cheesyTactics'), ABILITIES('bite')]
  },
  undead: {
    name: 'Undead',
    race: 'creature',
    image: 'creature/undead.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: 'ÖÖÖÖh.',
    combatStats: {
      maxHealth: 20,
      currentHealth: 20,
      damage: DEFAULT_DAMAGE,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab'),
      ABILITIES('stab')
    ]
  },
  golem: {
    name: 'Golem',
    race: 'creature',
    image: 'creature/golem.png',
    size: 1.2,
    equipment: DEFAULT_EQUIPMENT,
    description: '...',
    element: '',
    combatStats: {
      maxHealth: 50,
      currentHealth: 50,
      damage: DEFAULT_DAMAGE,
      maxArmor: 100,
      currentArmor: 100,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam'), ABILITIES('harden')]
  }
};

export default (id: string | CharacterRef, fullBody: boolean = false, meta?: DynamicObject) =>
  entity(
    ALL_CHARACTERS,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody,
    typeof id === 'string'
      ? meta?.overrides
      : meta?.overrides
        ? deepMerge(id.overrides || {}, meta.overrides || {})
        : id.overrides
  ) as Required<Character>;
