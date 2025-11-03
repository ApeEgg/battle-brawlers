<script lang="ts">
  let { text, class: classes }: { text: string; class?: string } = $props();
</script>

<crow
  class={tw('cinzel !flex-none rounded-full bg-gray-200 px-3 py-0 text-sm text-gray-500', classes)}
>
  {text}
</crow>
