<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Race } from '$src/types/character';
  import { generateCombat, prepareCombatant } from '$src/ts/Utils';

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS[creatureId as Race];

  const runCombat = () => {
    const combatantYou = prepareCombatant(CHARACTERS.elf, 360, 2, 0, 0);
    const combatantThem = prepareCombatant(CHARACTERS.berserker, 360, 2, 1, 1);
    console.log(combatantThem);
    const teams = [
      {
        name: `Team 1`,
        index: 0,
        combatants: [combatantYou]
      },
      {
        name: `Team 2`,
        index: 1,
        combatants: [combatantThem]
      }
    ];

    app.combat = generateCombat('myseed', $state.snapshot(teams));
    console.log(app.combat);
    // startTimestamp = 0; // reset so first loop call sets it
    // elapsedMilliseconds = 0;
    // loopId = requestAnimationFrame(loop);
  };
</script>

<Clickable onclick={() => goto('/creatures')}>Go back</Clickable>

<h2>{creature.name}</h2>

<Button onclick={runCombat}>Fight</Button>
