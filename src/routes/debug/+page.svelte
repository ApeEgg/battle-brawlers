<script lang="ts">
  import { prepareCombatant, seededRandom } from '$src/ts/Utils';
  import { generateCombat } from '$src/ts/Combat';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import type { Team } from '$src/types/team';
  import type { Character } from '$src/types/character';
  import Combat from '$src/components/overlays/Combat.svelte';

  let teams = $derived<Team[]>(app.combat.teamsStartState);
  let teamCount = $state(2);
  let combatantCount = $state(1);

  let characters: Character[] = [
    CHARACTERS('elf'),
    CHARACTERS('human'),
    CHARACTERS('troll'),
    CHARACTERS('dwarf'),
    CHARACTERS('goblin'),
    CHARACTERS('succubus'),
    CHARACTERS('rat')
  ];

  const initializeCombat = () => {
    const generateCombatants = (teamIndex: number) =>
      Array.from({ length: combatantCount }, (_, combatantIndex) =>
        prepareCombatant(
          characters[seededRandom(0, characters.length - 1, `ff${combatantIndex}_${teamIndex}`)],
          teamCount,
          combatantCount,
          teamIndex,
          combatantIndex
        )
      );

    const generatedTeams = Array.from({ length: teamCount }, (_, index) => ({
      name: `Team ${index}`,
      index,
      combatants: generateCombatants(index)
    }));

    // Inject account character
    generatedTeams[0].combatants = [
      prepareCombatant(app.characters[0], generatedTeams.length, 1, 0, 0)
    ];

    app.combat.teamsStartState = generatedTeams;
  };

  const startCombat = () => {
    app.combat = generateCombat('simon', $state.snapshot(teams));
    console.info($state.snapshot(app.combat));
  };

  $effect(initializeCombat);
</script>

<Headline text="debug" />

<div>
  Teams {teamCount}:
  <br /><input type="range" min="1" max="8" bind:value={teamCount} />
  <br />
  Combatants {combatantCount}:
  <br /><input type="range" min="1" max="6" bind:value={combatantCount} />
  <br />

  <Button onclick={startCombat} disabled={!teams.length}>Start combat</Button>
</div>

{#if app.combat.teamsStartState.length}
  <Combat />
{/if}
