<script lang="ts">
  import { onDestroy } from 'svelte';
  import { prepareCombatant, generateCombat, seededRandom } from '$src/ts/Utils';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import type { Team } from '$src/types/team';
  import type { Character } from '$src/types/character';

  import CombatArena from '$src/components/combat/CombatArena.svelte';
  import CombatantCard from '$src/components/combat/CombatantCard.svelte';
  import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';

  const getGeometry = (N: number, { baseRadius = 250, itemWidth = 140, gap = 0 } = {}) => {
    const C_base = 2 * Math.PI * baseRadius;
    const C_item = Math.max(1, N) * (itemWidth + gap); // avoid divide-by-zero
    const scale = Math.min(1, C_base / C_item); // 1–2 stay full size, 3+ shrink
    return { scale };
  };

  let teams = $state<Team[]>([]);
  let rotation = $state(360);
  let teamCount = $state(2);
  let combatantCount = $state(1);
  let geometry = $derived(
    getGeometry(combatantCount * teamCount, {
      baseRadius: COMBAT_RING_BASE_RADIUS
    })
  );

  let loopId: any;
  let startTimestamp = $state(0);
  let lastTimestamp = 0;
  let elapsedMilliseconds = $state(0);
  let progress = 0;

  let characters: Character[] = [
    CHARACTERS.elf,
    CHARACTERS.human,
    CHARACTERS.troll,
    CHARACTERS.dwarf
  ];

  const initializeCombat = () => {
    const nextCombatants = (teamIndex: number) =>
      Array.from({ length: combatantCount }, (_, combatantIndex) => {
        return prepareCombatant(
          characters[seededRandom(0, characters.length - 1, `ofw${combatantIndex}_${teamIndex}`)],
          rotation,
          combatantCount,
          teamIndex,
          combatantIndex
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

    if (elapsedMilliseconds > event?.eventTimestamp) {
      console.log($state.snapshot(event));
      teams = event.teams;

      const [_, ...newEvents] = app.combat.events;
      app.combat.events = newEvents;
    }
    if (elapsedMilliseconds > app.combat.duration) {
      teams = app.combat.teams;
      cancelAnimationFrame(loopId);
      return;
    }

    loopId = requestAnimationFrame(loop);
  };

  const runCombat = () => {
    app.combat = generateCombat('myseed', $state.snapshot(teams));
    console.log($state.snapshot(app.combat));
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

<CombatArena>
  {#if teams.length}
    {#each teams as { combatants, name }, _index}
      {#each combatants as combatant, _c}
        {@const { rot } = combatant.position}
        {@const raw = Math.round(Math.abs(Math.abs(rot - 540) - 180))}
        {@const z = 10 - Math.floor((raw / 180) * 9)}
        <!-- {@const z = Math.floor((raw / 180) * 9) + 1} -->
        {@const angleDiff = ((rot - 0 + 540) % 360) - 180}
        {@const totalTime =
          combatant.abilities.reduce((acc, { ticks }) => acc + ticks, 0) * COMBAT_TICK_TIME}
        {@const progress =
          ((combatant.statuses.knockedOut ? combatant.statuses.knockedOut : elapsedMilliseconds) /
            totalTime) %
          1}

        <!-- <div class="diameter" style={`transform: rotate(${rot}deg); z-index: ${z};`}>
              <div class="edge" style={`transform: translate(-50%, -50%) rotate(-${rot}deg);`}>
                <CombatantCard {...combatant} facingRight={angleDiff < 0} {elapsedMilliseconds}>
                  <div class="relative">
                    <div
                      class="absolute top-0 right-full bottom-0 left-0 bg-blue-400"
                      style="right: {100 - progress * 100}%"
                    ></div>
                    <div
                      class="abilities relative flex w-full divide-x divide-gray-600 border border-gray-600"
                    >
                      {#each combatant.abilitiesCopied as { prettyName, ticks, icon }, i (`icon_${i}_${prettyName}`)}
                        <div
                          class="relative flex h-6 items-center justify-center text-center"
                          style="width: calc(calc(100% / 12)*{ticks});"
                        >
                          {#if icon === '1h1h' && ticks === 2}
                            <div
                              class="absolute top-0 bottom-0 left-1/2 w-[0.1px] -translate-x-1/2 bg-gray-400"
                            ></div>
                          {/if}
                          <Icon
                            class={tw('relative text-[8px]', ticks > 1 && 'text-sm')}
                            name={icon}
                          />
                        </div>
                      {/each}
                    </div>
                  </div>
                </CombatantCard>
              </div>
            </div> -->

        <CombatantCard
          {...combatant}
          facingRight={angleDiff < 0}
          {elapsedMilliseconds}
          {progress}
          {z}
          scale={geometry.scale}
        />
      {/each}
      <!--<TeamBadge
        {index}
        rotation={index * rotation + 270}
        scale={geometry.scale}
      />-->
    {/each}
  {/if}
</CombatArena>

<div class="text-xs">
  Elapsed ms: {elapsedMilliseconds}<br />
  Duration: {app.combat.duration}
  <!-- <pre>{JSON.stringify(app.combat, null, 2)}</pre> -->
</div>

Teams {teamCount}:
<br /><input type="range" min="1" max="8" bind:value={teamCount} />
<br />
Combatants {combatantCount}:
<br /><input type="range" min="1" max="6" bind:value={combatantCount} />
<br />

<Button onclick={runCombat} disabled={!teams.length}>Run combat</Button>
<Button onclick={() => cancelAnimationFrame(loopId)} disabled={!teams.length}>Cancel combat</Button>

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
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    transition: all 0.5s ease;
  }
</style>
