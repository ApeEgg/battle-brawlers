<script lang="ts">
  import type { Ability } from '$src/types/ability';

  let {
    small,
    hideTickCount,
    ability,
    disabled = false
  }: { small?: boolean; hideTickCount?: boolean; ability: Ability; disabled?: boolean } = $props();

  let { icon, ticks, basic, statusEffects } = $derived(ability);
</script>

<!-- {#if !basic}
  <Icon
    class={tw('absolute text-[300px] opacity-20', small && 'text-9xl', small)}
    name={icon}
    original
  />
{/if} -->

{#if !hideTickCount}
  <crow
    class={tw(
      'ticks absolute top-full left-1/2 h-5 w-8 -translate-x-1/2 -translate-y-3/4 rounded-sm border-[0.5px] border-gray-400 bg-white',
      small && 'h-3 w-5'
    )}
  >
    <div class={tw('text-md leading-0 font-bold', small && 'text-xs')}>
      {ticks}
    </div>
  </crow>
{/if}
<Icon
  class={tw(
    'relative text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.5xl))]',
    basic && 'text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.3xl))] text-gray-400',
    small && 'text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.2xl))]',
    small && basic && 'text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.xl))]',
    disabled && 'text-red-300'
    // !hideTickCount && '-translate-y-1'
  )}
  name={icon}
  original={!basic && !disabled}
/>

{#if statusEffects && statusEffects.length > 0}
  <crow class={tw('absolute bottom-1 left-1', small && 'bottom-px left-px')}>
    {#each statusEffects as effect}
      <Icon name={effect} class={tw('text-md', small && 'text-[10px]')} original />
    {/each}
  </crow>
{/if}
