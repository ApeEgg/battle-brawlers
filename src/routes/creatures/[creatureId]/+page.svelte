<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { page } from '$app/stores';
  import { prepareCombatant } from '$src/ts/Utils';
  import { generateCombat } from '$src/ts/Combat';
  import type { Team } from '$src/types/team';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import CharacterSheet from '$src/components/character/CharacterSheet.svelte';
  import { goto } from '$app/navigation';

  const { overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS(creatureId, true);
  let selectedBrawlers = $derived<Character[]>(
    app.selectedBrawlers.map((id) =>
      CHARACTERS(
        app.characters.find((c) => c.uuid === id),
        true
      )
    )
  );

  const runCombat = () => {
    const combatantYou = prepareCombatant(
      $state.snapshot(app.characters.find((c) => c.uuid === app.selectedBrawlers[0])),
      2,
      1,
      0,
      0
    );
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

<Headline text={creature.name} />

<Close onclick={() => goto('/creatures')} />

<crow up left>
  <crow up left vertical class="!flex-3 gap-3">
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

<Hr class="mt-6 mb-3" />

{#if selectedBrawlers.length > 0}
  {#each selectedBrawlers as brawler (brawler.uuid)}
    <CharacterSheet character={brawler} />
  {/each}
{:else}
  <crow vertical class="h-[465px] border border-dashed border-gray-300 text-center">
    <strong>Select your brawler</strong>
  </crow>
{/if}

<crow right class="gap-2">
  <Button
    secondary
    disabled={selectedBrawlers.length === 0}
    onclick={() => (app.selectedBrawlers = [])}
    class="mt-4 px-4 py-2 text-sm"
  >
    Reset
  </Button>
  <Button
    disabled={selectedBrawlers.length === 0}
    onclick={runCombat}
    class="mt-4 px-4 py-2 text-sm"
  >
    Fight
  </Button>
</crow>

<!-- <Debug data={selectedBrawlers} /> -->
