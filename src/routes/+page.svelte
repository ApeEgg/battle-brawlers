<script lang="ts">
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import ABILITIES from '$src/constants/ABILITIES';
  import EQUIPMENT from '$src/constants/EQUIPMENT';

  const equipment = ABILITIES('swing', false, { overrides: { ticks: 4, id: 'something' } });

  let abilitiesPool = [
    [ABILITIES('punch', false, { overrides: { ticks: 1 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 2 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 3 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 4 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 5 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 6 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 7 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 8 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 9 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 10 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 11 } })],
    [ABILITIES('punch', false, { overrides: { ticks: 12 } })]
  ];
</script>

{#each abilitiesPool as abilities, i (i)}
  <AbilityBar {abilities} dndDisabled small character={app.characters[0]} />
{/each}

<!-- <Debug data={equipment} /> -->
