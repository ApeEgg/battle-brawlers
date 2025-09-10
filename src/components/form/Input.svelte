<script lang="ts">
  export let placeholder: string | undefined;
  export let blur: any;
  export let inputRef: HTMLInputElement;
  export let value: string;

  let {
    placeholder: _placeholder,
    value: _value,
    inputRef: _inputRef,
    small,
    class: _class,
    ...props
  } = $$props;

  $: blur && inputRef && inputRef === document.activeElement && ((value = ''), inputRef.blur());
</script>

<div
  class={tw(
    'input relative inline-block border-none bg-none text-gray-800 outline-none dark:text-white',
    _class
  )}
  class:active={value}
  class:small
>
  <input
    class="w-full rounded bg-white p-2 dark:bg-black"
    type="text"
    {...props}
    autocomplete="off"
    bind:this={inputRef}
    on:keyup
    on:focus
    on:blur
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
