// import CHARACTERS from '$src/constants/CHARACTERS';
import seedRandom from 'seedrandom';
// import type { Team } from '$src/types/team';
import type { Combatant } from '$src/types/combatant';
import type { Character } from '$src/types/character';
// import lodash from 'lodash';
import type { Ability } from '$src/types/ability';
// import type { CombatEvent } from '$src/types/combat';
// import type { VFX } from '$src/types/vfx';
import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';
import _VFX from '$src/constants/VFX';
import EQUIPMENT from '$src/constants/EQUIPMENT';
// const { uniqBy } = lodash;

// const ABILITY_ORDER = ['block', 'basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'];

export const calculateCombatStats = (...args: any) => {
  const combined = args.reduce((acc: any, obj: any) => {
    for (const [key, value] of Object.entries(obj)) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
  return combined;
};

export const calculateAvailableAbilitiesByCharacter = (character: Character) => {
  return Object.values(character.equipment)
    .filter((e) => e !== null)
    .map((e) => EQUIPMENT[e.id]().abilities)
    .flat();
};

export const calculateCombatStatsByCharacter = (character: Character) => {
  return calculateCombatStats(
    ...[
      character.combatStats,
      ...Object.values(character.equipment)
        .filter((e) => e !== null)
        .map((e) => EQUIPMENT[e.id]().combatStats)
    ]
  );
};

export const calculateTickStart = (abilities: Ability[], index: number) => {
  let tickStart = 0;
  for (let i = 0; i < index; i++) {
    tickStart += abilities[i].ticks;
  }
  return tickStart + abilities[index].ticks;
};

export const prepareCombatant = (
  character: Character,
  teamCount: number,
  combatantCount: number,
  teamIndex: number,
  combatantIndex: number
): Combatant => {
  const rotation = 360 / teamCount;

  const combatStats = calculateCombatStatsByCharacter(character);

  combatStats.currentHealth = combatStats.maxHealth;

  const abilitiesCut = character.abilities.filter(
    (_, i) => calculateTickStart(character.abilities, i) <= character.maxTicks
  );

  const abilitiesCopied = abilitiesCut;

  const abilities = abilitiesCut
    .reduce((a, ability) => {
      return ability?.chainLink
        ? [
            ...a,
            ...Array(ability.chainLink)
              .fill(0)
              .map((_, i) => {
                const { chainLink, ...ab } = ability;

                ab.ticks = (ability.ticks / (ability?.chainLink as number)) as Ability['ticks'];
                if (i + 1 !== ability.chainLink) {
                  ab.chainTo = i + 1;
                }

                return ab;
              })
          ]
        : [...a, ability];
    }, [] as Ability[])
    .reduce((a, ability, i) => {
      const start = a[i - 1]?.end || 0;
      const end = start + ability.ticks * COMBAT_TICK_TIME;
      return [...a, { ...ability, start, end }];
    }, [] as Ability[]);

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
    ...character,
    id: crypto.randomUUID(), // this is needed for debug mode
    teamIndex,
    eventTimestamp: 0,
    eventAbility: abilitiesCut[0].abilityName,
    eventIndex: 0,
    combatStats,
    animations: [],
    injectedAnimations: [],
    position,
    statuses: {
      isBlocking: false,
      isStunned: false,
      knockedOut: 0,
      isBleeding: false
    },
    abilities,
    abilitiesCopied
  };
};

// const bufferAnimation = (combatant: Combatant, vfx: VFX, timestamp: number) => {
//   const delay = vfx.duration * 0.05;
//   vfx.start = timestamp + delay;
//   vfx.end = timestamp + delay + vfx.duration;

//   vfx.id = crypto.randomUUID();

//   combatant.animations.push(structuredClone(vfx)); // Remove structuredClone?
// };

// // TODO: refine this, right now it adds more animations than needed
// const injectAnimation = (
//   eventTaker: Combatant,
//   vfx: VFX,
//   teams: Team[],
//   events: CombatEvent[] = []
// ) => {
//   const [currentAbility] = eventTaker.abilities;
//   const cIndex = teams[eventTaker.teamIndex].combatants.findIndex(({ id }) => id === eventTaker.id);

//   const delay = vfx.duration * 0;

//   vfx.start = eventTaker.eventTimestamp + delay - currentAbility.ticks * COMBAT_TICK_TIME;

//   vfx.end =
//     eventTaker.eventTimestamp + delay + vfx.duration - currentAbility.ticks * COMBAT_TICK_TIME;

//   vfx.id = crypto.randomUUID();

//   eventTaker.injectedAnimations.push(structuredClone(vfx));

//   events.forEach((event) => {
//     if (
//       event.eventTimestamp >=
//       eventTaker.eventTimestamp - currentAbility.ticks * COMBAT_TICK_TIME * 2
//     ) {
//       event.teams[eventTaker.teamIndex].combatants[cIndex].animations.push(
//         ...eventTaker.injectedAnimations
//       );
//     }
//   });
// };

// export const generateCombat = (seed: string, teams: Team[]) => {
//   let combatants = teams.flatMap((team) => team.combatants.map((combatant) => combatant));

//   const events: CombatEvent[] = [];
//   let globalEventIndex = 0;

//   const teamsStartState = structuredClone(teams);
//   teams = structuredClone(teams);
//   while (uniqBy(combatants, 'teamIndex').length > 1) {
//     // const sortedCombatants = combatants.sort((a, b) => {
//     //   const t = a.eventTimestamp - b.eventTimestamp;
//     //   if (t !== 0) return t;

//     //   // rank via indexOf; push unknowns last
//     //   const ra = ABILITY_ORDER.indexOf(a.eventAbility);
//     //   const rb = ABILITY_ORDER.indexOf(b.eventAbility);
//     //   const r =
//     //     (ra === -1 ? Number.POSITIVE_INFINITY : ra) - (rb === -1 ? Number.POSITIVE_INFINITY : rb);
//     //   if (r !== 0) return r;

//     //   // optional final tiebreaker (see below)
//     //   return a.id.localeCompare(b.id);
//     // });
//     // const [eventTaker] = sortedCombatants;
//     const eventTaker = combatants.reduce((a, b) => (a.eventTimestamp < b.eventTimestamp ? a : b));

//     const fillerTick = eventTaker.eventTimestamp === 0;
//     const targets = combatants.filter(({ teamIndex }) => teamIndex !== eventTaker.teamIndex);
//     const target =
//       targets[
//         seededRandom(
//           0,
//           targets.length - 1,
//           `${seed}_${eventTaker.eventIndex + (fillerTick ? 1 : 0)}_defender`
//         )
//       ];
//     const [currentAbility, ...nextAbilities] = eventTaker.abilities;

//     const damage = {
//       result: 0
//     };

//     const isAttacking = [
//       'basicAttackFast',
//       'basicAttackRegular',
//       'basicAttackSlow',
//       'spin'
//     ].includes(currentAbility.abilityName);
//     const isBlocking = target.statuses.isBlocking;
//     const isStunned = eventTaker.statuses.isStunned;

//     if (!fillerTick) {
//       if (!isStunned) {
//         injectAnimation(
//           eventTaker,
//           {
//             ...currentAbility.vfx,
//             targetX: target.position.x,
//             targetY: target.position.y
//           },
//           teams,
//           events
//         );
//       }

//       if (isStunned) {
//         if (!currentAbility.chainTo) {
//           eventTaker.statuses.isStunned = false;
//         }
//       } else if (isAttacking) {
//         if (isBlocking) {
//           bufferAnimation(target, _VFX.attackBlocked, eventTaker.eventTimestamp);
//         } else {
//           damage.result = eventTaker.combatStats.damage;
//           target.combatStats.currentHealth -= damage.result;
//           bufferAnimation(target, _VFX.hurt, eventTaker.eventTimestamp);
//         }
//       } else if (currentAbility.abilityName === 'stun') {
//         target.statuses.isStunned = true;
//       } else if (currentAbility.abilityName === 'lacerate') {
//         target.statuses.isBleeding = true;
//       }

//       eventTaker.statuses.isBlocking = false;
//       if (nextAbilities[0].abilityName === 'block') {
//         eventTaker.statuses.isBlocking = true;
//       }

//       // console.table({
//       //   Round: globalEventIndex,
//       //   Tick: eventTaker.eventTimestamp / COMBAT_TICK_TIME,
//       //   attacker: eventTaker.race,
//       //   ability: currentAbility.abilityName,
//       //   damage: damage.result,
//       //   target: target.race,
//       //   isBlocking,
//       //   targetStatuses: target.statuses
//       // });
//     }

//     const i1 = teams[eventTaker.teamIndex].combatants.findIndex(({ id }) => id === eventTaker.id);
//     teams[eventTaker.teamIndex].combatants[i1] = eventTaker;

//     const i2 = teams[target.teamIndex].combatants.findIndex(({ id }) => id === target.id);
//     teams[target.teamIndex].combatants[i2] = target;

//     teams.forEach((team, teamIndex) => {
//       team.combatants.forEach(({ id, combatStats: { currentHealth } }, i) => {
//         const combatantIndex = combatants.findIndex((c) => c.id === id);

//         if (currentHealth <= 0 && combatantIndex !== -1) {
//           teams[teamIndex].combatants[i].statuses.isBlocking = false;
//           teams[teamIndex].combatants[i].statuses.isStunned = false;
//           teams[teamIndex].combatants[i].statuses.knockedOut = eventTaker.eventTimestamp;
//           teams[teamIndex].combatants[i].combatStats.currentHealth = 0;

//           combatants = [
//             ...combatants.slice(0, combatantIndex),
//             ...combatants.slice(combatantIndex + 1)
//           ];
//         }
//       });
//     });

//     events.push(
//       structuredClone({
//         currentAbility: currentAbility.abilityName,
//         eventTimestamp: eventTaker.eventTimestamp,
//         // globalEventIndex,
//         // eventIndex: eventTaker.eventIndex,
//         // eventTaker,
//         teams
//         // target,
//         // log: {
//         //   damage
//         // }
//       })
//     );

//     // Temporary to exit loop
//     // const removeIndex = seededRandom(0, combatants.length - 1, seed);
//     // combatants = [...combatants.slice(0, removeIndex), ...combatants.slice(removeIndex + 1)];

//     let ticksToNext = currentAbility.ticks;

//     if (!fillerTick) {
//       ticksToNext = nextAbilities[0].ticks;
//       eventTaker.abilities = [...nextAbilities, currentAbility];
//     }

//     eventTaker.eventTimestamp = eventTaker.eventTimestamp + ticksToNext * COMBAT_TICK_TIME;
//     eventTaker.eventIndex++;

//     globalEventIndex++;
//   }

//   const duration = events[events.length - 1]?.eventTimestamp;
//   const teamsEndState = events[events.length - 1].teams;

//   return {
//     events,
//     teamsStartState,
//     teamsEndState,
//     duration
//   };
// };

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
