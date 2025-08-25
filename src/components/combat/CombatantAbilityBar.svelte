<script lang="ts">
  let props = $props();

  let abilitiesCopied = $derived(props.abilitiesCopied);
  let progress = $derived(props.progress);
</script>

<div class="w-[144px]">
  <div
    class="relative -mx-px -mb-px rounded-xs border border-gray-800 bg-[#D7CEC1]"
    style="width: calc((12px*{abilitiesCopied.reduce((acc, { ticks }) => acc + ticks, 0)}) + 2px);"
  >
    <div
      class="absolute top-0 right-full bottom-0 left-0 bg-blue-400"
      style="right: {100 - progress * 100}%"
    ></div>

    <div class="relative flex divide-x divide-gray-600">
      {#each abilitiesCopied as { prettyName, ticks, icon }, i (`icon_${i}_${prettyName}`)}
        <div
          class="relative flex h-6 items-center justify-center text-center"
          style="min-width: calc(12px * {ticks});"
        >
          {#if icon === '1h1h' && ticks === 4}
            <div
              class="absolute top-0 bottom-0 left-1/2 w-[0.1px] -translate-x-1/2 bg-gray-400"
            ></div>
          {/if}
          <Icon class={tw('relative text-[8px]', ticks > 1 && 'text-sm')} name={icon} />
        </div>
      {/each}
    </div>
  </div>
</div>
