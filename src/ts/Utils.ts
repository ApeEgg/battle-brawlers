import CHARACTERS from '$src/constants/CHARACTERS';
import seedRandom from 'seedrandom';
import type { Team } from '$src/types/team';
import type { Combatant } from '$src/types/combatant';
import lodash from 'lodash';
import { generateID } from '$src/helpers';
import type { Ability } from '$src/types/ability';
import type { VFX } from '$src/types/vfx';
import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';
import _VFX from '$src/constants/VFX';
const { uniqBy } = lodash;

export const calculateCombatStats = (...args: any) => {
  const combined = args.reduce((acc: any, obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
  return combined;
};

export const prepareCombatant = (
  combatant: Combatant,
  rotation: number,
  combatantCount: number,
  teamIndex: number,
  combatantIndex: number
): Combatant => {
  const combatStats = calculateCombatStats(CHARACTERS[combatant.race].combatStats);

  combatStats.currentHealth = combatStats.maxHealth;

  const abilitiesCopied = combatant.abilities
    .reduce<Ability[]>(
      (a, ability, i) =>
        ability.abilityName === 'basicAttackFast' &&
        a[i - 1]?.abilityName === 'basicAttackFast' &&
        a[i - 1]?.ticks === 2
          ? [...a.slice(0, -1), { ...a[a.length - 1], ticks: 0 }, { ...ability, ticks: 4 }]
          : [...a, ability],

      []
    )
    .filter(({ abilityName, ticks }) => !(abilityName === 'basicAttackFast' && ticks === 0));

  const radius = COMBAT_RING_BASE_RADIUS;

  const rot =
    teamIndex * rotation +
    270 -
    rotation / 2 +
    (rotation / (combatantCount + 1)) * (combatantIndex + 1);

  const rotRadians = (rot * Math.PI) / 180;
  const position = {
    x: Math.sin(rotRadians) * radius,
    y: Math.cos(rotRadians) * radius,
    rot
  };

  return {
    ...combatant,
    id: generateID(),
    combatStats,
    animations: [],
    position,
    statuses: {
      isBlocking: false,
      knockedOut: 0
    },
    abilitiesCopied
  };
};

const bufferAnimation = (combatant: Combatant, vfx: VFX, timestamp: number) => {
  const delay = vfx.duration * 0.1;
  vfx.start = timestamp + delay;
  vfx.end = timestamp + delay + vfx.duration;

  vfx.id = generateID();
  combatant.animations.push(structuredClone(vfx)); // Remove structuredClone?
};

export const generateCombat = (seed: string, teams: Team[]) => {
  let combatants = teams.flatMap((team) =>
    team.combatants.map((combatant) => ({
      teamIndex: team.index,
      nextAbilityTimestamp: 0,
      ...combatant
    }))
  );

  const events = [];
  let timestamp = 0;
  let i = 0;

  teams = structuredClone(teams);
  while (uniqBy(combatants, 'teamIndex').length > 1) {
    const eventTaker = combatants.reduce((a, b) =>
      a.nextAbilityTimestamp < b.nextAbilityTimestamp ? a : b
    );
    timestamp = eventTaker.nextAbilityTimestamp;
    const targets = combatants.filter(({ teamIndex }) => teamIndex !== eventTaker.teamIndex);
    const target = targets[seededRandom(0, targets.length - 1, `${seed}_${i}_defender`)];
    const [currentAbility, ...restAbilities] = eventTaker.abilities;
    const previousAbility = restAbilities[restAbilities.length - 1];
    const combatStart = timestamp === 0;

    const damage = {
      result: 0
    };

    const isAttacking = ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
      previousAbility.abilityName
    );
    const isBlocking = target.statuses.isBlocking;

    // 1. Resolve previous ability outcome
    if (!combatStart) {
      damage.result = eventTaker.combatStats.damage;

      if (isAttacking) {
        if (isBlocking) {
          bufferAnimation(target, _VFX.attackBlocked, timestamp);
        } else {
          target.combatStats.currentHealth -= damage.result;
          bufferAnimation(target, _VFX.hurt, timestamp);
        }
      }
    }

    // console.table({
    //   Round: i,
    //   Tick: timestamp / COMBAT_TICK_TIME,
    //   attacker: eventTaker.race,
    //   damage: damage.result,
    //   target: target.race,
    //   isBlocking,
    //   targetStatuses: target.statuses
    //   // targetAbilities: target.abilities,
    //   // targetAbilitiesCopied: target.abilitiesCopied
    // });

    // 2. Start current ability animation
    eventTaker.statuses.isBlocking = false;
    if (currentAbility.abilityName === 'block') {
      eventTaker.statuses.isBlocking = true;
    }
    bufferAnimation(
      eventTaker,
      { ...currentAbility.vfx, targetX: target.position.x, targetY: target.position.y },
      timestamp
    );

    const i1 = teams[eventTaker.teamIndex].combatants.findIndex(({ id }) => id === eventTaker.id);
    teams[eventTaker.teamIndex].combatants[i1] = eventTaker;

    const i2 = teams[target.teamIndex].combatants.findIndex(({ id }) => id === target.id);
    teams[target.teamIndex].combatants[i2] = target;

    teams.forEach((team, teamIndex) => {
      team.combatants.forEach(({ id, combatStats: { currentHealth } }, i) => {
        const combatantIndex = combatants.findIndex((c) => c.id === id);

        if (currentHealth <= 0 && combatantIndex !== -1) {
          teams[teamIndex].combatants[i].statuses.knockedOut = timestamp;
          teams[teamIndex].combatants[i].combatStats.currentHealth = 0;
          combatants = [
            ...combatants.slice(0, combatantIndex),
            ...combatants.slice(combatantIndex + 1)
          ];
        }
      });
    });

    events.push(
      structuredClone({
        timestamp,
        eventTaker,
        teams,
        target,
        log: {
          damage
        }
      })
    );

    // Temporary to exit loop
    // const removeIndex = seededRandom(0, combatants.length - 1, seed);
    // combatants = [...combatants.slice(0, removeIndex), ...combatants.slice(removeIndex + 1)];

    eventTaker.nextAbilityTimestamp = timestamp + currentAbility.ticks * COMBAT_TICK_TIME;
    eventTaker.abilities = [...restAbilities, currentAbility];

    i++;
  }

  const duration = events[events.length - 1]?.timestamp;

  return {
    events,
    teams,
    duration
  };
};

export const seededRandom = (min: number, max: number, string: string) =>
  random(min, max, seedRandom(string)());

export const random = (min: number, max: number, factor = Math.random()) =>
  Math.floor(factor * (max - min + 1) + min);

export const colorStrength = (col: any, amt: any) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
