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

export const ALL_ABILITIES = {
  stab: {
    prettyName: 'Stab',
    type: AbilityType.WindUp,
    description: "Thrust with your weapon's sharp end.",
    ticks: 2,
    icon: 'stab',
    basic: true,
    vfx: VFX.basicAttackFast,
    damageCalc
  },
  slash: {
    prettyName: 'Slash',
    type: AbilityType.WindUp,
    description: 'Swing your weapon in a wide arc.',
    ticks: 2,
    icon: 'slash',
    basic: true,
    vfx: VFX.basicAttackRegular,
    damageCalc
  },
  slam: {
    prettyName: 'Slam',
    type: AbilityType.WindUp,
    description: 'Attack your opponent with a devestating slam.',
    ticks: 4,
    icon: 'slam',
    basic: true,
    vfx: VFX.basicAttackSlow,
    damageCalc
  },
  basicAttackFast: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 2,
    icon: '1h',
    basic: true,
    vfx: VFX.basicAttackFast,
    damageCalc
  }, // 8 (80% of 10)
  basicAttackRegular: {
    prettyName: 'Punch',
    type: AbilityType.WindUp,
    description: 'Throw a punch at your opponent.',
    ticks: 2,
    icon: 'punch',
    basic: true,
    vfx: VFX.basicAttackFast,
    damageCalc
  }, // 10
  basicAttackSlow: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '1h',
    basic: true,
    vfx: VFX.basicAttackSlow,
    damageCalc
  }, // 16 (160% of 10)
  block: {
    prettyName: 'Shield block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 3,
    icon: 'block',
    basic: true,
    vfx: VFX.block,
    damageCalc
  },
  stun: {
    prettyName: 'Stun',
    type: AbilityType.WindUp,
    description: 'Stun your opponent for the duration of their current ability.',
    ticks: 1,
    icon: 'isStunned',
    basic: false,
    vfx: VFX.stun,
    damageCalc
  },
  whirlwind: {
    prettyName: 'Whirlwind',
    type: AbilityType.Channeling,
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'spin',
    basic: false,
    vfx: VFX.whirlwind,
    damageCalc
  },
  lacerate: {
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Bleeds your opponent for 20% of your total damage for 6 ticks.',
    ticks: 2,
    icon: 'isBleeding',
    basic: false,
    vfx: VFX.basicAttackFast,
    damageCalc
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
