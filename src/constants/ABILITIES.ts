import { AbilityType, type Ability, type AbilityRef } from '$src/types/ability';
import VFX from '$src/constants/VFX';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepMerge } from '$src/helpers';

export const ALL_ABILITIES = {
  stab: {
    prettyName: 'Stab',
    type: AbilityType.WindUp,
    description: '', //"Thrust with your weapon's sharp end.",
    ticks: 2,
    icon: 'stab',
    basic: true,
    statusEffects: ['isWounded'],
    vfx: VFX.basicAttackFast,
    damageModifier: -0.05,
    healingModifier: null,
    durationModifier: null
  },
  swing: {
    prettyName: 'Swing',
    type: AbilityType.WindUp,
    description: '', // 'Swing your weapon in a wide arc.',
    ticks: 3,
    icon: 'slash',
    basic: true,
    statusEffects: ['isExposed'],
    vfx: VFX.basicAttackRegular,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: null
  },
  slam: {
    prettyName: 'Slam',
    type: AbilityType.WindUp,
    description: '', //'Attack your opponent with a devestating slam.',
    ticks: 4,
    icon: 'slam',
    basic: true,
    statusEffects: ['isConcussed'],
    vfx: VFX.basicAttackSlow,
    damageModifier: 0.05,
    healingModifier: null,
    durationModifier: null
  },
  punch: {
    prettyName: 'Punch',
    type: AbilityType.WindUp,
    description: '', //'Throw a punch at your opponent.',
    ticks: 2,
    icon: 'punch',
    basic: true,
    statusEffects: ['isConcussed'],
    vfx: VFX.basicAttackFast,
    damageModifier: -0.1,
    healingModifier: null,
    durationModifier: null
  },
  block: {
    prettyName: 'Block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 3,
    icon: 'block',
    basic: true,
    statusEffects: [],
    vfx: VFX.block,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 0
  },
  shieldBash: {
    prettyName: 'Shield Bash',
    type: AbilityType.WindUp,
    description: 'Lunge forward and bash your opponent with your shield.',
    ticks: 3,
    icon: 'shieldBash',
    basic: true,
    statusEffects: ['isStunned'],
    vfx: VFX.basicAttackRegular,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: null
  },
  kick: {
    prettyName: 'Kick',
    type: AbilityType.WindUp,
    description: 'Kick your opponent, stunning them for the duration of their current ability.',
    ticks: 1,
    icon: 'kick',
    basic: false,
    statusEffects: ['isStunned'],
    vfx: VFX.kick,
    damageModifier: null,
    healingModifier: null,
    durationModifier: Infinity
  },
  whirlwind: {
    prettyName: 'Whirlwind',
    type: AbilityType.Channeling,
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'whirlwind',
    basic: false,
    statusEffects: [],
    vfx: VFX.whirlwind,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: 0
  },
  lacerate: {
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Bleeds your opponent for 20% of your total damage.',
    ticks: 2,
    icon: 'lacerate',
    basic: false,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 1
  },
  demoralizingShout: {
    prettyName: 'Demoralizing Shout',
    type: AbilityType.WindUp,
    description: 'Weakens your opponent. They take 50% more damage for the duration of the effect.',
    ticks: 2,
    icon: 'demoShout',
    basic: false,
    statusEffects: ['isVulnerable'],
    vfx: VFX.filler,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 2
  },
  bowshot: {
    prettyName: 'Bow Shot',
    type: AbilityType.WindUp,
    description: 'Fire an arrow at your foe.',
    ticks: 3,
    icon: 'bowshot',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackSlow,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: null
  },
  cheesyTactics: {
    prettyName: 'Cheesy Tactics',
    type: AbilityType.Channeling,
    description: 'Restores some health.',
    ticks: 9,
    chainLink: 3,
    icon: 'cheese',
    basic: true,
    statusEffects: [],
    vfx: VFX.heal,
    damageModifier: null,
    healingModifier: 0,
    durationModifier: 0
  },
  bite: {
    prettyName: 'Bite',
    type: AbilityType.WindUp,
    description: 'A vicious bite.<br />',
    ticks: 2,
    icon: 'bite',
    basic: true,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: 4
  },
  harden: {
    prettyName: 'Harden',
    type: AbilityType.WindUp,
    description: "If armor isn't depleted regain all armor.",
    ticks: 1,
    icon: 'fillArmor',
    basic: true,
    statusEffects: [],
    vfx: VFX.heal,
    damageModifier: null,
    healingModifier: null,
    durationModifier: null
  }
};

const scalingCalc = (ticks: number, modifier: number = 0) => {
  if (modifier === null) return;

  const base = 0.1 * (ticks + 1);
  const added = modifier; // ticks * (0.2 + modifier);
  const result = (base + added).toFixed(2); // divide by 10 for healing

  return {
    base,
    added,
    result
  };
};

function damageCalc(this: Ability) {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;

  const scaled = scalingCalc(ticks, this.damageModifier);
  return scaled;
}

function healingCalc(this: Ability) {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;
  const scaled = scalingCalc(ticks, this.healingModifier);
  return scaled;
}

function durationCalc(this: Ability) {
  if (this.durationModifier === null) return;
  const ticks = this.ticks;

  return {
    result: ticks * (1 + this.durationModifier)
  };
}

// for (const ability of Object.values(ALL_ABILITIES)) {
//   Object.defineProperty(ability, 'calc', {
//     enumerable: true,
//     get() {
//       return {
//         damage: damageCalc.bind(this),
//         healing: healingCalc.bind(this)
//       };
//     }
//   });
// }

function attachCalcs(a: Ability) {
  Object.defineProperty(a, 'calc', {
    enumerable: true,
    get() {
      return {
        damage: damageCalc.bind(a),
        healing: healingCalc.bind(a),
        duration: durationCalc.bind(a)
      };
    }
  });
  return a;
}

export default (id: string | AbilityRef, fullBody: boolean = false, meta?: DynamicObject) => {
  const ent = entity(
    ALL_ABILITIES,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody,
    typeof id === 'string'
      ? meta?.overrides
      : meta?.overrides
        ? deepMerge(id.overrides || {}, meta.overrides || {})
        : id.overrides
  ) as Ability;

  return fullBody ? attachCalcs(ent) : ent;
};
