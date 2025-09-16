<script lang="ts">
  import CHARACTERS, { ALL_CHARACTERS } from '$src/constants/CHARACTERS';

  let creatures = Object.entries(ALL_CHARACTERS)
    .map(([key]) => ({
      ...CHARACTERS(key, true),
      url: key
    }))
    .filter(({ image }) => image.startsWith('creature'));
</script>

<Headline text="the arena" />

<crow vertical up left class="-mx-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Possible loot</div>
    <div class="flex-1 font-bold">Level</div>
  </crow>
  {#each creatures as creature, i}
    <Clickable
      href="/the-arena/{creature.url}"
      class={tw('crow left w-full gap-4 px-6 py-2', i % 2 === 0 ? 'bg-[#faf7f2]' : 'bg-white')}
    >
      <crow left class="flex-1 gap-2">
        <div class="w-6">
          <div class="h-6 overflow-hidden rounded-full">
            <img src="/images/races/{creature.image}" alt="" />
          </div>
        </div>

        <a href="/the-arena/{creature.url}">{creature.name} </a>
      </crow>
      <div class="flex-1">n/a</div>
      <div class="flex-1">1</div>
    </Clickable>
  {/each}
</crow>
