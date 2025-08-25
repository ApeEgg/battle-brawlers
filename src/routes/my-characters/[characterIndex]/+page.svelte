<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import app from '$src/app.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ABILITIES from '$src/constants/ABILITIES';
  import type { Ability } from '$src/types/ability';
  import Tooltip from '$src/components/ui/Tooltip.svelte';
  import { calculateTickStart } from '$src/ts/Utils';

  const flipDurationMs = 300;

  const { token, overlay } = STORES;

  let characterIndex = $derived($page.params.characterIndex);
  let character = $derived(app.characters[characterIndex as any]);
  let availableAbilities: Ability[] = $state([]);
  let dropFromOthersDisabled = $state(false);

  const considerCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };
  const transformDraggedCharacterAbility = (draggedElement: any, data: any, _index: any) => {
    if (['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(data.abilityName)) {
      dropFromOthersDisabled = true;
    } else {
      dropFromOthersDisabled = false;
    }
    draggedElement.classList.remove('group/tooltip');
    draggedElement.style['background-color'] = '#fff';
  };

  const considerAvailableAbilities = (e: any) => {
    e.detail.items
      .sort((a: Ability, b: Ability) => a.prettyName.localeCompare(b.prettyName))
      .sort((a: Ability, b: Ability) => a.ticks - b.ticks);
    availableAbilities = e.detail.items;
  };
  const finalizeAvailableAbilities = (e: any) => {
    availableAbilities = e.detail.items;
  };
  const transformDraggedAvailableAbility = (draggedElement: any, _data: any, _index: any) => {
    const ticks = draggedElement.querySelector('.ticks');
    if (ticks) {
      ticks.remove();
    }
    draggedElement.classList.remove('group/tooltip');
    draggedElement.style['background-color'] = '#fff';
  };

  $effect(() => {
    availableAbilities = Object.values(ABILITIES)
      .map((fn) => fn())
      .filter(
        (ability) =>
          !['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
            ability.abilityName
          ) && !character.abilities.find((a) => a.icon === ability.icon)
      )
      // .filter((ability) => !character.abilities.find((a) => a.icon === ability.icon)) // fix this to look at ID
      .sort((a: Ability, b: Ability) => a.prettyName.localeCompare(b.prettyName))
      .sort((a: Ability, b: Ability) => a.ticks - b.ticks);
  });
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
        <div class="font-bold">ID:</div>
        <div>{character.id}</div>
      </crow>
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

  <crow class="relative w-full gap-2 px-px" vertical left up>
    <crow class="w-full !justify-between">
      <h4>Abilities</h4>
    </crow>

    <div class="relative w-[calc((100%/18)*15)]">
      <crow class="w-full" up>
        {#each Array(15) as _, i}
          <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
        {/each}
        <div
          class="absolute -top-2 -bottom-2 left-[calc((100%/15)*12)] w-px border-r border-dashed"
        >
          <crow vertical class="absolute bottom-full -translate-x-1/2 text-center text-xs">
            <strong class="text-black">Min</strong>12&nbsp;ticks
          </crow>
        </div>
        <div
          class="absolute -top-2 -bottom-2 left-[calc((100%/15)*15)] w-px border-r border-dashed"
        >
          <crow vertical class="absolute bottom-full -translate-x-1/2 text-center text-xs">
            <strong class="text-black">Max</strong>15&nbsp;ticks
          </crow>
        </div>
      </crow>

      <crow
        up
        left
        class="crow up left absolute inset-0 w-full rounded-lg"
        use:dndzone={{
          items: character.abilities,
          flipDurationMs,
          transformDraggedElement: transformDraggedCharacterAbility,
          dropTargetStyle: { outline: 'rgba(100, 100, 100, 0.5) solid 2px' }
        }}
        onconsider={considerCharacterAbilities}
        onfinalize={finalizeCharacterAbilities}
      >
        {#each character.abilities as ability, i (ability.id)}
          {@const tickStart = calculateTickStart(character.abilities, i)}
          <crow
            animate:flip={{ duration: flipDurationMs }}
            class={tw(
              'group/tooltip relative -ml-px h-full !flex-none rounded-lg border border-gray-800',
              tickStart > 15 && 'pointer-events-none border-red-400 text-red-400 opacity-50'
            )}
            style="width: calc(((100% / 15)*{ability.ticks}) + 1px);"
          >
            <Icon name={ability.icon} />
            <!-- {ability.id.substring(0, 5)} -->

            <Tooltip class="w-60">
              <crow class="w-full !justify-between">
                <strong class="text-black">{ability.prettyName}</strong>
              </crow>
              <crow vertical>
                <div class="text-sm"><strong>Cast time:</strong> {ability.ticks} ticks</div>
              </crow>
              <span class="text-sm">{ability.description}</span>
            </Tooltip>
          </crow>
        {/each}
      </crow>
    </div>
  </crow>

  <crow
    left
    class="available-abilities min-h-[98px] w-full !flex-none gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 inset-shadow-sm"
    use:dndzone={{
      items: availableAbilities,
      flipDurationMs,
      dropFromOthersDisabled,
      transformDraggedElement: transformDraggedAvailableAbility,
      dropTargetStyle: {}
    }}
    onconsider={considerAvailableAbilities}
    onfinalize={finalizeAvailableAbilities}
  >
    {#each availableAbilities as ability (ability.id)}
      <crow
        class="group/tooltip relative h-20 w-20 !flex-none gap-2 rounded border border-black bg-white"
        animate:flip={{ duration: flipDurationMs }}
      >
        <div class="ticks">{ability.ticks}</div>
        <Icon name={ability.icon} />
        <!-- {ability.id.substring(0, 5)} -->
        <Tooltip class="w-60">
          <crow class="w-full !justify-between">
            <strong class="text-black">{ability.prettyName}</strong>
          </crow>
          <crow vertical>
            <div class="text-sm"><strong>Cast time:</strong> {ability.ticks} ticks</div>
          </crow>
          <span class="text-sm">{ability.description}</span>
        </Tooltip>
      </crow>
    {/each}
  </crow>
</crow>

<code class="text-xs">
  <pre>{JSON.stringify(availableAbilities, null, 2)}
  </pre>
</code>

<style>
  :global(.TESTING) {
    background: black;
  }
</style>
