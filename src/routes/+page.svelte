<script lang="ts">
  import ABILITIES from '$src/constants/ABILITIES';
  import EQUIPMENT from '$src/constants/EQUIPMENT';

  const equipment = ABILITIES('slash', false, { overrides: { ticks: 4, id: 'something' } });
</script>

<Debug data={equipment} />
