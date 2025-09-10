<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { prepareCombatant } from '$src/ts/Utils';
  import { generateCombat } from '$src/ts/Combat';
  import type { Team } from '$src/types/team';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';

  const { overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS(creatureId, true);

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

<crow up left>
  <crow up left vertical class="!flex-3 gap-3">
    <h2>{creature.name}</h2>
    <div class="text-sm">
      {@html creature.description}
    </div>
  </crow>
  <crow class="h-70 !flex-2 -translate-y-5">
    <img
      src="/images/races/{creature.image}"
      class="pointer-events-none max-h-full max-w-48 -scale-x-[1]"
      alt=""
    />
  </crow>
</crow>

<crow class="relative w-full gap-2 px-px" vertical left up>
  <crow class="w-full !justify-between">
    <h5>Abilities</h5>
  </crow>
  <AbilityBar character={creature} abilities={creature.abilities} dndDisabled />
</crow>

<hr
  class="my-6 h-px w-full border-none bg-gradient-to-r from-transparent via-gray-200 to-transparent"
/>

<crow vertical class="h-60 border border-dashed border-gray-300 text-center">
  <strong>Pick your brawler</strong>
  (Work in progress: right now Evasive Elon is always chosen)
</crow>

<crow right>
  <Button onclick={runCombat} class="mt-4 bg-black px-4 py-2 text-sm">Fight</Button>
</crow>
