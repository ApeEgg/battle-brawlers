<script lang="ts">
  import { page } from '$app/stores';
  import { generateCombat, prepareTeams } from '$src/ts/combat';
  import { goto } from '$app/navigation';
  import { ALL_FIGHTS } from '$src/constants/FIGHTS';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { allowedNumberOfCharacters, getExperienceReward } from '$src/ts/level';
  import { calculateCombatStatsByCharacter } from '$src/ts/utils';
  import type { CharacterRef } from '$src/types/character';

  const {
    params: { fightId }
  } = $page;

  let fight = ALL_FIGHTS.find(({ url }) => url === fightId) as any;
  let characters = $derived(
    fight.characters.map((character: CharacterRef[]) => ({
      ...character,
      overrides: {
        level: fight.minLevel
      }
    }))
  );

  $effect(() => {
    app.maxBrawlers = fight.allowedNumberOfCharacters;
  });

  const runCombat = () => {
    const selected = app.characters.find((c) => c.uuid === app.selectedBrawlers[0]);
    if (!selected) return;

    const myCharacter = $state.snapshot(selected);

    app.combat = generateCombat('myseed', prepareTeams([myCharacter], characters));
    console.info(app.combat);

    app.overlay = 'Combat';
  };

  let brawlersSelected = $derived(app.selectedBrawlers.length > 0);
  let descriptionOpen = $derived(!brawlersSelected && fight.characters.length === 1);
</script>

<GoBack onclick={() => goto('/the-arena')} />

<Headline text={fight.name}>
  <crow class="w-full !justify-between">
    <crow left class="gap-2">
      <Pill text="{fight.allowedNumberOfCharacters}&nbsp;vs&nbsp;{fight.characters.length}" />
      {#if fight.boss}
        <Pill text="Bossfight" />
        <Pill text="Luck disabled" />
      {/if}
    </crow>
    <span class="text-gray-400">
      {getExperienceReward(fight.characters.length, fight.minLevel, fight.maxLevel, fight.boss)} XP
    </span>
    <!-- <CoreStats combatStats={creature.combatStats} /> -->
  </crow>
</Headline>

{#each characters as character}
  {@const creature = CHARACTERS(character, true)}
  <!-- <Headline text={creature.name} small>
    <CoreStats combatStats={creature.combatStats} />
  </Headline> -->

  <crow left class="!items-stretch !justify-stretch overflow-hidden">
    <crow
      class={tw(
        'w-0 !flex-none opacity-0 transition-all duration-200',
        !descriptionOpen && 'w-20 opacity-100'
      )}
    >
      <CoreStats combatStats={calculateCombatStatsByCharacter(creature)} small vertical />
    </crow>
    <!-- <pre>
    {JSON.stringify(creature, null, 2)}
    </pre> -->

    <crow up left vertical>
      <Accordion isOpen={descriptionOpen}>
        <div class="min-h-54 max-w-100 pb-8 text-sm">
          <!-- <crow left class="mb-6">
            Stats with gear:
            <CoreStats combatStats={calculateCombatStatsByCharacter(creature)} />
          </crow> -->
          <crow left class="mb-6">
            <CoreStats combatStats={calculateCombatStatsByCharacter(creature)} />
          </crow>
          {@html creature.description}
        </div>
      </Accordion>
      <crow class="relative w-full" vertical left up>
        <Accordion isOpen={descriptionOpen}>
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
        !descriptionOpen && 'w-20'
      )}
    >
      <img src="/images/races/{creature.image}" class="absolute top-0 right-0 left-0" alt="" />
    </crow>
  </crow>
{/each}

<Hr class="mt-6 mb-6" />

<CharacterSelection {runCombat} count={fight.allowedNumberOfCharacters} />

<!-- <Debug data={selectedBrawlers} /> -->
