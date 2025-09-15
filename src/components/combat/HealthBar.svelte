<script lang="ts">
  let props = $props();
  let { currentAnimation, applyAnimationClass = () => {} } = $derived(props);
</script>

<Bar {...props}>
  <div
    class:heal={applyAnimationClass('heal')}
    class="alfa-slab-one fat-number absolute top-1 left-full text-green-300"
  >
    <div class="heal-x translate-x-0">
      <div class="heal-y -translate-y-0">+{currentAnimation?.amount}</div>
    </div>
  </div>
</Bar>

<style>
  .heal-x {
    opacity: 0;
  }
  .heal .heal-x {
    animation: heal-x 750ms cubic-bezier(0.02, 0.01, 0.21, 1);
  }
  @keyframes heal-x {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(10px);
      opacity: 0;
    }
  }
  .heal .heal-y {
    animation: heal-y 750ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes heal-y {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-20px);
    }
  }
</style>
