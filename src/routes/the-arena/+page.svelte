<script lang="ts">
  import CHARACTERS, { ALL_CHARACTERS } from '$src/constants/CHARACTERS';
  import { generateCombat, prepareTeams } from '$src/ts/combat';

  const { IS_DEV } = ENV;

  const SIMULATION_COUNT = 10;

  let creatures = Object.entries(ALL_CHARACTERS)
    .map(([key]) => ({
      ...CHARACTERS(key, true),
      url: key
    }))
    .filter(({ image, name }) => /*image.startsWith('creature') &&*/ name !== 'Target Dummy');
</script>

<Headline text="the arena" />

<crow vertical up left class="-mx-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2 text-stone-900">
    <div class="flex-1">
      <!-- Name -->
    </div>
    <div class="cinzel flex-1 text-right">level</div>
    <div class="cinzel flex-1 text-right">loot</div>

    {#if IS_DEV}
      <div class="cinzel flex-1 text-right">win</div>
    {/if}
    <!-- <div class="cinzel flex-2 text-right">stats</div> -->
    <crow class="!w-4 !flex-none" right>
      <!-- Name -->
    </crow>
  </crow>
  {#each creatures as creature, i}
    {@const wins = Array(SIMULATION_COUNT)
      .fill(0)
      .reduce((wins, i) => {
        if (!app.characters[0]) return wins;
        console.log(wins);
        const combat = generateCombat(
          `testseed${i}`,
          prepareTeams([$state.snapshot(app.characters[0])], [creature])
        );
        console.log(combat);

        if (combat?.winningTeam?.index === 0) return wins + 1;

        return wins;
      }, 0)}
    <Clickable
      href="/the-arena/{creature.url}"
      class={tw(
        'crow left w-full gap-4 px-6 py-2 text-sm',
        i % 2 === 0 ? 'bg-stone-50' : 'bg-white'
      )}
    >
      <div class="cinzel flex-1 text-base text-nowrap">{creature.name}</div>
      <div class="flex-1 text-right">1</div>
      <div class="flex-1 text-right">50 exp</div>
      {#if IS_DEV}
        <div class="flex-1 text-right">{(wins / SIMULATION_COUNT) * 100}%</div>
      {/if}
      <!-- <div class="flex-2">
        <crow right>
          <CoreStats combatStats={creature.combatStats} small />
        </crow>
      </div> -->
      <crow right class="!w-4 !flex-none gap-2">
        <div class="-my-2 -mr-6 w-10">
          <crow up class="glass aspect-square w-full overflow-hidden !rounded-none">
            <img
              class="h-auto w-[120%] max-w-none scale-x-[-1]"
              src="/images/races/{creature.image}"
              alt=""
            />
          </crow>
        </div>
      </crow>
    </Clickable>
  {/each}
</crow>
