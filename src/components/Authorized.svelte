<script lang="ts">
  // import combatStats from '$src/constants/CombatStats.js';
  // import weaponTypes from '$src/constants/WeaponTypes.js';
  import { prepareCombatant, generateCombat, seededRandom } from '$src/ts/Utils';
  import type { Team } from '$src/types/team';
  import CombatArena from '$src/components/combat/CombatArena.svelte';
  import CombatantCard from '$src/components/combat/CombatantCard.svelte';

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
  let teamCount = $state(3);
  let combatantCount = $state(1);
  let geometry = $derived(getGeometry(combatantCount * teamCount));
  let combat = $state({});

  let combatants = [comb1, comb2, comb3];

  const initializeCombat = () => {
    const nextCombatants = (u: number) =>
      Array.from({ length: combatantCount }, (_, i) => {
        return combatants[seededRandom(0, combatants.length - 1, `race_${i}_${u}`)];
      });

    const nextTeams = Array.from({ length: teamCount }, (_, index) => ({
      name: `Team ${index}`,
      index,
      combatants: nextCombatants(index)
    }));

    teams = nextTeams;
    rotation = 360 / teamCount;
  };

  const runCombat = () => {
    combat = generateCombat('myseed', teams);
  };

  $effect(() => {
    initializeCombat();
  });
</script>

<Column class="gap-10" up>
  <CombatArena>
    {#if teams.length}
      {#each teams as { combatants }, index}
        {#each combatants as combatant, c}
          {@const rot =
            index * rotation + 270 - rotation / 2 + (rotation / (combatants.length + 1)) * (c + 1)}
          <div
            class="diameter"
            style={`transform: rotate(${rot}deg); z-index: ${Math.round(Math.abs(Math.abs(rot - 540) - 180))};`}
          >
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

  <div>
    Teams {teamCount}:
    <br /><input type="range" min="1" max="8" bind:value={teamCount} />
    <br />
    Combatants {combatantCount}:
    <br /><input type="range" min="1" max="6" bind:value={combatantCount} />
    <br />

    <button onclick={runCombat} disabled={!teams.length}> Run combat </button>

    <!--<pre>{JSON.stringify(comb1, null, 2)}</pre>
<pre>{JSON.stringify(comb2, null, 2)}</pre>
<pre>{JSON.stringify(combatStats, null, 2)}</pre>
<pre>{JSON.stringify(weaponTypes, null, 2)}</pre>-->
    <pre>{JSON.stringify(combat, null, 2)}</pre>
  </div>
</Column>

<style>
  :global(body) {
    margin: 0;
  }
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
