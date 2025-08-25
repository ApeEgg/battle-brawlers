<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';

  const { berserker } = CHARACTERS;

  let creatures = [
    { ...berserker, url: 'berserker' },
    { ...berserker, url: 'berserker' }
  ];
</script>

<h1>Creatures</h1>

<crow vertical up left>
  <crow up left class="gap-4 p-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Loot</div>
    <div class="flex-1 font-bold">Level</div>
  </crow>
  {#each creatures as creature, i}
    <Clickable
      href="/creatures/{creature.url}"
      class="crow left w-full gap-4 p-2 {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}"
    >
      <crow left class="flex-1 gap-2">
        <div class="w-6">
          <div class="overflow-hidden rounded-full">
            <img src="/images/races/{creature.race}/01.png" alt="" />
          </div>
        </div>

        <a href="/creatures/{creature.url}">{creature.name} </a>
      </crow>
      <div class="flex-1">n/a</div>
      <div class="flex-1">1</div>
    </Clickable>
  {/each}
</crow>
