<script lang="ts">
  import { onDestroy } from 'svelte';
  import { prepareCombatant, generateCombat, seededRandom } from '$src/ts/Utils';
  import type { Team } from '$src/types/team';
  import type { Ability } from '$src/types/ability';
  import type { Character } from '$src/types/character';
  import ABILITIES from '$src/constants/ABILITIES';

  import CombatArena from '$src/components/combat/CombatArena.svelte';
  import CombatantCard from '$src/components/combat/CombatantCard.svelte';

  const abilities1: Ability[] = [
    ABILITIES.basicAttackSlow,
    ABILITIES.basicAttackSlow,
    ABILITIES.basicAttackSlow,
    ABILITIES.basicAttackSlow
  ];

  const abilities2: Ability[] = [
    ABILITIES.basicAttackFast,
    ABILITIES.basicAttackFast,
    ABILITIES.basicAttackFast,
    ABILITIES.basicAttackFast,
    ABILITIES.basicAttackFast,
    ABILITIES.basicAttackFast
  ];

  const abilities3: Ability[] = [
    ABILITIES.basicAttackRegular,
    ABILITIES.basicAttackRegular,
    ABILITIES.basicAttackRegular,
    ABILITIES.basicAttackRegular,
    ABILITIES.basicAttackRegular,
    ABILITIES.basicAttackRegular
  ];

  const getGeometry = (N: number, { baseRadius = 208, itemWidth = 226, gap = 0 } = {}) => {
    const C_base = 2 * Math.PI * baseRadius;
    const C_item = Math.max(1, N) * (itemWidth + gap); // avoid divide-by-zero
    const scale = Math.min(1, C_base / C_item); // 1–2 stay full size, 3+ shrink
    return { scale };
  };

  let teams = $state<Team[]>([]);
  let rotation = $state(360);
  let teamCount = $state(3);
  let combatantCount = $state(1);
  let geometry = $derived(getGeometry(combatantCount * teamCount));
  let loopId: any;
  let startTimestamp = $state(0);
  let lastTimestamp = 0;
  let elapsedMilliseconds = 0;

  let characters: Character[] = [
    {
      name: 'npc1',
      race: 'elf',
      abilities: abilities2
    },
    {
      name: 'npc2',
      race: 'human',
      abilities: abilities3
    },
    {
      name: 'npc3',
      race: 'troll',
      abilities: abilities1
    },
    {
      name: 'npc4',
      race: 'dwarf',
      abilities: abilities3
    }
  ];

  const initializeCombat = () => {
    const nextCombatants = (u: number) =>
      Array.from({ length: combatantCount }, (_, i) => {
        return prepareCombatant(
          characters[seededRandom(0, characters.length - 1, `race__${i}_${u}`)]
        ); //  `racdfswjk${i}_${u}` four races
      });

    const nextTeams = Array.from({ length: teamCount }, (_, index) => ({
      name: `Team ${index}`,
      index,
      combatants: nextCombatants(index)
    }));

    teams = nextTeams;
    rotation = 360 / teamCount;
  };

  const loop = (timestamp: number) => {
    if (!startTimestamp) {
      startTimestamp = timestamp;
      lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - lastTimestamp; // time since last frame
    elapsedMilliseconds += deltaTime; // add to running total
    lastTimestamp = timestamp;
    let [event] = app.combat.events;
    // console.log(elapsedMilliseconds, $state.snapshot(action));

    if (elapsedMilliseconds > event?.timestamp) {
      // console.log('hehue', $state.snapshot(action.teams));
      teams = event.teams;

      const [_, ...newEvents] = app.combat.events;
      app.combat.events = newEvents;
    }
    // while (elapsedMilliseconds > action?.timestamp) {
    //   console.log('here');
    //   // teams = action.teams;

    //   // console.log($state.snapshot(teams));

    // const [_, ...newActions] = $combat.actions;
    // $combat.actions = newActions;
    // }

    loopId = requestAnimationFrame(loop);
  };

  const runCombat = () => {
    app.combat = generateCombat('myseed', $state.snapshot(teams));
    startTimestamp = 0; // reset so first loop call sets it
    elapsedMilliseconds = 0;
    loopId = requestAnimationFrame(loop);
  };

  $effect(() => {
    initializeCombat();
  });

  onDestroy(() => {
    cancelAnimationFrame(loopId);
  });
</script>

<Row class="min-h-screen flex-1 gap-2 pt-20" up>
  <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
    left side
    <!-- <code class="text-xs">
      <pre>
      {JSON.stringify(teams, null, 2)}
    </pre>
    </code> -->
  </div>
  <div class="h-full flex-1 rounded border border-gray-400 bg-white">
    <CombatArena>
      {#if teams.length}
        {#each teams as { combatants }, index (`team_${index}`)}
          {#each combatants as combatant, c (`team_${index}_combatant_${combatant.id}`)}
            {@const rot =
              index * rotation +
              270 -
              rotation / 2 +
              (rotation / (combatants.length + 1)) * (c + 1)}
            {@const raw = Math.round(Math.abs(Math.abs(rot - 540) - 180))}
            {@const z = Math.floor((raw / 180) * 9) + 1}
            {@const angleDiff = ((rot - 0 + 540) % 360) - 180}
            <div class="diameter" style={`transform: rotate(${rot}deg); z-index: ${z};`}>
              <div
                class="edge"
                style={`transform: scale(${geometry.scale}) translate(-50%, -50%) rotate(-${rot}deg);`}
              >
                <CombatantCard {...combatant} facingRight={angleDiff < 0}></CombatantCard>
              </div>
            </div>
          {/each}
          <!--<TeamBadge
        {index}
        rotation={index * rotation + 270}
        scale={geometry.scale}
      />-->
        {/each}
      {/if}
    </CombatArena>
  </div>

  <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
    Teams {teamCount}:
    <br /><input type="range" min="1" max="8" bind:value={teamCount} />
    <br />
    Combatants {combatantCount}:
    <br /><input type="range" min="1" max="6" bind:value={combatantCount} />
    <br />

    <Button onclick={runCombat} disabled={!teams.length}>Run combat</Button>
    <Button onclick={() => cancelAnimationFrame(loopId)} disabled={!teams.length}>
      Cancel combat
    </Button>
  </div>
</Row>

<style>
  .diameter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 0;
    transition: all 0.5s ease;
  }
  .edge {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: black;
    transition: all 0.5s ease;
  }
</style>
