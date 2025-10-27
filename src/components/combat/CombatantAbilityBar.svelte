<script lang="ts">
  import type { Ability } from '$src/types/ability';

  let props = $props();

  let preview = $derived(!!props.preview);
  let abilitiesCopied: Ability[] = $derived(props.abilitiesCopied);
  let progress = $derived(props.progress);
  let isStunned = $derived(!!props.statuses?.isStunned.ticks);
</script>

{#snippet iconBar(topLayer = false, progress = 100)}
  <div
    class={tw(
      'relative rounded-b border-t-[0.5px] border-stone-500 bg-stone-300 [grid-area:1/1]',
      topLayer && 'border-stone-500',
      preview && 'rounded-none border-[0.5px]'
    )}
    style="clip-path: polygon(0% 0%, {progress}% 0%, {progress}% 100%, 0% 100%);"
  >
    <div
      class={tw(
        'relative flex divide-x-[0.5px] divide-stone-500',
        topLayer && 'divide-stone-300 bg-stone-500',
        isStunned && topLayer && 'bg-gray-500'
      )}
    >
      {#each abilitiesCopied as { name, ticks, icon, chainLink }, i (`icon_${i}_${name}`)}
        <crow class="relative h-6 !flex-none" style="width: calc(12px*{ticks});">
          {#if chainLink}
            {#each Array(chainLink).fill(0).slice(0, -1) as _, j}
              <div
                class={tw(
                  'absolute top-0 bottom-0 w-[0.1px] border-r-[0.5px] border-dashed border-gray-400',
                  topLayer && 'border-stone-400/50'
                )}
                style="left: calc(((100% / {chainLink}) * ({j + 1})));"
              ></div>
            {/each}
          {/if}
          <Icon
            original={false}
            class={tw('relative text-sm text-stone-500', topLayer && 'text-stone-300')}
            name={icon}
          />
        </crow>
      {/each}
    </div>
  </div>
{/snippet}

<div class="w-[145px]">
  <div
    class={tw(
      'grid -translate-x-[0.5px] translate-y-[0.5px] overflow-hidden rounded-b',
      preview && 'translate-x-0 translate-y-0 rounded-none'
    )}
    style="width: calc((12px*{abilitiesCopied.reduce((acc, { ticks }) => acc + ticks, 0)}) + 2px);"
  >
    {@render iconBar()}
    {#if progress}
      {@render iconBar(true, progress * 100)}
    {/if}
  </div>
</div>
