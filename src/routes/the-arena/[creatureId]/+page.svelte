<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { page } from '$app/stores';
  import { prepareCombatant } from '$src/ts/Utils';
  import { generateCombat } from '$src/ts/Combat';
  import type { Team } from '$src/types/team';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import AbilitySelection from '$src/components/character/AbilitySelection.svelte';
  import { goto } from '$app/navigation';
  import Accordion from '$src/components/Accordion.svelte';
  import Icon from '$src/components/ui/Icon.svelte';
  import Button from '$src/components/form/Button.svelte';

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

  let brawlersSelected = $derived(selectedBrawlers.length > 0);
</script>

<Headline text={creature.name}>
  <crow class="!flex-none translate-y-px gap-2 text-xl text-gray-600" left>
    <crow class="gap-1">
      <Icon name="health" original />
      {creature.combatStats?.maxHealth}
    </crow>
    <span class="text-gray-300">/</span>
    <crow class="gap-1">
      <Icon name="armor" original />
      {creature.combatStats?.maxArmor}
    </crow>
    <span class="text-gray-300">/</span>
    <crow class="gap-1">
      <Icon name="damage" original />
      {creature.combatStats?.damage}
    </crow>
  </crow>
</Headline>

<Close onclick={() => goto('/the-arena')} />

<crow left class="!items-stretch !justify-stretch overflow-hidden">
  <crow class={tw('w-0 !flex-none transition-all duration-200', brawlersSelected && 'w-20')}></crow>

  <crow up left vertical>
    <Accordion isOpen={!brawlersSelected}>
      <div class="min-h-54 text-sm">
        {@html creature.description}
      </div>
    </Accordion>
    <crow class="relative w-full" vertical left up>
      <Accordion isOpen={!brawlersSelected}>
        <crow class="w-full !justify-between">
          <h5>Abilities</h5>
        </crow>
      </Accordion>
      <AbilityBar character={creature} abilities={creature.abilities} dndDisabled minimalistic />
    </crow>
  </crow>

  <crow
    class={tw(
      'pointer-events-none relative w-40 !flex-none -scale-x-[1] bg-contain bg-center bg-no-repeat transition-all duration-200',
      brawlersSelected && 'w-20'
    )}
    style="background-image: urlllll(/images/races/{creature.image});"
  >
    <img src="/images/races/{creature.image}" class="absolute top-0 right-0 left-0" alt="" />
  </crow>
</crow>

<Hr class="mt-6 mb-6" />

{#if brawlersSelected}
  {#each selectedBrawlers as brawler (brawler.uuid)}
    <AbilitySelection character={brawler} renderSides />
  {/each}
{:else}
  <crow vertical class="h-[100px] border border-dashed border-gray-300 text-center">
    <h5>Choose your brawler</h5>
  </crow>
{/if}

{#if brawlersSelected}
  <Hr class="mt-4 mb-3" />

  <crow>
    <Button
      tertiary
      disabled={!brawlersSelected || app.combat.duration !== 0}
      onclick={() => (app.selectedBrawlers = [])}
      class="mt-4 px-4 py-2 text-sm"
    >
      Cancel
    </Button>

    <Button
      disabled={!brawlersSelected ||
        app.combat.duration !== 0 ||
        selectedBrawlers.some(
          (brawler) => CHARACTERS(brawler, true).combatStats.currentHealth <= 0
        )}
      onclick={runCombat}
      class="mt-4 px-4 py-2 text-sm"
    >
      Fight
    </Button>
  </crow>
{/if}

<!-- <Debug data={selectedBrawlers} /> -->
