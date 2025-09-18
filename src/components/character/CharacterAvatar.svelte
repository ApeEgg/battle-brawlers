<script lang="ts">
  import type { Character } from '$src/types/character';

  let {
    image,
    size,
    class: classes,
    facingRight = true,
    inCombat = false
  }: Character & { class?: string; facingRight?: boolean; inCombat?: boolean } = $props();
</script>

<crow down class={tw('aspect-[11/12] w-36', !facingRight && 'scale-x-[-1]', classes)}>
  <img
    src="/images/races/{image}"
    class="max-w-none"
    alt=""
    style="height:calc(100%*{inCombat ? 1 : size});"
  />
</crow>
