<script lang="ts">
  import type { Snippet } from 'svelte';

  let { id = '', value = $bindable(false), onchange, children } = $props<{ children: Snippet }>();
</script>

<label class="row-left gap-2" for={id}>
  <input class="hidden peer" type="checkbox" {id} checked={value} {onchange} />
  <Row class="rounded-sm w-5 h-5 bg-white dark:bg-black peer-checked:*:flex">
    <Icon class="text-green-500 hidden" name="success" />
  </Row>
  <div class="overflow-hidden">
    {@render children()}
  </div>
</label>
