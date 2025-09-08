import { AbilityType, type Ability, type AbilityRef } from '$src/types/ability';
import VFX from '$src/constants/VFX';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepMerge } from '$src/helpers';

const damageCalc = ({ ticks }: { ticks: number }) => {
  const baseDamage = ticks / 10;
  const addedDamage = (ticks - 1) * 0.2;
  const result = baseDamage + addedDamage;
  return {
    baseDamage,
    addedDamage,
    result
  };
};

const healingCalc = ({ ticks }: { ticks: number }) => {
  const baseHealing = ticks / 10;
  const addedHealing = (ticks - 1) * 0.2;
  const result = (baseHealing + addedHealing) / 10;
  return {
    baseHealing,
    addedHealing,
    result
  };
};

export const ALL_ABILITIES = {
  stab: {
    prettyName: 'Stab',
    type: AbilityType.WindUp,
    description: "Thrust with your weapon's sharp end.",
    ticks: 2,
    icon: 'stab',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
  },
  basicAttackFast: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 2,
    icon: '1h',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
  }, // 8 (80% of 10)
  basicAttackRegular: {
    prettyName: 'Punch',
    type: AbilityType.WindUp,
    description: 'Throw a punch at your opponent.',
    ticks: 2,
    icon: 'punch',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
  }, // 10
  basicAttackSlow: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '1h',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackSlow,
    damageCalc: () => ({ result: 0 }) // No healing
  }, // 16 (160% of 10)
  block: {
    prettyName: 'Shield block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 3,
    icon: 'block',
    basic: true,
    statusEffects: [],
    vfx: VFX.block,
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc: () => ({ result: 0 }), // No damage
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
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
    damageCalc: () => ({ result: 0 }), // No damage
    healingCalc
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
    damageCalc,
    healingCalc: () => ({ result: 0 }) // No healing
  }
};

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
