<script lang="ts">
  import AVAILABLE_KEYS from '$src/constants/AVAILABLE_KEYS';
  import type { DynamicObject } from '$src/types/common';

  const { keys, keyLock } = STORES;

  let localKeys: DynamicObject = { ...AVAILABLE_KEYS };

  const toggleKey = (c: KeyboardEvent) => {
    if (!(c instanceof KeyboardEvent)) return; // Password auto-filler fires `Event` which is missing `code` for example
    const { type, code, metaKey, ctrlKey } = c;
    const lcKey = code.toLowerCase();
    if ($keys[lcKey] && type === 'keydown') return;

    if (metaKey || ctrlKey) {
      localKeys = { ...AVAILABLE_KEYS };
      return;
    }

    if ($keyLock && !['enter', 'escape', 'shiftleft', 'shiftright'].includes(lcKey)) return;

    if (lcKey in localKeys) localKeys[lcKey] = type === 'keydown';
  };

  $: $keys = localKeys;
</script>

<svelte:window on:keydown={toggleKey} on:keyup={toggleKey} />

<!-- <div class="fixed bottom-0 right-0 bg-white text-gray-800 p-8 text-xs">
  <pre>{JSON.stringify($keys, null, 2)}</pre>
</div> -->
