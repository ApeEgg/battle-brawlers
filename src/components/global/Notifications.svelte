<script lang="ts">
  import { tick } from 'svelte';
  import { fly } from 'svelte/transition';

  const { notifications } = STORES;
  const { removeFirstNotification } = ACTIONS;

  let ref: HTMLDivElement;
  let animations: any[] = [];
  let animating = false;

  const titleByType = (type: string) =>
    ({
      error: 'Ops, something went wrong!',
      information: 'Did you know?',
      success: 'Good news',
      warning: 'Heads up'
    })[type];

  const removeFirst = (items: any[]) => {
    if (!ref.children.length) return;
    const { height } = ref.children[0].getBoundingClientRect();
    if (items.length && !animating && height) {
      const timing = {
        delay: 3000,
        duration: 600,
        easing: 'ease'
      };
      animations.push(
        ref.animate(
          {
            transform: `translateY(-${height}px)`
          },
          timing
        )
      );
      animations.push(
        ref.children[0].animate(
          {
            opacity: 0
          },
          timing
        )
      );
      animating = true;

      animations[0].onfinish = () => {
        animations = [];
        animating = false;
        removeFirstNotification();
      };
    }
  };

  $: ref &&
    (async () => {
      await tick();
      removeFirst([...$notifications]);
    })();

  const hover = (enter: boolean) =>
    animations.map((animation) => animation[enter ? 'pause' : 'play']());
</script>

<div
  role="status"
  class="fixed top-8 right-2 text-gray-500"
  on:mouseenter={hover.bind(undefined, true)}
  on:mouseleave={hover.bind(undefined, false)}
>
  <div class="crow right" bind:this={ref}>
    {#each [...$notifications] as notification (notification)}
      {@const { type, message } = JSON.parse(notification)}
      <div>
        <div in:fly={{ x: 50 }}>
          <div
            class={tw(
              'notification glass mb-2 py-3 pr-5 pl-3',
              type === 'error' && 'border-red-500',
              type === 'warning' && 'border-orange-500',
              type === 'information' && 'border-blue-500',
              type === 'success' && 'border-green-500'
            )}
          >
            <crow class="gap-2">
              <crow
                class={tw(
                  'icon h-8 w-8 rounded-full',
                  type === 'error' && 'bg-red-500',
                  type === 'warning' && 'bg-orange-500',
                  type === 'information' && 'bg-blue-500',
                  type === 'success' && 'bg-green-500'
                )}
              >
                <Icon class="text-lg text-white" name={type} />
              </crow>
              <div>
                <strong class="text-base text-gray-800">{titleByType(type)}</strong>
                <div class="max-w-xs text-gray-700 first-letter:capitalize">
                  {message.replace('Error: ', '')}
                </div>
              </div>
            </crow>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
