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
  elfMale: {
    name: 'Brawler',
    race: 'elf',
    image: 'elf/male-01.png',
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
    abilities: [ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce')]
  },
  elfFemale: {
    name: 'Brawler',
    race: 'elf',
    image: 'elf/female-01.png',
    size: 1.05,
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
    abilities: [ABILITIES('swing'), ABILITIES('swing'), ABILITIES('swing'), ABILITIES('swing')]
  },
  humanMale: {
    name: 'Brawler',
    race: 'human',
    image: 'human/male-01.png',
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
    abilities: [ABILITIES('swing'), ABILITIES('swing'), ABILITIES('swing'), ABILITIES('swing')]
  },
  humanFemale: {
    name: 'Brawler',
    race: 'human',
    image: 'human/female-01.png',
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
    abilities: [ABILITIES('swing'), ABILITIES('swing'), ABILITIES('block'), ABILITIES('shieldBash')]
  },
  trollMale: {
    name: 'Brawler',
    race: 'troll',
    image: 'troll/male-01.png',
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
  trollFemale: {
    name: 'Brawler',
    race: 'troll',
    image: 'troll/female-01.png',
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
    abilities: [
      ABILITIES('slam', false, {
        overrides: { ticks: 3 }
      }),
      ABILITIES('slam', false, {
        overrides: { ticks: 3 }
      }),
      ABILITIES('slam', false, {
        overrides: { ticks: 3 }
      }),
      ABILITIES('slam', false, {
        overrides: { ticks: 3 }
      })
    ]
  },
  dwarfMale: {
    name: 'Brawler',
    race: 'dwarf',
    image: 'dwarf/male-01.png',
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
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('block'), ABILITIES('shieldBash')]
  },
  dwarfFemale: {
    name: 'Brawler',
    race: 'dwarf',
    image: 'dwarf/female-01.png',
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
    abilities: [
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } }),
      ABILITIES('swing', false, { overrides: { ticks: 4 } })
    ]
  },
  goblinMale: {
    name: 'Brawler',
    race: 'goblin',
    image: 'goblin/male-01.png',
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
  goblinFemale: {
    name: 'Brawler',
    race: 'goblin',
    image: 'goblin/female-01.png',
    size: 1.2,
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
      ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      ABILITIES('stab', false, { overrides: { ticks: 4 } })
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
      'The Succubus is a deadly demon whose elegance masks her savage nature. In battle, she thrives amid chaos, lashing out with razor-sharp claws in a flurry of violent motion.<br /><br />Her signature attack is a whirling dance of destruction, spinning with unrelenting speed to strike all who dare draw near. This devastating technique carves through groups of enemies with merciless efficiency, leaving little chance for escape.',
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
    name: 'Giant rat',
    race: 'creature',
    image: 'creature/rat.png',
    size: 1.15,
    equipment: DEFAULT_EQUIPMENT,
    description:
      'The Giant Rat is a vile and tenacious creature, driven by an insatiable hunger. Its bite is vicious and infectious, leaving deep wounds that continue to bleed long after the initial strike.<br /><br />When not attacking, it retreats to feast on nearby scraps of food. This gluttonous act rapidly restores its health, making it a persistent and frustrating foe to defeat if left unchecked',
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
    description:
      'The Undead is a ghastly remnant of a once-living being, now animated by dark magic. It moves with eerie silence, its cold, lifeless gaze fixed on its prey.<br /><br />Even the slightest touch from this cursed creature is lethal, sapping the strength and vitality of the living. Those who encounter it rarely survive, and those who do are never the same again.',
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
    description:
      'The Golem is a towering sentinel of stone, crafted for war and built to endure. Its immense frame makes it a formidable presence on the battlefield, shrugging off attacks that would shatter lesser foes.<br /><br />When its armor is even partially intact, it draws upon ancient magic to restore its defenses completely, becoming nearly invulnerable once more. Only those who can deplete its armor fully stand a chance of bringing it down.',
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
  },
  trainingDummy: {
    name: 'Training Dummy',
    race: 'creature',
    image: 'creature/training-dummy.png',
    size: 1,
    equipment: DEFAULT_EQUIPMENT,
    description: '',
    element: '',
    combatStats: {
      maxHealth: 40,
      currentHealth: 40,
      damage: 0,
      maxArmor: 0,
      currentArmor: 0,
      limits: {
        wounded: 8,
        concussed: 8,
        exposed: 8
      }
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('harden', false, { overrides: { ticks: 12 } })]
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
