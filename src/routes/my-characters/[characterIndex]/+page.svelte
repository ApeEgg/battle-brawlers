<script lang="ts">
  import app from '$src/app.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ABILITIES from '$src/constants/ABILITIES';

  const { token, overlay } = STORES;

  let characterIndex = $derived($page.params.characterIndex);
  let character = $derived(app.characters[characterIndex as any]);
  let availableAbilities = Object.values(ABILITIES);
</script>

<Clickable class="crow gap-1" onclick={() => goto('/creatures')}>
  <Icon name="left" class="text-xs" />
  Go back
</Clickable>

<h2>{character.name}</h2>

<crow vertical class="gap-6">
  <crow left up class="gap-4">
    <div class="h-40">
      <img src="/images/races/{character.race}/01.png" alt="" class="h-full" />
    </div>
    <crow vertical up left>
      <crow class="gap-2">
        <div class="font-bold">Name:</div>
        <div>{character.name}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Race:</div>
        <div>{character.race}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Health points:</div>
        <div>{character?.combatStats?.maxHealth}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Damage:</div>
        <div>{character?.combatStats?.damage}</div>
      </crow>
    </crow>
  </crow>

  <crow class="relative w-full gap-2" vertical left up>
    <h3>Abilities</h3>

    <div class="relative w-full">
      <crow class="w-full" up>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
      </crow>

      <crow class="absolute inset-0 w-full" up left>
        {#each character.abilities as ability, i (`${character.name}_ability_${i}`)}
          <crow
            class="-ml-px h-full !flex-none rounded-lg border border-gray-800"
            style="width: calc(calc(calc(100% / 12)*{ability.ticks}) + 1px);"
          >
            <Icon name={ability.icon} />
          </crow>
        {/each}
      </crow>
    </div>
  </crow>

  <crow class="available-abilities gap-4">
    {#each availableAbilities as ability}
      <crow class="h-20 w-20 gap-2 rounded-lg bg-gray-100">
        <div>{ability.ticks}</div>
        <Icon name={ability.icon} />
      </crow>
    {/each}
  </crow>
</crow>

<code class="text-xs">
  <pre>{JSON.stringify(character, null, 2)}
  </pre>
</code>
