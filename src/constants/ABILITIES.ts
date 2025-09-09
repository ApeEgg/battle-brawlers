import { AbilityType, type Ability, type AbilityRef } from '$src/types/ability';
import VFX from '$src/constants/VFX';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepMerge } from '$src/helpers';

const ALL_ABILITIES = {
  stab: {
    prettyName: 'Stab',
    type: AbilityType.WindUp,
    description: "Thrust with your weapon's sharp end.",
    ticks: 2,
    icon: 'stab',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    damageModifier: 0,
    healingModifier: null
  },
  slash: {
    prettyName: 'Slash',
    type: AbilityType.WindUp,
    description: 'Swing your weapon in a wide arc.',
    ticks: 2,
    icon: 'slash',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackRegular,
    damageModifier: 0,
    healingModifier: null
  },
  slam: {
    prettyName: 'Slam',
    type: AbilityType.WindUp,
    description: 'Attack your opponent with a devestating slam.',
    ticks: 4,
    icon: 'slam',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackSlow,
    damageModifier: 0,
    healingModifier: null
  },
  punch: {
    prettyName: 'Punch',
    type: AbilityType.WindUp,
    description: 'Throw a punch at your opponent.',
    ticks: 2,
    icon: 'punch',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    damageModifier: -0.2,
    healingModifier: null
  },
  block: {
    prettyName: 'Block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 4,
    icon: 'block',
    basic: true,
    statusEffects: [],
    vfx: VFX.block,
    damageModifier: null,
    healingModifier: null
  },
  shieldBash: {
    prettyName: 'Shield Bash',
    type: AbilityType.WindUp,
    description: 'Lunge forward and bash your opponent with your shield.',
    ticks: 3,
    icon: 'shieldBash',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackRegular,
    damageModifier: 0,
    healingModifier: null
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
    healingModifier: null
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
    healingModifier: null
  },
  lacerate: {
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Bleeds your opponent for 20% of your total damage for 6 ticks.',
    ticks: 2,
    icon: 'lacerate',
    basic: false,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    damageModifier: 0,
    healingModifier: null
  },
  bowshot: {
    prettyName: 'Bow Shot',
    type: AbilityType.WindUp,
    description: 'Shoot an arrow at your opponent.',
    ticks: 3,
    icon: 'bowshot',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackSlow,
    damageModifier: 0,
    healingModifier: null
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
    healingModifier: 0
  },
  bite: {
    prettyName: 'Bite',
    type: AbilityType.WindUp,
    description: 'A vicious bite that causes bleeding.',
    ticks: 2,
    icon: 'bite',
    basic: true,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    damageModifier: 0,
    healingModifier: null
  }
};

const scalingCalc = (ticks: number, modifier: number = 0) => {
  if (modifier === null) return;

  const base = ticks / 10;
  const added = (ticks - 1) * 0.2 + modifier;
  const result = base + added; // divide by 10 for healing

  return {
    base,
    added,
    result
  };
};

function damageCalc(this: Ability) {
  const ticks = this.chainLink || this.ticks;
  const scaled = scalingCalc(ticks, this.damageModifier);
  return scaled;
}

function healingCalc(this: Ability) {
  const ticks = this.chainLink || this.ticks;
  const scaled = scalingCalc(ticks, this.healingModifier);
  return scaled;
}

for (const ability of Object.values(ALL_ABILITIES)) {
  Object.defineProperty(ability, 'calc', {
    enumerable: true,
    get() {
      return {
        damage: damageCalc.bind(this),
        healing: healingCalc.bind(this)
      };
    }
  });
}

export default (id: string | AbilityRef, fullBody: boolean = false, meta?: DynamicObject) =>
  entity(
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
