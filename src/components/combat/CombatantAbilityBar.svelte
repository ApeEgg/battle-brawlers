<script lang="ts">
  let props = $props();

  let preview = $derived(!!props.preview);
  let abilitiesCopied = $derived(props.abilitiesCopied);
  let progress = $derived(props.progress);
  let isStunned = $derived(!!props.statuses?.isStunned.ticks);
</script>

{#snippet iconBar(topLayer = false, progress = 100)}
  <div
    class={tw(
      'relative rounded-b border-t-[0.5px] border-[#989387] bg-[#ddd7cd] [grid-area:1/1]',
      topLayer && 'border-[#989387]',
      preview && 'rounded-none border-[0.5px]'
    )}
    style="clip-path: polygon(0% 0%, {progress}% 0%, {progress}% 100%, 0% 100%);"
  >
    <div
      class={tw(
        'relative flex divide-x-[0.5px] divide-[#989387]',
        topLayer && 'divide-[#eae1d4] bg-[#989387]',
        isStunned && topLayer && 'bg-[#9a9a9a]'
      )}
    >
      {#each abilitiesCopied as { prettyName, ticks, icon, chainLink }, i (`icon_${i}_${prettyName}`)}
        <crow class="relative h-7 !flex-none" style="width: calc(12px*{ticks});">
          {#if chainLink}
            {#each Array(chainLink).fill(0).slice(0, -1) as _, j}
              <div
                class={tw(
                  'absolute top-0 bottom-0 w-[0.1px] border-r-[0.5px] border-dashed border-gray-400',
                  topLayer && 'border-transparent'
                )}
                style="left: calc(((100% / {chainLink}) * ({j + 1})));"
              ></div>
            {/each}
          {/if}
          <Icon
            original={false}
            class={tw('relative text-sm text-[#989387]', topLayer && 'text-[#eae1d4]')}
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
