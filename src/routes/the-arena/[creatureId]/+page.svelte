<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { page } from '$app/stores';
  import { generateCombat, prepareTeams } from '$src/ts/combat';
  import { goto } from '$app/navigation';

  const { overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS(creatureId, true);
  let selectedBrawlers: Character[] = $derived(
    app.selectedBrawlers.map((id) =>
      CHARACTERS(
        app.characters.find((c) => c.uuid === id),
        true
      )
    )
  );

  const runCombat = () => {
    const selected = app.characters.find((c) => c.uuid === app.selectedBrawlers[0]);
    if (!selected) return;

    const myCharacter = $state.snapshot(selected);

    app.combat = generateCombat('myseed', prepareTeams([myCharacter], [creature]));
    console.info(app.combat);

    $overlay = 'Combat';
  };

  let brawlersSelected = $derived(selectedBrawlers.length > 0);
</script>

<GoBack onclick={() => goto('/the-arena')} />

<Headline text={creature.name}>
  <CoreStats combatStats={creature.combatStats} />
</Headline>

<crow left class="!items-stretch !justify-stretch overflow-hidden">
  <crow class={tw('w-0 !flex-none transition-all duration-200', brawlersSelected && 'w-20')}></crow>

  <crow up left vertical>
    <Accordion isOpen={!brawlersSelected}>
      <div class="min-h-54 max-w-100 pb-8 text-sm">
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

  <crow class="gap-3">
    <Button
      tertiary
      disabled={!brawlersSelected || app.combat.duration !== 0}
      onclick={() => (app.selectedBrawlers = [])}
    >
      Cancel
    </Button>

    <Button
      big
      bgColor="bg-red-500"
      disabled={!brawlersSelected ||
        app.combat.duration !== 0 ||
        selectedBrawlers.some(
          (brawler) => CHARACTERS(brawler, true).combatStats.currentHealth <= 0
        )}
      onclick={runCombat}
    >
      Fight
    </Button>
  </crow>
{/if}

<!-- <Debug data={selectedBrawlers} /> -->
