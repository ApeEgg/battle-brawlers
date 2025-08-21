<script lang="ts">
  import type { Combatant } from '$src/types/combatant';

  let props: Combatant & {
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
  } = $props();

  let { race } = props;

  let facingRight = $derived(props.facingRight);
  let animations = $derived(props.animations);
  let elapsedMilliseconds = $derived(props.elapsedMilliseconds);
  let position = $derived(props.position);
  let y = $derived(position.y);
  let x = $derived(position.x);

  let currentAnimation = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds &&
        end > elapsedMilliseconds &&
        ['basicAttackRegular', 'basicAttackFast', 'basicAttackSlow'].includes(vfxName)
    )
  );

  let { nX, nY, sX, sY } = $derived.by(() => {
    const tx = currentAnimation?.targetX ?? x;
    const ty = currentAnimation?.targetY ?? y;

    const dX = tx - x;
    const dY = ty - y;
    const distance = Math.hypot(dX, dY) || 1; // avoid div-by-zero

    const ux = dX / distance;
    const uy = dY / distance;

    const attackReach = 30;
    const anticipate = Math.min(attackReach * 0.25, distance * 0.33); // small backward lean-in

    // start a bit "behind" (away from the opponent)
    const sX = x - ux * anticipate;
    const sY = y - uy * anticipate;

    // end point toward the opponent
    const step = Math.min(attackReach, distance);
    const nX = x + ux * step;
    const nY = y + uy * step;

    return { nX, nY, sX, sY };
  });

  const applyAnimationClass = (name: string) =>
    animations.some(
      ({ vfxName, start, end }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === name
    );
</script>

{#key currentAnimation?.id}
  <div
    class="relative"
    class:basicAttackSlow={applyAnimationClass('basicAttackSlow')}
    class:basicAttackRegular={applyAnimationClass('basicAttackRegular')}
    class:basicAttackFast={applyAnimationClass('basicAttackFast')}
    style="
        --position-x: {x}px;
        --position-y: {y}px;
        transform: translate(var(--position-x), var(--position-y));

        --attack-start-x: {sX}px;
        --attack-start-y: {sY}px;

        --attack-end-x: {nX}px;
        --attack-end-y: {nY}px;

        --attack-duration: {currentAnimation?.duration}ms;
      "
  >
    <div
      class:hurt={applyAnimationClass('hurt')}
      class="h-40 w-36"
      style="transform: translate(-50%, -50%);"
    >
      <div
        class={tw(
          'absolute inset-1 bg-contain bg-center bg-no-repeat',
          facingRight && 'scale-x-[-1]'
        )}
        style="background-image: url('/images/races/{race}/01.png');"
      ></div>
      <div
        class={tw('hurt-animation', facingRight && 'scale-x-[-1]')}
        style="
          -webkit-mask: url('/images/races/{race}/01.png') no-repeat center/contain;
          mask: url('/images/races/{race}/01.png') no-repeat center/contain;
        "
      ></div>
    </div>

    <!-- <div>
      <pre>
    {JSON.stringify(nX, null, 2)}
    {JSON.stringify(currentAnimation?.targetX, null, 2)}
  </pre>
    </div> -->
  </div>
{/key}

<style>
  .basicAttackFast {
    animation: basicAttackFast var(--attack-duration) cubic-bezier(0.02, 1.35, 0.53, 1);
  }
  @keyframes basicAttackFast {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    65% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackRegular {
    animation: basicAttackRegular var(--attack-duration) cubic-bezier(0.02, 1.35, 0.53, 1);
  }
  @keyframes basicAttackRegular {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    65% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackSlow {
    animation: basicAttackSlow var(--attack-duration) cubic-bezier(0.02, 1.35, 0.53, 1);
  }
  @keyframes basicAttackSlow {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    65% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .hurt-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
  }
  .hurt .hurt-animation {
    animation: hurt 340ms ease;
  }
  @keyframes hurt {
    0% {
      background-color: transparent;
      opacity: 0;
    }
    25% {
      background-color: rgba(255, 0, 0, 0.4);
      opacity: 1;
    }
    100% {
      background-color: transparent;
      opacity: 0;
    }
  }
</style>
