<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Race } from '$src/types/character';
  import { generateCombat, prepareCombatant } from '$src/ts/Utils';
  import type { Team } from '$src/types/team';

  const { token, overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS[creatureId as Race];

  const runCombat = () => {
    const combatantYou = prepareCombatant(CHARACTERS.elf, 2, 1, 0, 0);
    const combatantThem = prepareCombatant(CHARACTERS.berserker, 2, 1, 1, 0);

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

    console.log(teams);

    app.combat = generateCombat('myseed', teams);
    console.log(app.combat);

    $overlay = 'Combat';
  };
</script>

<Clickable onclick={() => goto('/creatures')}>Go back</Clickable>

<h2>{creature.name}</h2>

<Button onclick={runCombat}>Fight</Button>
