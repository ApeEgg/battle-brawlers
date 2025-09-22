<script lang="ts">
  import EQUIPMENT, { ALL_EQUIPMENT } from '$src/constants/EQUIPMENT';
  import type { Equipment } from '$src/types/equipment';
  import { slotsInPrettyName } from '$src/ts/equipment';
  import { confirmWithDialog } from '$src/ts/dialog';
  import type { Component } from 'svelte';
  import { formatCoins } from '$src/ts/coin';
  import BasicConfirmation from '$src/components/dialog/BasicConfirmation.svelte';

  let allEquipment = $state(Object.keys(ALL_EQUIPMENT).map((key) => EQUIPMENT(key, true)));
  let filteredEquipment = $state(allEquipment);

  const craftEquipment = (itemId: Equipment['id']) => {
    const item = EQUIPMENT(itemId);
    const { cost } = EQUIPMENT(item, true);
    const { silver } = formatCoins(cost);

    confirmWithDialog(BasicConfirmation as Component, {
      text: `Are you sure you want to acquire this equipment for <span class="text-white">${silver} coins</span>?`,
      confirm: () => {
        app.coins -= cost;
        app.inventory.push(item);
      }
    });
  };
</script>

<Headline text="vendor" />

<EquipmentFilter {allEquipment} bind:filteredEquipment />

<crow vertical up left class="-mx-4 mt-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Slots in</div>
    <div class="flex-1 font-bold">Level</div>
    <div class="flex-1 font-bold">Cost</div>
    <div class="w-20 font-bold"></div>
  </crow>
  {#each filteredEquipment as item, i (item.uuid)}
    <crow left class="w-full gap-4 px-6 py-2 {i % 2 === 0 ? 'bg-[#faf7f2]' : 'bg-white'}">
      <crow left class="flex-1 gap-2">
        <!-- <div class="w-6">
          <div class="overflow-hidden rounded-full">
            <img src="/images/equipment/{item.equipmentName}/01.png" alt="" />
          </div>
        </div> -->

        <EquipmentLink {...item} />
      </crow>
      <div class="flex-1">{slotsInPrettyName(item.slotsIn)}</div>
      <div class="flex-1">1</div>
      <div class="flex-1">
        <Coins renderAll amount={item.cost} class="right" />
      </div>
      <crow class="w-20 !flex-none" right>
        <Button
          disabled={app.coins < item.cost}
          tertiary
          onclick={craftEquipment.bind(undefined, item.id)}
        >
          Acquire
        </Button>
      </crow>
    </crow>
  {/each}
</crow>
