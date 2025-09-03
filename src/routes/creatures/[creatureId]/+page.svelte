<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Race } from '$src/types/character';
  import { prepareCombatant } from '$src/ts/Utils';
  import { generateCombat } from '$src/ts/Combat';
  import type { Team } from '$src/types/team';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import abilityEntity from '$src/ts/abilityEntity';

  const { overlay } = STORES;

  const {
    params: { creatureId }
  } = $page;

  let creature = CHARACTERS[creatureId as Race]();

  const runCombat = () => {
    const combatantYou = prepareCombatant($state.snapshot(app.characters[0]), 2, 1, 0, 0);
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

<Clickable class="crow gap-1" onclick={() => goto('/creatures')}>
  <Icon name="left" class="text-xs" />
  Go back
</Clickable>

<crow up left>
  <crow up left vertical class="gap-3">
    <h2>{creature.name}</h2>
    <div class="text-sm">
      {@html creature.description}
    </div>
    <Button onclick={runCombat}>Fight</Button>
  </crow>
  <crow>
    <img src="/images/races/{creature.race}/01.png" width="200px" class="-scale-x-[1]" />
  </crow>
</crow>

<crow class="relative w-full gap-2 px-px" vertical left up>
  <crow class="w-full !justify-between">
    <h4>Abilities</h4>
  </crow>
  <AbilityBar abilities={creature.abilities} dndDisabled />
</crow>

<!-- <pre class="text-xs">{JSON.stringify(creature, null, 2)}
</pre> -->
