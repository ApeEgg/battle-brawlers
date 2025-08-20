import CHARACTERS from '$src/constants/CHARACTERS';
import seedRandom from 'seedrandom';
import type { Race } from '$src/types/character';
import type { Team } from '$src/types/team';
import type { Combatant } from '$src/types/combatant';
import lodash from 'lodash';
import { generateID } from '$src/helpers';
import type { Ability } from '$src/types/ability';
import { COMBAT_TICK_TIME } from '$src/constants/APP';
import ABILITIES from '$src/constants/ABILITIES';
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

export const prepareCombatant = ({
  name,
  race,
  abilities
}: {
  name: string;
  race: Race;
  abilities: Ability[];
}): Combatant => {
  const combatStats = calculateCombatStats(CHARACTERS[race].combatStats);

  combatStats.currentHealth = combatStats.maxHealth;

  return {
    id: generateID(),
    name,
    race,
    combatStats,
    abilities,
    knockedOut: 0,
    animations: []
  };
};

const bufferAnimation = (eventTaker: Combatant, ability: Ability) => {
  const timestamp = eventTaker.nextEvent as number;
  ability.animation.start = timestamp;
  ability.animation.end = timestamp + ability.animation.duration;
  eventTaker.animations.push(structuredClone(ability));
};

export const generateCombat = (seed: string, teams: Team[]) => {
  let combatants = teams.flatMap((team) =>
    team.combatants.map((combatant) => ({
      teamIndex: team.index,
      nextEvent: combatant.abilities[0].ticks * COMBAT_TICK_TIME,
      ...combatant
    }))
  );

  const events = [];
  let timestamp = 0;
  let i = 0;

  teams = structuredClone(teams);
  while (uniqBy(combatants, 'teamIndex').length > 1) {
    const eventTaker = combatants.reduce((a, b) => (a.nextEvent < b.nextEvent ? a : b));
    const targets = combatants.filter(({ teamIndex }) => teamIndex !== eventTaker.teamIndex);
    const target = targets[seededRandom(0, targets.length - 1, `${seed}_${i}_defender`)];
    timestamp = eventTaker.nextEvent;

    const damage = {
      result: 0
    };

    // if (eventTaker.combatStats.currentEnergy >= 8) {
    //   eventTaker.combatStats.currentEnergy -= 8;

    //   const [ability] = eventTaker.abilities;
    //   eventTaker.abilities = eventTaker.abilities.slice(1);
    //   eventTaker.abilities.push(ability);
    // } else {
    damage.result = eventTaker.combatStats.damage;

    bufferAnimation(eventTaker, ABILITIES.basicAttackRegular);

    // eventTaker.animations.push(bufferAnimation('basicAttackRegular', timestamp));

    target.combatStats.currentHealth -= damage.result;
    // target.animations.push(bufferAnimation('hurt', timestamp));

    eventTaker.combatStats.currentEnergy = Math.min(
      eventTaker.combatStats.maxEnergy,
      eventTaker.combatStats.currentEnergy + 2
    );
    // }

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

    const eventTicks = eventTaker.abilities[0].icon === '1h1h' ? 1 : eventTaker.abilities[0].ticks;
    eventTaker.nextEvent = eventTaker.nextEvent + eventTicks * COMBAT_TICK_TIME;

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
