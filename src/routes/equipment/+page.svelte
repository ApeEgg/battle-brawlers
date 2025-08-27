<script lang="ts">
  import Button from '$src/components/form/Button.svelte';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import type { Equipment } from '$src/types/equipment';
  import { slotsInPrettyName } from '$src/ts/equipment';
  import EquipmentLink from '$src/components/EquipmentLink.svelte';

  let items = [
    EQUIPMENT.sword(),
    EQUIPMENT.shield(),
    EQUIPMENT.ring(),
    EQUIPMENT.twoHandedSword(),
    EQUIPMENT.leatherArmor(),
    EQUIPMENT.giantsHeart()
  ];

  const craftEquipment = (item: Equipment) => {
    app.equipment.push({
      id: item.id,
      slotsIn: item.slotsIn
    });
  };
</script>

<h1>Equipment</h1>

<crow vertical up left>
  <crow up left class="gap-4 p-2">
    <div class="flex-1 font-bold">Name</div>
    <div class="flex-1 font-bold">Slots in</div>
    <div class="flex-1 font-bold">Level</div>
    <div class="w-20 font-bold"></div>
  </crow>
  {#each items as item, i}
    <crow left class="w-full gap-4 p-2 {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
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
      <div class="w-20">
        <Button onclick={craftEquipment.bind(undefined, item)}>Craft</Button>
      </div>
    </crow>
  {/each}
</crow>
