<script lang="ts">
  import '../app.css';
  import '../crow.css';
  import '$src/store/settings';
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';
  import Authorization from '$src/components/Authorization.svelte';
  import Tooltip from '$src/components/ui/Tooltip.svelte';
  import app from '$src/app.svelte';
  import Button from '$src/components/form/Button.svelte';
  import { equip } from '$src/ts/equipment';
  import EquipmentLink from '$src/components/EquipmentLink.svelte';
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
  import entity from '$src/ts/entity';
  overrideItemIdKeyNameBeforeInitialisingDndZones('uuid');

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !app.token);
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'bg-blur fixed -z-10 min-h-screen w-screen bg-cover bg-center bg-no-repeat',
    isFrontpage
      ? 'bg-[url("/images/desktop-1920x1080.jpg")]'
      : 'bg-[url("/images/parchment-bg-2250x1500.jpg")] dark:bg-gray-800'
  )}
></div>
<div class={tw('bg-blur min-h-screen w-screen', isFrontpage ? 'row' : 'row-up')}>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))]',
      isFrontpage ? 'row' : 'row-up-left w-full max-w-7xl'
    )}
  >
    <Authorization>
      <Row class="min-h-screen flex-1 gap-2 pt-20" up>
        <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
          <h4>My characters</h4>
          <div class="my-4">
            <crow vertical up left>
              {#each app.characters as character, i}
                <Clickable
                  href="/my-characters/{i}"
                  class="crow left w-full gap-2 bg-gray-100/50"
                  left
                >
                  <div class="h-6 w-6 overflow-hidden bg-white">
                    <img src="/images/races/{character.race}/01.png" alt="" />
                  </div>
                  <div class="p-2">{character.name}</div>
                </Clickable>
              {/each}
            </crow>
          </div>
          <h4>My inventory</h4>
          <div class="my-4">
            <crow vertical up left>
              {#each app.inventory as item, i}
                {@const equipment = entity.equipment(item, true)}
                <crow class="w-full !justify-between gap-2 py-1" left>
                  <EquipmentLink {...equipment} />
                  <Button onclick={() => equip(item, i)}>Equip</Button>
                </crow>
              {/each}
            </crow>
          </div>
        </div>
        <div class="h-full flex-1 rounded border border-gray-400 bg-white p-4">
          <div>
            {@render children()}
          </div>
        </div>
        <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
          <crow up left vertical>
            <a href="/">Start</a>
            <a href="/creatures">Creatures</a>
            <a href="/equipment">Equipment</a>
            <a href="/debug">Debug</a>
          </crow>
          <!-- <code class="text-xs">
      <pre>
      {JSON.stringify(teams, null, 2)}
    </pre>
    </code> -->
        </div>
      </Row>
    </Authorization>
  </div>
</div>

<Topbar />
<Logo />
<Overlay />

{#if app.tooltip}
  <Tooltip {...app.tooltip} />
{/if}
<Notifications />
