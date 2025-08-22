import CHARACTERS from '$src/constants/CHARACTERS';
import seedRandom from 'seedrandom';
import type { Race } from '$src/types/character';
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
  {
    name,
    race,
    abilities
  }: {
    name: string;
    race: Race;
    abilities: Ability[];
  },
  rotation: number,
  combatantCount: number,
  teamIndex: number,
  combatantIndex: number
): Combatant => {
  const combatStats = calculateCombatStats(CHARACTERS[race].combatStats);

  combatStats.currentHealth = combatStats.maxHealth;

  const abilitiesCopied = abilities
    .reduce<Ability[]>(
      (a, ability, i) =>
        ability.abilityName === 'basicAttackFast' &&
        a[i - 1]?.abilityName === 'basicAttackFast' &&
        a[i - 1]?.ticks === 1
          ? [...a.slice(0, -1), { ...a[a.length - 1], ticks: 0 }, { ...ability, ticks: 2 }]
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
    id: generateID(),
    name,
    race,
    combatStats,
    knockedOut: 0,
    animations: [],
    position,
    abilities,
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
    const previousAbility = restAbilities[eventTaker.abilities.length - 1];
    const combatStart = timestamp === 0;

    const damage = {
      result: 0
    };

    // 1. Resolve previous ability outcome
    if (!combatStart) {
      damage.result = eventTaker.combatStats.damage;

      // eventTaker.animations.push(bufferAnimation('basicAttackRegular', timestamp));
      if (
        ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
          currentAbility.abilityName
        )
      ) {
        target.combatStats.currentHealth -= damage.result;

        bufferAnimation(target, _VFX.hurt, timestamp);
      }

      // eventTaker.combatStats.currentEnergy = Math.min(
      //   eventTaker.combatStats.maxEnergy,
      //   eventTaker.combatStats.currentEnergy + 2
      // );
      // }
    }

    // 2. Start current ability animation
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
          teams[teamIndex].combatants[i].knockedOut = timestamp;
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
