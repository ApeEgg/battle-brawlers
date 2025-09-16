<script lang="ts">
  import { goto } from '$app/navigation';
  import { RECRUITABLE_CHARACTERS } from '$src/app.svelte';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import type { Character } from '$src/types/character';

  const { notify } = ACTIONS;

  // let characters = $derived(
  //   Object.keys(ALL_CHARACTERS)
  //     .map((character) => CHARACTERS(character, true))
  //     .filter(({ image }) => !image.startsWith('creature'))
  // );

  let characters = RECRUITABLE_CHARACTERS;

  const pickCharacter = (character: Character) => {
    app.characters.push(character);
    goto(`/brawlers/${app.characters.length - 1}`);
  };
</script>

<Headline text="brawlers" />

{#if !app.characters.length}
  <crow class="cinzel my-10"> Recruit your first brawler </crow>
{/if}

<crow class="!flex-wrap gap-2" up left>
  {#each characters as char}
    {@const character = CHARACTERS(char, true)}
    {@const isRecruited = app.characters.find(({ id }) => id === character.id)}

    <Clickable
      class={tw(
        'crow vertical up relative !h-52 w-60 !flex-none overflow-hidden bg-gray-100 p-2',
        isRecruited
          ? 'cursor-not-allowed opacity-50 grayscale'
          : 'cursor-pointer active:translate-y-px'
      )}
      onclick={() =>
        isRecruited
          ? notify({ warning: `${character.name} is already recruited` })
          : pickCharacter(char)}
    >
      <div class="cinzel text-2xl">{character.name}</div>
      <Hr />
      <div class={tw('h-20 -translate-y-5', character.name === 'Elon' && '-translate-y-13')}>
        <img src="/images/races/{character.image}" height="100%" alt="" />
      </div>
      <div class="absolute inset-0 top-auto h-2 bg-gradient-to-t from-white to-transparent"></div>
    </Clickable>
  {/each}
</crow>
