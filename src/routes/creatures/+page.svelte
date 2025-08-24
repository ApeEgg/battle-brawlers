<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';

  const { berserker } = CHARACTERS;
  let creatures = [
    { ...berserker, url: 'berserker' },
    { ...berserker, url: 'berserker' }
  ];
</script>

<crow vertical up left>
  <crow up left class="gap-4 p-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Loot</div>
    <div class="flex-1 font-bold">Level</div>
  </crow>
  {#each creatures as creature}
    <crow up left class="gap-4 p-2">
      <crow left class="flex-1">
        <div class="w-6">
          <div class="overflow-hidden rounded-full">
            <img src="/images/races/dwarf/01.png" />
          </div>
        </div>

        <a href="/creatures/{creature.url}">{creature.name} </a>
      </crow>
      <div class="flex-1">n/a</div>
      <div class="flex-1">1</div>
    </crow>
  {/each}
</crow>
