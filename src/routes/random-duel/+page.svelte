<script>
  import { generateCombat, healFull, prepareTeams } from '$src/ts/combat';
  import { getExperienceRangeForLevel, getLevelByExperience } from '$src/ts/level';

  let count = $derived(app.selectedBrawlers.length || 'X');

  const runCombat = async () => {
    const { minXp, maxXp } = getExperienceRangeForLevel(getLevelByExperience(app.experience));
    const characters = await app.socket.sendAsync('pvp/get-random-opponent', {
      count: app.selectedBrawlers.length,
      minXp,
      maxXp
    });

    if (characters.length) {
      const selected = app.characters.filter(({ uuid }) => app.selectedBrawlers.includes(uuid));
      if (!selected) return;

      const myCharacters = $state.snapshot(selected);

      app.combat = generateCombat(
        'myseed',
        prepareTeams(myCharacters, healFull(characters.slice(0, myCharacters.length)))
      );

      app.overlay = 'Combat';
    } else {
      // Fight bot
      console.error('No opponents found, fighting bot (not implemented)');
    }
  };
</script>

<div class="mb-8">
  <Headline text="random duel">
    <crow class="w-full !justify-between">
      <Pill text="{count}&nbsp;vs&nbsp;{count}" />
      <!-- <CoreStats combatStats={creature.combatStats} /> -->
    </crow>
  </Headline>

  <crow>
    <crow class="aspect-square w-40 !flex-none rounded-full bg-black/40 text-9xl text-white">
      ?
    </crow>
  </crow>
</div>

<CharacterSelection {runCombat} count={Math.floor(getLevelByExperience(app.experience) / 5) + 1} />
