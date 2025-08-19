<script lang="ts">
  // import combatStats from '$src/constants/CombatStats.js';
  // import weaponTypes from '$src/constants/WeaponTypes.js';
  import { prepareCombatant, generateCombat, seededRandom } from '$src/ts/Utils';
  import type { Team } from '$src/types/team';
  import CombatArena from '$src/components/combat/CombatArena.svelte';
  import CombatantCard from '$src/components/combat/CombatantCard.svelte';
  import { onDestroy } from 'svelte';

  const { combat } = STORES;

  const actions1 = ['basic attack', 'block', 'basic attack'];
  const actions2 = ['basic attack', 'basic attack', 'basic attack'];

  const comb1 = prepareCombatant({
    name: 'npc1',
    race: 'elf',
    actions: actions1
  });

  const comb2 = prepareCombatant({
    name: 'npc2',
    race: 'human',
    actions: actions2
  });

  const comb3 = prepareCombatant({
    name: 'npc3',
    race: 'troll',
    actions: actions2
  });

  const getGeometry = (N: number, { baseRadius = 208, itemWidth = 226, gap = 0 } = {}) => {
    const C_base = 2 * Math.PI * baseRadius;
    const C_item = Math.max(1, N) * (itemWidth + gap); // avoid divide-by-zero
    const scale = Math.min(1, C_base / C_item); // 1–2 stay full size, 3+ shrink
    return { scale };
  };

  let teams = $state<Team[]>([]);
  let rotation = $state(360);
  let teamCount = $state(2);
  let combatantCount = $state(1);
  let geometry = $derived(getGeometry(combatantCount * teamCount));
  let loopId: any;
  let startTimestamp = $state(0);
  let lastTimestamp = 0;
  let elapsedMilliseconds = 0;

  let combatants = [comb1, comb2, comb3];

  const initializeCombat = () => {
    const nextCombatants = (u: number) =>
      Array.from({ length: combatantCount }, (_, i) => {
        return combatants[seededRandom(0, combatants.length - 1, `race__${i}_${u}`)];
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

    let [action] = $combat.actions;
    // console.log(elapsedMilliseconds, $state.snapshot(action));

    if (elapsedMilliseconds > action?.timestamp) {
      // console.log('hehue', $state.snapshot(action.teams));
      teams = action.teams;

      const [_, ...newActions] = $combat.actions;
      $combat.actions = newActions;
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
    $combat = generateCombat('myseed', $state.snapshot(teams));
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

<Row class="gap-2 min-h-screen flex-1 pt-20" up>
  <div class="bg-white/30 w-56 border-gray-400 border rounded p-4">
    left side
    <!-- <code class="text-xs">
      <pre>
      {JSON.stringify(teams, null, 2)}
    </pre>
    </code> -->
  </div>
  <div class="bg-white h-full flex-1 border-gray-400 border rounded">
    <CombatArena>
      {#if teams.length}
        {#each teams as { combatants }, index (`team_${index}`)}
          {#each combatants as combatant, c (`combatant_${combatant.id}`)}
            {@const rot =
              index * rotation +
              270 -
              rotation / 2 +
              (rotation / (combatants.length + 1)) * (c + 1)}
            {@const raw = Math.round(Math.abs(Math.abs(rot - 540) - 180))}
            {@const z = Math.floor((raw / 180) * 9) + 1}
            <div class="diameter" style={`transform: rotate(${rot}deg); z-index: ${z};`}>
              <div
                class="edge"
                style={`transform: scale(${geometry.scale}) translate(-50%, -50%) rotate(-${rot}deg);`}
              >
                <CombatantCard {...combatant}></CombatantCard>
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

  <div class="bg-white/30 w-56 border-gray-400 border rounded p-4">
    Teams {teamCount}:
    <br /><input type="range" min="1" max="8" bind:value={teamCount} />
    <br />
    Combatants {combatantCount}:
    <br /><input type="range" min="1" max="6" bind:value={combatantCount} />
    <br />

    <Button onclick={runCombat} disabled={!teams.length}>Run combat</Button>
    <Button onclick={() => cancelAnimationFrame(loopId)} disabled={!teams.length}
      >Cancel combat</Button
    >
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
