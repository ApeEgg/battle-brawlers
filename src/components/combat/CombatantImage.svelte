<script lang="ts">
  import type { Combatant } from '$src/types/combatant';

  let {
    image,
    animations,
    facingRight,
    statuses,
    elapsedMilliseconds,
    position,
    size
  }: Combatant & {
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
  } = $props();

  let y = $derived(position.y);
  let x = $derived(position.x);

  let currentAnimation = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds &&
        end > elapsedMilliseconds &&
        [
          'slam',
          'slash',
          'stab',
          'basicAttackRegular',
          'basicAttackFast',
          'basicAttackSlow',
          'spin',
          'slam',
          'slash',
          'stab'
        ].includes(vfxName)
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

    const attackReach = 5;

    let anticipate = 0;
    if (currentAnimation?.vfxName === 'basicAttackSlow') anticipate = 50;
    if (currentAnimation?.vfxName === 'basicAttackRegular') anticipate = 30;
    if (currentAnimation?.vfxName === 'basicAttackFast') anticipate = 10;

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
    !statuses.knockedOut &&
    animations.some(
      ({ vfxName, start, end }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === name
    );
</script>

{#key currentAnimation?.id}
  <div
    class="relative"
    class:basicAttackSlow={statuses.isStunned.ticks === 0 && applyAnimationClass('basicAttackSlow')}
    class:basicAttackRegular={statuses.isStunned.ticks === 0 &&
      applyAnimationClass('basicAttackRegular')}
    class:basicAttackFast={statuses.isStunned.ticks === 0 && applyAnimationClass('basicAttackFast')}
    class:knockedOut={statuses.knockedOut}
    style="
        --position-x: {x}px;
        --position-y: {y}px;
        transform: translate(var(--position-x), var(--position-y));

        --attack-start-x: {sX}px;
        --attack-start-y: {sY}px;

        --attack-end-x: {nX}px;
        --attack-end-y: {nY}px;

        --attack-duration: {(currentAnimation?.end || 0) - (currentAnimation?.start || 0)}ms;
      "
  >
    <div
      class:hurt={applyAnimationClass('hurt')}
      class:block={applyAnimationClass('block')}
      class:attackBlocked={applyAnimationClass('attackBlocked')}
      class:spin={applyAnimationClass('spin')}
      class="h-40 w-36"
      style="transform: translate(-50%, -50%);"
    >
      <div
        class={tw('absolute inset-1 bg-bottom bg-no-repeat', !facingRight && 'scale-x-[-1]')}
        style="background-image: url('/images/races/{image}'); background-size: auto {100 * size}%;"
      ></div>
      <div
        class={tw('hurt-animation', !facingRight && 'scale-x-[-1]')}
        style="
          -webkit-mask: url('/images/races/{image}') no-repeat bottom/auto {100 * size}%;
          mask: url('/images/races/{image}') no-repeat bottom/auto {100 * size}%;
        "
      ></div>
      <crow
        class={tw(
          'block-animation text-8xl',
          facingRight ? 'translate-x-8' : '-translate-x-8 scale-x-[-1]'
        )}
      >
        <!-- <Icon name="block" /> -->
        <img src="/images/shield.png" width="{60 * size}%" alt="" />
        <div
          class="attackBlocked-animation"
          style="
          -webkit-mask: url('/images/shield.png') no-repeat center/auto {100 * size}%;
          mask: url('/images/shield.png') no-repeat center/auto {100 * size}%;
        "
        ></div>
      </crow>
    </div>

    <Debug data={currentAnimation} />
  </div>
{/key}

<style>
  .knockedOut {
    filter: grayscale(100%);
  }

  .basicAttackFast {
    animation: basicAttackFast var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackFast {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackRegular {
    animation: basicAttackRegular var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackRegular {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackSlow {
    animation: basicAttackSlow var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackSlow {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }
  .spin {
    animation: spin 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) scaleX(1) scaleX(1);
    }
    50% {
      transform: translate(-50%, -50%) scaleX(1) scaleX(-1);
    }
    100% {
      transform: translate(-50%, -50%) scaleX(1) scaleX(1);
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

  .block-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    /* mix-blend-mode: multiply; */
    opacity: 0;
    filter: grayscale(100%);
  }
  .block .block-animation {
    opacity: 1;
  }

  .attackBlocked .attackBlocked-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
    filter: grayscale(100%);
  }
  .attackBlocked .attackBlocked-animation {
    animation: attackBlocked 340ms ease;
  }
  @keyframes attackBlocked {
    0% {
      background-color: transparent;
      opacity: 0;
    }
    25% {
      background-color: gray;
      opacity: 1;
    }
    100% {
      background-color: transparent;
      opacity: 0;
    }
  }
</style>
