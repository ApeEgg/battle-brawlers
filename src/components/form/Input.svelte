<script lang="ts">
  let {
    placeholder,
    blur,
    value = $bindable(''),
    class: classes,
    type = 'text',
    small,
    onfocus,
    onblur,
    ...rest
  }: {
    placeholder?: string;
    blur?: boolean;
    value?: string;
    class?: string;
    type?: string;
    small?: boolean;
    onfocus?: (e: FocusEvent) => void;
    onblur?: (e: FocusEvent) => void;
  } = $props();

  let inputRef: HTMLInputElement;

  let { escape } = $derived(app.keys);

  $effect(() => {
    if (escape && inputRef && inputRef === document.activeElement) {
      value = '';
      // inputRef.blur();
    }
    // if (blur && inputRef && inputRef === document.activeElement) {
    //   if (value !== '') {
    //     value = '';
    //   }
    //   // else {
    //   //   inputRef.blur();
    //   // }
    // }
  });
</script>

<div
  class={tw(
    'input relative inline-block border-none bg-none text-gray-800 outline-none dark:text-white',
    classes
  )}
  class:active={value}
  class:small
>
  <input
    class="w-full rounded bg-white p-2 dark:bg-black"
    {type}
    {onfocus}
    {onblur}
    {...rest}
    autocomplete="off"
    bind:this={inputRef}
    bind:value
  />

  {#if placeholder}
    <div
      class="placeholder pointer-events-none absolute bottom-1/2 left-2 translate-y-1/2 rounded bg-white px-1.5 pt-px text-gray-600 transition-[bottom,left] dark:bg-black dark:text-gray-400"
    >
      {placeholder}
    </div>
  {/if}
</div>

<style>
  input:focus + .placeholder,
  .input.active .placeholder {
    bottom: calc(100% + 6px);
    left: 0px;
  }
</style>
