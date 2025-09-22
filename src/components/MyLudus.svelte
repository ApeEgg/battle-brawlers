<script lang="ts">
  import { getLevelByExperience } from '$src/ts/level';
  import { untrack } from 'svelte';

  let { closeSelf } = $props();

  let sliderRef: HTMLDivElement;
  let LEVELS = Array(25)
    .fill(0)
    .map((_, i) => i + 1);

  $effect(() => {
    $state.snapshot(app.showAccountProgression);
    if (!app.showAccountProgression) return;

    sliderRef.children[app.accountRewards - 1].scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
      inline: 'center'
    });
  });

  $effect(() => {
    $state.snapshot(app.showAccountProgression);
    if (!untrack(() => app.serverTimestampSnapshot)) return;

    const level = getLevelByExperience(app.experience);

    sliderRef.children[level - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });

  const claimReward = (level: number) => {
    if (level === getLevelByExperience(app.experience)) {
      setTimeout(() => {
        app.showAccountProgression = false;
      }, 500);
    }
    app.accountRewards += 1;
    app.coins += 100;
  };

  const rewardForLevel = (level: number) => {
    const rewards = ['100_coins'];

    if (level % 5 === 0 || level === 1) {
      rewards.push('ludus_upgrade');
    }
    return rewards;
  };
</script>

<crow
  role="none"
  onclick={closeSelf}
  bind:this={sliderRef}
  left
  class="my-ludus fixed inset-0 snap-x snap-mandatory gap-20 overflow-x-scroll px-[calc(50vw-theme(spacing.52))]"
>
  {#each LEVELS as level}
    {@const accountLevel = getLevelByExperience(app.experience)}
    {@const claimed = level <= app.accountRewards}
    {@const disabled = level > app.accountRewards + 1 || accountLevel < level}
    {@const rewards = rewardForLevel(level)}
    <crow
      class={tw('glass !w-104 !flex-none snap-center border border-dashed !bg-white/95 p-4')}
      vertical
    >
      <h4 class="cinzel">Level {level}</h4>
      <Hr class="my-2" />
      <div>
        <crow vertical class="gap-4">
          {#if rewards.includes('100_coins')}
            <Coin type="silver" class="text-2xl" />
          {/if}
          {#if rewards.includes('ludus_upgrade')}
            +1 Barracks
          {/if}

          {#if claimed}
            <crow class="!h-6 !flex-none">
              <Icon name="checkmark" class="text-green-400" />
            </crow>
          {:else}
            <Button {disabled} onclick={claimReward.bind(undefined, level)} primary>Claim</Button>
          {/if}
        </crow>
      </div>
      <!-- <div>down</div> -->
    </crow>
  {/each}
</crow>
