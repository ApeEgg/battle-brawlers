<script lang="ts">
  let { children } = $props();
</script>

<div class="combat-arena">
  {@render children()}
</div>

<style>
  .combat-arena {
    position: relative;
    border: 1px solid gray;
    background: radial-gradient(rgba(0, 0, 0, 0.5), transparent 75%);
    width: 100%;
    max-width: 500px;
    margin: 400px auto 0 auto;
    transition: transform 0.5s ease;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
</style>
