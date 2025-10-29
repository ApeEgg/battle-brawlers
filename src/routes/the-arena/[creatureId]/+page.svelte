<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { page } from '$app/stores';
  import { generateCombat, prepareTeams } from '$src/ts/combat';
  import { goto } from '$app/navigation';

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS(creatureId, true);

  const runCombat = () => {
    const selected = app.characters.find((c) => c.uuid === app.selectedBrawlers[0]);
    if (!selected) return;

    const myCharacter = $state.snapshot(selected);

    app.combat = generateCombat('myseed', prepareTeams([myCharacter], [creature]));
    console.info(app.combat);

    app.overlay = 'Combat';
  };

  let brawlersSelected = $derived(app.selectedBrawlers.length > 0);
</script>

<GoBack onclick={() => goto('/the-arena')} />

<Headline text={creature.name}>
  <crow class="w-full !justify-between">
    <Pill text="1&nbsp;vs&nbsp;1" />
    <CoreStats combatStats={creature.combatStats} />
  </crow>
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
  >
    <img src="/images/races/{creature.image}" class="absolute top-0 right-0 left-0" alt="" />
  </crow>
</crow>

<Hr class="mt-6 mb-6" />

<CharacterSelection {runCombat} />

<!-- <Debug data={selectedBrawlers} /> -->
