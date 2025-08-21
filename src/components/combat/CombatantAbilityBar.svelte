<script lang="ts">
  let props = $props();

  let abilitiesCopied = $derived(props.abilitiesCopied);
  let progress = $derived(props.progress);
</script>

<div class="relative">
  <div
    class="absolute top-0 right-full bottom-0 left-0 bg-blue-400"
    style="right: {100 - progress * 100}%"
  ></div>

  <div class="abilities relative flex w-full divide-x divide-gray-600 border border-gray-600">
    {#each abilitiesCopied as { prettyName, ticks, icon }, i (`icon_${i}_${prettyName}`)}
      <div
        class="relative flex h-6 items-center justify-center text-center"
        style="width: calc(calc(100% / 12)*{ticks});"
      >
        {#if icon === '1h1h' && ticks === 2}
          <div
            class="absolute top-0 bottom-0 left-1/2 w-[0.1px] -translate-x-1/2 bg-gray-400"
          ></div>
        {/if}
        <Icon class={tw('relative text-[8px]', ticks > 1 && 'text-sm')} name={icon} />
      </div>
    {/each}
  </div>
</div>
