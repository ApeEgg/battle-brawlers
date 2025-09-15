<script lang="ts">
  import { INITIAL_COMBAT } from '$src/app.svelte';
  import VictoryOrLoss from '$src/components/combat/VictoryOrLoss.svelte';
  import Button from '$src/components/form/Button.svelte';
  import { backOut, elasticInOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  const { setOverlay } = ACTIONS;

  let { progress } = $props();
  let interval = setInterval(() => {}, 500);
  let rewardsShown = $state(0);
  let delayTicks = 2;

  $effect(() => {
    if (progress >= 1) {
      interval = setInterval(() => {
        rewardsShown = rewardsShown + 1;
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  });

  const REWARDS = [
    { type: 'gold', amount: 50 },
    { type: 'xp', amount: 200 },
    { type: 'stones', amount: 200 }
  ];

  let winningTeam = $derived(app.combat.winningTeam);
  let outcome = $derived<'victory' | 'defeat'>(winningTeam?.index === 0 ? 'victory' : 'defeat');
</script>

{#if progress >= 1}
  <crow class="w-70 [grid-area:1/1]" in:scale={{ duration: 500, delay: 500, easing: backOut }}>
    <crow vertical class="gap-4" up left>
      <VictoryOrLoss {outcome} />

      {#if outcome === 'victory'}
        <Accordion isOpen={rewardsShown > delayTicks}>
          <crow up vertical class="glass w-full p-2">
            <div class="cinzel text-2xl">rewards</div>
            <Hr />
            <crow vertical>
              {#each REWARDS as { type, amount }, i}
                <Accordion isOpen={rewardsShown > i + delayTicks + 1}>
                  <crow>+{type} {amount}</crow>
                </Accordion>
              {/each}
              {#each REWARDS as { type, amount }, i}
                <Accordion isOpen={rewardsShown <= i + delayTicks + 1}>
                  <crow class="p-0.5">
                    <Icon
                      name="isStunned"
                      class="animate-spin text-xl [animation-direction:reverse]"
                    />
                  </crow>
                </Accordion>
              {/each}
            </crow>
            <Hr class="mt-3 mb-4" />
            <crow class="w-full">
              <Button
                secondary
                onclick={() => {
                  app.combat = { ...INITIAL_COMBAT };
                  app.liveTeams = [];
                  app.elapsedMilliseconds = 0;
                  setOverlay('');
                }}
                class="text-md civil border border-yellow-700 px-4 py-2 text-white [background:radial-gradient(ellipse_farthest-corner_at_right_bottom,_#FEDB37_0%,_#FDB931_8%,_#9f7928_30%,_#8A6E2F_40%,_transparent_80%),_radial-gradient(ellipse_farthest-corner_at_left_top,_#FFFFFF_0%,_#FFFFAC_8%,_#D1B464_25%,_#5d4a1f_62.5%,_#5d4a1f_100%)]"
              >
                Claim
              </Button>
            </crow>
          </crow>
        </Accordion>
      {:else}
        <Accordion isOpen={rewardsShown > delayTicks}>
          <crow class="w-full">
            <Button
              onclick={() => {
                app.combat = { ...INITIAL_COMBAT };
                app.liveTeams = [];
                app.elapsedMilliseconds = 0;
                setOverlay('');
              }}
              secondary
              class="text-md px-4 py-2"
            >
              Go back
            </Button>
          </crow>
        </Accordion>
      {/if}
    </crow>
  </crow>
{/if}
