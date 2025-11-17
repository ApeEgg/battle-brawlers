import type { Character, CharacterRef, Race } from '$src/types/character';
import ABILITIES from '$src/constants/ABILITIES';
import type { DynamicObject } from '$src/types/common';
import entity from '$src/ts/entity';
import { deepMerge } from '$src/helpers';
import EQUIPMENT from '$src/constants/EQUIPMENT';

export type CharacterKey = Race | 'creature';

const DEFAULT_MAX_HP = 24;
const DEFAULT_DAMAGE = 8;
const DEFAULT_MAX_TICKS = 12;
const DEFAULT_LUCKY_STATS = {
  criticalChance: 0.05,
  criticalDamage: 0.5,
  dodgeChance: 0.05,
  blockChance: 0
  // magicChance: 0
};
const DEFAULT_LIMITS = {
  wounded: 8,
  concussed: 8,
  exposed: 8
};

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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...{
        ...DEFAULT_LUCKY_STATS
        // dodgeChance: 0
      },
      limits: DEFAULT_LIMITS
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce'), ABILITIES('pierce')]
  },
  elfFemale: {
    name: 'Brawler',
    race: 'elf',
    image: 'elf/female-01.png',
    size: 1.05,
    equipment: { ...DEFAULT_EQUIPMENT, mainHand: EQUIPMENT('bow') },
    description: '',
    // woundLimit: 8,
    // concussionLimit: 8,
    // comboLimit: 8,
    // exosedLimit: 8,
    element: 'nature',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 10,
      currentArmor: 10,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [
      ABILITIES('pierce'), //, false, { overrides: { ticks: 12 } }),
      ABILITIES('pierce'),
      ABILITIES('pierce'),
      ABILITIES('pierce')
    ]
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...{
        ...DEFAULT_LUCKY_STATS
        // criticalChance: 0.8
      },
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: DEFAULT_MAX_TICKS,
    abilities: [
      // ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      // ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      // ABILITIES('stab', false, { overrides: { ticks: 4 } })
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('swing'),
      ABILITIES('swing')
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
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
      maxArmor: 100,
      currentArmor: 100,
      damage: DEFAULT_DAMAGE,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('slam'), ABILITIES('slam'), ABILITIES('slam'), ABILITIES('harden')]
  },
  trainingDummy: {
    name: 'Training Dummy',
    race: 'creature',
    image: 'creature/training-dummy.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
      // offHand: EQUIPMENT('shield')
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: 20,
      currentHealth: 20,
      maxArmor: 0,
      currentArmor: 0,
      damage: 0,
      ...{
        ...DEFAULT_LUCKY_STATS
        // dodgeChance: 0.5
      },
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [ABILITIES('playingTheVictim')]
  },
  boar: {
    name: 'Boar',
    race: 'creature',
    image: 'creature/boar.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...{
        ...DEFAULT_LUCKY_STATS
        // dodgeChance: 0.6
      },
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
  },
  jester: {
    name: 'Jester',
    race: 'creature',
    image: 'creature/jester.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
  },
  lostCivilian: {
    name: 'Lost civilian',
    race: 'creature',
    image: 'creature/lost-civilian.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT,
      mainHand: EQUIPMENT('dagger', false, { overrides: { level: 5 } })
      // offHand: EQUIPMENT('shield')
    },
    description: 'This civilian took the wrong turn when going shopping and ended up in the arena.',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
  },
  nomad: {
    name: 'Nomad',
    race: 'creature',
    image: 'creature/nomad.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT,
      accessory: EQUIPMENT('ring')
    },
    description:
      'The nomad is a wanderer from the outer dunes, a survivor of endless storms and scorching suns. Cloaked in weathered leathers and cloth dyed by the sand itself, they carry the dust of a thousand miles on their shoulders. Their weapons are mismatched yet deadly — a curved blade forged from scavenged steel and a handmade bow strung with sinew. Years of solitude have honed their reflexes and instincts beyond human measure; they fight not for glory but for survival, their every motion born of necessity. Their silence speaks of exile, their gaze of battles fought in forgotten places.',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      ABILITIES('stab', false, { overrides: { ticks: 4 } }),
      ABILITIES('stab', false, { overrides: { ticks: 4 } })
    ]
  },
  pitchforkPatrick: {
    name: 'Pitchfork Patrick',
    race: 'creature',
    image: 'creature/pitchfork-patrick.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
  },
  poorestKnightInTown: {
    name: 'Poorest Knight in Town',
    race: 'creature',
    image: 'creature/poorest-knight-in-town.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
  },
  sabertoothTiger: {
    name: 'Sabertooth Tiger',
    race: 'creature',
    image: 'creature/sabertooth-tiger.png',
    size: 1,
    equipment: {
      ...DEFAULT_EQUIPMENT
    },
    description: '',
    element: '',
    combatStats: {
      maxHealth: DEFAULT_MAX_HP,
      currentHealth: DEFAULT_MAX_HP,
      maxArmor: 0,
      currentArmor: 0,
      damage: DEFAULT_DAMAGE,
      ...DEFAULT_LUCKY_STATS,
      limits: DEFAULT_LIMITS
    },
    maxTicks: Infinity,
    abilities: [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ]
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
