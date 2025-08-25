<script lang="ts">
  import { onDestroy } from 'svelte';
  import CombatArena from '$src/components/combat/CombatArena.svelte';
  import CombatantCard from '$src/components/combat/CombatantCard.svelte';
  import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';
  import type { Team } from '$src/types/team';
  import { INITIAL_COMBAT } from '$src/app.svelte';

  const getGeometry = (N: number, { baseRadius = 250, itemWidth = 140, gap = 0 } = {}) => {
    const C_base = 2 * Math.PI * baseRadius;
    const C_item = Math.max(1, N) * (itemWidth + gap); // avoid divide-by-zero
    const scale = Math.min(1, C_base / C_item); // 1–2 stay full size, 3+ shrink
    return { scale };
  };

  let elapsedMilliseconds = $state(0);
  let loopId: any = $state();
  let startTimestamp = $state(0);
  let lastTimestamp = 0;
  let teams: Team[] = $state([]);
  let startTeams: Team[] = $derived(app.combat.teamsStartState);
  let geometry = $derived(
    getGeometry(teams.reduce((a, team) => team.combatants.length + a, 0) * teams.length, {
      baseRadius: COMBAT_RING_BASE_RADIUS
    })
  );

  const loop = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const deltaTime = timestamp - lastTimestamp;
    elapsedMilliseconds += deltaTime;
    lastTimestamp = timestamp;

    let [event] = app.combat.events;

    if (elapsedMilliseconds > event?.eventTimestamp) {
      teams = event.teams;
      const [_, ...newEvents] = app.combat.events;
      app.combat.events = newEvents;
    }

    if (elapsedMilliseconds > app.combat.duration) {
      teams = app.combat.teamsEndState;
      cancelAnimationFrame(loopId);
      loopId = undefined;
      return;
    }

    loopId = requestAnimationFrame(loop);
  };

  const startCombat = () => {
    loopId = requestAnimationFrame(loop);
    startTimestamp = 0;
    elapsedMilliseconds = 0;
  };

  const pauseCombat = () => {
    cancelAnimationFrame(loopId);
    loopId = undefined;
  };

  const resumeCombat = () => {
    lastTimestamp = 0;
    loopId = requestAnimationFrame(loop);
  };

  $effect(() => {
    if (app.combat.duration > 0) {
      startCombat();
    }
  });

  onDestroy(() => {
    cancelAnimationFrame(loopId);
    app.combat = INITIAL_COMBAT;
  });

  let liveTeams = $derived(teams.length ? teams : startTeams);
</script>

<div class="bg-white">
  <Button onclick={pauseCombat} disabled={!loopId}>Pause combat</Button><br />
  <Button
    onclick={resumeCombat}
    disabled={loopId || app.combat.duration === 0 || app.combat.duration <= elapsedMilliseconds}
  >
    Resume combat
  </Button><br />
  Elapsed ms: {elapsedMilliseconds}<br />
  Duration: {app.combat.duration} <br />
  <!-- <pre>{JSON.stringify(app.combat, null, 2)}</pre> -->

  <CombatArena>
    {#if liveTeams.length}
      {#each liveTeams as { combatants, name }, _index}
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
</div>

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
