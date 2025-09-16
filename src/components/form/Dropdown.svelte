<script lang="ts">
  import { emptySlot } from '$src/helpers';

  type Option =
    | {
        name?: string;
        icon: string;
      }
    | string;

  export let value: string = 'Choose one';
  export let options: Option[] = [];
</script>

<div class="relative rounded-sm border border-gray-200">
  <select class="absolute inset-0 h-full w-full opacity-0" bind:value on:change>
    <optgroup label="Choose one">
      {#each options as option, i}
        {#if typeof option === 'string'}
          <option value={option}>{option}</option>
        {:else}
          <option value={i}>{option?.name}</option>
        {/if}
      {/each}
    </optgroup>
  </select>
  <Frame class="dark:bg-black">
    <crow class="!justify-between">
      {#if options.find(emptySlot)}
        <span class="first-letter:uppercase" class:default={value === 'Choose one'}>{value}</span>
      {:else}
        {value || 'N/A'}
      {/if}
      <Icon class="text-gray-800 dark:text-white" name="down" />
    </crow>
  </Frame>
</div>
