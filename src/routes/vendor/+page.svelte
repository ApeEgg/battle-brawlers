<script lang="ts">
  import Button from '$src/components/form/Button.svelte';
  import EQUIPMENT, { ALL_EQUIPMENT } from '$src/constants/EQUIPMENT';
  import type { EquipmentRef } from '$src/types/equipment';
  import { slotsInPrettyName } from '$src/ts/equipment';
  import EquipmentLink from '$src/components/EquipmentLink.svelte';

  let items = Object.keys(ALL_EQUIPMENT).map((key) => EQUIPMENT(key, true));

  const craftEquipment = (item: EquipmentRef) => app.inventory.push(item);
</script>

<Headline text="vendor" />

<crow vertical up left class="-mx-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Slots in</div>
    <div class="flex-1 font-bold">Level</div>
    <div class="w-20 font-bold"></div>
  </crow>
  {#each items as item, i}
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
      <div class="w-20 text-right">
        <Button onclick={craftEquipment.bind(undefined, EQUIPMENT(item))}>Craft</Button>
      </div>
    </crow>
  {/each}
</crow>
