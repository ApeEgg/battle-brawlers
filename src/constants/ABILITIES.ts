import { AbilityType, type Ability, type AbilityRef } from '$src/types/ability';
import VFX from '$src/constants/VFX';
import entity from '$src/ts/entity';
import type { DynamicObject } from '$src/types/common';
import { deepMerge } from '$src/helpers';

export const ALL_ABILITIES = {
  stab: {
    prettyName: 'Stab',
    type: AbilityType.WindUp,
    description: "Thrust with your weapon's sharp end.",
    ticks: 2,
    icon: 'stab',
    basic: true,
    vfx: VFX.basicAttackFast
  },
  slash: {
    prettyName: 'Slash',
    type: AbilityType.WindUp,
    description: 'Swing your weapon in a wide arc.',
    ticks: 2,
    icon: 'slash',
    basic: true,
    vfx: VFX.basicAttackRegular
  },
  slam: {
    prettyName: 'Slam',
    type: AbilityType.WindUp,
    description: 'Attack your opponent with a devestating slam.',
    ticks: 4,
    icon: 'slam',
    basic: true,
    vfx: VFX.basicAttackSlow
  },
  basicAttackFast: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic one-handed attack.',
    ticks: 2,
    icon: '1h',
    basic: true,
    vfx: VFX.basicAttackFast
  }, // 8 (80% of 10)
  basicAttackRegular: {
    prettyName: 'Punch',
    type: AbilityType.WindUp,
    description: 'Throw a punch at your opponent.',
    ticks: 2,
    icon: 'punch',
    basic: true,
    vfx: VFX.basicAttackFast
  }, // 10
  basicAttackSlow: {
    prettyName: 'Basic attack',
    type: AbilityType.WindUp,
    description: 'Basic two-handed attack.',
    ticks: 4,
    icon: '1h',
    basic: true,
    vfx: VFX.basicAttackSlow
  }, // 16 (160% of 10)
  block: {
    prettyName: 'Shield block',
    type: AbilityType.Channeling,
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 3,
    icon: 'block',
    basic: true,
    vfx: VFX.block
  },
  stun: {
    prettyName: 'Stun',
    type: AbilityType.WindUp,
    description: 'Stun your opponent for the duration of their current ability.',
    ticks: 1,
    icon: 'isStunned',
    basic: false,
    vfx: VFX.stun
  },
  spin: {
    prettyName: 'Spin',
    type: AbilityType.Channeling,
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'spin',
    basic: false,
    vfx: VFX.spin
  },
  lacerate: {
    prettyName: 'Lacerate',
    type: AbilityType.WindUp,
    description: 'Bleeds your opponent for 20% of your total damage for 6 ticks.',
    ticks: 2,
    icon: 'isBleeding',
    basic: false,
    vfx: VFX.basicAttackFast
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
