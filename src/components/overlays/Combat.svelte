<script lang="ts">
  import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '$src/constants/APP';
  import type { Team } from '$src/types/team';

  const getGeometry = (N: number, { baseRadius = 250, itemWidth = 140, gap = 0 } = {}) => {
    const C_base = 2 * Math.PI * baseRadius;
    const C_item = Math.max(1, N) * (itemWidth + gap); // avoid divide-by-zero
    const scale = Math.min(1, C_base / C_item); // 1–2 stay full size, 3+ shrink
    return { scale };
  };

  let startTeams: Team[] = $derived(app.combat.teamsStartState);
  let geometry = $derived(
    getGeometry(
      app.liveTeams.reduce((a, team) => team.combatants.length + a, 0) * app.liveTeams.length,
      {
        baseRadius: COMBAT_RING_BASE_RADIUS
      }
    )
  );

  let liveTeams = $derived(app.liveTeams.length ? app.liveTeams : startTeams);
  let progress = $derived(
    app.elapsedMilliseconds / app.combat.duration // avoid divide-by-zero
  );
  let experience = $derived(startTeams[1]?.combatants?.[0]?.name === 'Target Dummy' ? 0 : 50);
</script>

<div class="relative w-full">
  <crow class="!grid aspect-square place-items-center">
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
            {@const individualProgress =
              ((combatant.statuses.knockedOut
                ? combatant.statuses.knockedOut
                : app.elapsedMilliseconds) /
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
                      {#each combatant.abilities as { name, ticks, icon }, i (`icon_${i}_${name}`)}
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
              elapsedMilliseconds={app.elapsedMilliseconds}
              progress={individualProgress}
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
    <ResultAnnouncement {progress} rewards={[{ type: 'experience', amount: experience }]} />
  </crow>
</div>

<!-- <style>
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
</style> -->
