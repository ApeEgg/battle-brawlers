<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Race } from '$src/types/character';
  import { generateCombat, prepareCombatant } from '$src/ts/Utils';
  import type { Team } from '$src/types/team';
  import Tooltip from '$src/components/ui/Tooltip.svelte';

  const { overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS[creatureId as Race]();

  const runCombat = () => {
    const combatantYou = prepareCombatant($state.snapshot(app.characters[0]), 2, 1, 0, 0);
    const combatantThem = prepareCombatant(creature, 2, 1, 1, 0);

    const teams: Team[] = [
      {
        name: 'Team 0',
        index: 0,
        combatants: [combatantYou]
      },
      {
        name: 'Team 1',
        index: 1,
        combatants: [combatantThem]
      }
    ];

    app.combat = generateCombat('myseed', teams);
    console.info(app.combat);

    $overlay = 'Combat';
  };
</script>

<Clickable class="crow gap-1" onclick={() => goto('/creatures')}>
  <Icon name="left" class="text-xs" />
  Go back
</Clickable>

<h2>{creature.name}</h2>

<div class="relative w-[calc((100%/18)*15)]">
  <crow up left class="w-full flex-wrap gap-y-4 rounded-lg">
    {#each creature.abilities as ability, i (ability.id)}
      <crow
        class={tw(
          'group/tooltip relative -ml-px h-20 !flex-none rounded-lg border border-gray-800'
        )}
        style="width: calc(((100% / 15)*{ability.ticks}) + 1px);"
      >
        <Icon name={ability.icon} />
        <!-- {ability.id.substring(0, 5)} -->

        <Tooltip class="w-60">
          <crow class="w-full !justify-between">
            <strong class="text-black">{ability.prettyName}</strong>
          </crow>
          <crow vertical>
            <div class="text-sm"><strong>Cast time:</strong> {ability.ticks} ticks</div>
          </crow>
          <span class="text-sm">{ability.description}</span>
        </Tooltip>
      </crow>
    {/each}
  </crow>
</div>

<Button onclick={runCombat}>Fight</Button>

<!-- <pre class="text-xs">{JSON.stringify(app.characters, null, 2)}
</pre> -->
