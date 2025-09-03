import { ABILITY_PRIORITY, COMBAT_TICK_TIME } from '$src/constants/APP';
import type { CombatEvent } from '$src/types/combat';
import type { Team } from '$src/types/team';
import { seededRandom } from '$src/ts/Utils';
import type { Combatant } from '$src/types/combatant';
import type { VFX } from '$src/types/vfx';
import _VFX from '$src/constants/VFX';
import type { Ability } from '$src/types/ability';

const moreThanOneTeamStanding = (teams: Team[]) => {
  const teamsStanding = teams.filter((team) =>
    team.combatants.some((combatant) => combatant.combatStats.currentHealth! > 0)
  );
  return teamsStanding.length > 1;
};

const bufferAnimation = (combatant: Combatant, vfx: VFX, timestamp: number) => {
  const newVFX = structuredClone(vfx);
  // const delay = vfx.duration * 0.05;
  newVFX.start = timestamp;
  newVFX.end = timestamp + vfx.duration;

  newVFX.id = crypto.randomUUID();

  combatant.animations.push(newVFX);
};

// TODO: refine this, right now it adds more animations than needed
const injectAnimation = (
  combatant: Combatant,
  target: Combatant,
  currentAbility: Ability,
  now: number,
  teams: Team[],
  events: CombatEvent[] = []
) => {
  const vfx = structuredClone(currentAbility.vfx);
  const cIndex = teams[combatant.teamIndex].combatants.findIndex(({ id }) => id === combatant.id);

  vfx.start = now - currentAbility.ticks * COMBAT_TICK_TIME;

  vfx.end = now - currentAbility.ticks * COMBAT_TICK_TIME + vfx.duration;

  vfx.id = crypto.randomUUID();
  vfx.targetX = target.position.x;
  vfx.targetY = target.position.y;
  // vfx.injected = true;

  combatant.injectedAnimations.push(vfx);

  events.forEach((event) => {
    if (event.eventTimestamp >= now - currentAbility.ticks * COMBAT_TICK_TIME) {
      event.teams[combatant.teamIndex].combatants[cIndex].animations.push(
        ...combatant.injectedAnimations
      );
    }
  });
};

const pickAbility = (
  abilities: Ability[],
  ability: Ability,
  now: number,
  startOrEnd: 'start' | 'end'
) =>
  now % abilities[abilities.length - 1].end! ===
  ability[startOrEnd]! % abilities[abilities.length - 1].end!;

const sortByAbilityPriority = (
  a: Combatant,
  b: Combatant,
  now: number,
  startOrEnd: 'start' | 'end'
) => {
  const aAbility = a.abilities.find((ability) =>
    pickAbility(a.abilities, ability, now, startOrEnd)
  ) as Ability;
  const bAbility = b.abilities.find((ability) =>
    pickAbility(b.abilities, ability, now, startOrEnd)
  ) as Ability;

  const aPriority = ABILITY_PRIORITY.indexOf(aAbility.abilityName);
  const bPriority = ABILITY_PRIORITY.indexOf(bAbility.abilityName);

  const normalizedAPriority = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
  const normalizedBPriority = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

  if (normalizedAPriority !== normalizedBPriority) return normalizedAPriority - normalizedBPriority;

  return 0;
};

export const generateCombat = (seed: string, teams: Team[]) => {
  const events: CombatEvent[] = [];

  let now = 0;
  let tickCount = 0;

  const teamsStartState = structuredClone(teams);
  teams = structuredClone(teams);

  while (moreThanOneTeamStanding(teams)) {
    // console.info(`--- Tick ${tickCount} at ${now}ms ---`);
    const stillStandingCombatants = teams
      .flatMap((team) => team.combatants.map((combatant) => combatant))
      .filter((combatant) => combatant.combatStats.currentHealth > 0);

    const combatantsStartingAbility = stillStandingCombatants.filter((combatant) =>
      combatant.abilities.some((ability) => pickAbility(combatant.abilities, ability, now, 'start'))
    );
    const combatantsEndingAbility = stillStandingCombatants.filter((combatant) =>
      combatant.abilities.some((ability) => pickAbility(combatant.abilities, ability, now, 'end'))
    );

    const orderedCombatantsStartingAbility = combatantsStartingAbility.sort(
      (a: Combatant, b: Combatant) => sortByAbilityPriority(a, b, now, 'start')
    );
    const orderedCombatantsEndingAbility = combatantsEndingAbility.sort(
      (a: Combatant, b: Combatant) => sortByAbilityPriority(a, b, now, 'end')
    );

    // START OF ABILITY
    orderedCombatantsStartingAbility.forEach((combatant) => {
      const currentAbilityIndex = combatant.abilities.findIndex((ability) =>
        pickAbility(combatant.abilities, ability, now, 'start')
      );
      const currentAbility = combatant.abilities[currentAbilityIndex];

      if (currentAbility.abilityName === 'block') {
        combatant.statuses.isBlocking = true;
      }
    });

    // END OF ABILITY
    orderedCombatantsEndingAbility.forEach((combatant) => {
      const targetableCombatants = stillStandingCombatants.filter(
        ({ teamIndex }) => teamIndex !== combatant.teamIndex
      );
      const currentAbilityIndex = combatant.abilities.findIndex((ability) =>
        pickAbility(combatant.abilities, ability, now, 'end')
      );
      const currentAbility = combatant.abilities[currentAbilityIndex];

      const target =
        targetableCombatants[
          seededRandom(
            0,
            targetableCombatants.length - 1,
            `${seed}_${currentAbilityIndex}_${now}_defender`
          )
        ];

      const damage = {
        result: 0
      };

      const isAttacking = [
        'basicAttackFast',
        'basicAttackRegular',
        'basicAttackSlow',
        'spin'
      ].includes(currentAbility.abilityName);
      const isStunned = combatant.statuses.isStunned;
      const isBlocking = target.statuses.isBlocking;

      if (now > 0) {
        if (!isStunned) {
          injectAnimation(combatant, target, currentAbility, now, teams, events);
        }

        if (isStunned) {
          if (!currentAbility.chainTo) {
            combatant.statuses.isStunned = false;
          }
        } else if (isAttacking) {
          if (isBlocking) {
            bufferAnimation(target, _VFX.attackBlocked, now);
          } else {
            damage.result = combatant.combatStats.damage;
            target.combatStats.currentHealth -= damage.result;
            bufferAnimation(target, _VFX.hurt, now);
          }
        } else if (currentAbility.abilityName === 'stun') {
          target.statuses.isStunned = true;
        } else if (currentAbility.abilityName === 'lacerate') {
          target.statuses.isBleeding = true;
        } else if (currentAbility.abilityName === 'block') {
          combatant.statuses.isBlocking = false;
        }
      }

      // console.table({
      //   Tick: tickCount,
      //   attacker: combatant.race,
      //   ability: currentAbility.abilityName,
      //   damage: damage.result,
      //   target: target.race,
      //   isBlocking,
      //   targetStatuses: target.statuses
      // });

      if (target.combatStats.currentHealth <= 0) {
        target.statuses.knockedOut = now;
      }

      events.push(
        structuredClone({
          eventTimestamp: now,
          teams
        })
      );
    });

    now += COMBAT_TICK_TIME;
    tickCount += 1;

    // if (tickCount > 100) {
    //   console.warn('Breaking out of combat loop after 24 ticks.');
    //   break;
    // }
  }

  const duration = events[events.length - 1]?.eventTimestamp;
  const teamsEndState = events[events.length - 1].teams;

  return {
    events,
    teamsStartState,
    teamsEndState,
    duration
  };
};
