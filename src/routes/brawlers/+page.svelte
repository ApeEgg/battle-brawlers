<script lang="ts">
  import { goto } from '$app/navigation';
  import { RECRUITABLE_CHARACTERS } from '$src/app.svelte';
  import CharacterAvatar from '$src/components/character/CharacterAvatar.svelte';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { ALL_ELEMENTS } from '$src/constants/ELEMENTS';
  import type { Character } from '$src/types/character';
  import { prettyCombatStatKey } from '$src/types/combatStats';

  const { notify } = ACTIONS;

  let characters = RECRUITABLE_CHARACTERS;

  const pickCharacter = (character: Character) => {
    if (confirm('Are you sure you want to recruit this character?')) {
      app.characters.push(character);
      goto(`/brawlers/${app.characters.length - 1}`);
    }
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
    {@const color = ALL_ELEMENTS[character.element].color.primary}
    {@const combatStats = Object.entries(character.combatStats).filter(
      ([key]) => !['limits', 'currentArmor', 'currentHealth'].includes(key)
    )}
    <Clickable
      class={tw(
        'crow vertical up !h-50 w-60 !flex-none overflow-hidden bg-gray-100 p-2',
        isRecruited
          ? 'cursor-not-allowed opacity-50 grayscale'
          : 'cursor-pointer active:translate-y-px'
      )}
      onclick={() =>
        isRecruited
          ? notify({ warning: `${character.name} is already recruited` })
          : pickCharacter(char)}
    >
      <div class="cinzel text-2xl" style="color:{color};">{character.name}</div>
      <Hr />
      <crow left up class="w-full gap-4">
        <CharacterAvatar {...character} class="w-20" />
        <crow vertical up left>
          {#each combatStats as [stat, value]}
            <crow class="!flex-none gap-2" left>
              <div class="font-bold">
                <Icon original name={stat} />
              </div>
              <div>{value}</div>
            </crow>
          {/each}
        </crow>
      </crow>
      <!-- <div class="absolute inset-0 top-auto h-2 bg-gradient-to-t from-white to-transparent"></div> -->
    </Clickable>
  {/each}
</crow>
