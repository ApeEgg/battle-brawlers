<script lang="ts">
  let props = $props();

  let abilitiesCopied = $derived(props.abilitiesCopied);
  let progress = $derived(props.progress);
</script>

<div class="w-[144px]">
  <div
    class="relative -mx-[0.5px] -mb-[0.5px] border-[0.5px] border-gray-500 bg-[#eae1d4] shadow"
    style="width: calc((12px*{abilitiesCopied.reduce((acc, { ticks }) => acc + ticks, 0)}) + 2px);"
  >
    <div
      class="absolute top-0 right-full bottom-0 left-0 bg-blue-400"
      style="right: {100 - progress * 100}%"
    ></div>

    <div class="relative flex divide-x-[0.5px] divide-gray-600">
      {#each abilitiesCopied as { prettyName, ticks, icon, chainLink, basic }, i (`icon_${i}_${prettyName}`)}
        <div
          class="relative flex h-6 items-center justify-center text-center"
          style="min-width: calc(12px*{ticks});"
        >
          {#if chainLink}
            {#each Array(chainLink).fill(0).slice(0, -1) as _, j}
              <div
                class="absolute top-0 bottom-0 w-[0.1px] border-r border-dashed border-gray-400"
                style="left: calc(((100% / {chainLink}) * ({j + 1})));"
              ></div>
            {/each}
          {/if}
          <Icon original={false} class={tw('relative text-sm text-[#69655c]')} name={icon} />
        </div>
      {/each}
    </div>
  </div>
</div>
