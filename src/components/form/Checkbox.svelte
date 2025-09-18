<script lang="ts">
  import type { Snippet } from 'svelte';

  let { id = '', value = $bindable(false), onchange, children } = $props<{ children: Snippet }>();
</script>

<label class="crow left gap-2" for={id}>
  <input class="peer hidden" type="checkbox" {id} checked={value} {onchange} />
  <crow class="h-5 w-5 rounded-sm bg-white peer-checked:*:flex dark:bg-black">
    <Icon class="hidden text-green-500" name="success" />
  </crow>
  <div class="overflow-hidden">
    {@render children()}
  </div>
</label>
