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
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import CombatantAbilityBar from '$src/components/combat/CombatantAbilityBar.svelte';
  import ABILITIES from '$src/constants/ABILITIES';
  import { calculateTickStart } from '$src/ts/Utils';
  import Accordion from '$src/components/Accordion.svelte';
  overrideItemIdKeyNameBeforeInitialisingDndZones('uuid');

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !app.token);
  let activePage = $derived($page.route.id?.split('/')[1] || 'start');
  let isDebugPage = $derived($page.route.id === '/debug');
  let characterIndex = $derived($page.params.characterIndex);
  let creatureId = $derived($page.params.creatureId);

  let showSequence = $state(false);

  const selectBrawler = (e: Event, id: string) => {
    if (creatureId !== undefined && !app.selectedBrawlers.includes(id)) {
      e.preventDefault();
      app.selectedBrawlers = [id];
    }
  };
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'bg-blur fixed -z-10 min-h-screen w-screen bg-cover bg-center bg-no-repeat',
    !isFrontpage &&
      !isDebugPage &&
      'bg-[url("/images/parchment-bg-2250x1500.jpg")] dark:bg-gray-800',
    isFrontpage && 'bg-[url("/images/desktop-1920x1080.jpg")]',
    isDebugPage &&
      "bg-[url('/images/arena-bg-daylight-full-zoom.jpg')] bg-cover bg-center bg-no-repeat shadow-[inset_0_0px_10vw_rgba(0,0,0,1)]"
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
          <h5>MY BRAWLERS</h5>
          <Hr left />
          <div
            class="-mx-4 my-3"
            onmouseenter={() => (showSequence = true)}
            onmouseleave={() => (showSequence = false)}
            role="none"
          >
            <crow vertical up left>
              {#each app.characters as char, i (char.uuid)}
                {@const character = CHARACTERS(char, true)}
                {@const abilitiesHydrated = character.abilities.map((ability) =>
                  ABILITIES(ability, true)
                )}
                {@const isActive =
                  parseInt(characterIndex, 10) === i ||
                  (creatureId !== undefined && app.selectedBrawlers.includes(char.uuid))}
                <Clickable
                  href="/brawlers/{i}"
                  class={tw('crow vertical w-full')}
                  left
                  onclick={(e: Event) => selectBrawler(e, char.uuid)}
                >
                  <crow
                    left
                    class={tw(
                      isActive &&
                        'glass -mx-1.5 -my-1 w-auto !rounded-sm !border-none px-1.5 py-1 transition-all duration-75'
                    )}
                  >
                    <div class="h-16 w-16 overflow-hidden p-1">
                      <img src="/images/races/{character.race}/01-faceshot.png" alt="" />
                    </div>
                    <crow vertical left class="overflow-x-hidden px-1 py-1">
                      <div class="text-md text-gray-600">{character.name}</div>
                      <Accordion
                        isOpen={showSequence ||
                          creatureId !== undefined ||
                          characterIndex !== undefined}
                      >
                        <div class="p-px">
                          <CombatantAbilityBar
                            preview
                            abilitiesCopied={abilitiesHydrated.filter(
                              (_, i) =>
                                calculateTickStart(abilitiesHydrated, i) < character.maxTicks
                            )}
                          />
                        </div>
                      </Accordion>
                    </crow>
                  </crow>
                </Clickable>
              {/each}
            </crow>
          </div>
        </div>
        <crow vertical class="h-full flex-1">
          <div class="grid h-full w-full">
            <crow
              up
              left
              class={tw(
                'h-auto rounded border border-gray-400 bg-white p-4 [grid-area:1/1]',
                isDebugPage && 'bg-transparent'
              )}
            >
              <div class={tw('relative min-h-full w-full')}>
                {@render children()}
              </div>
            </crow>

            <crow up right class="-mt-7 !h-7 !flex-none !justify-between px-1 [grid-area:1/1]">
              <!-- <Clickable class="crow left gap-1" onclick={() => goto('/creatures')}>
                ‹ Go back
              </Clickable> -->
              <crow up right class="gap-1">
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'start' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/"
                >
                  Start
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'creatures' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/creatures"
                >
                  Creatures
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'crafting' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/crafting"
                >
                  Crafting
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'brawlers' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/brawlers"
                >
                  Brawlers
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'debug' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/debug"
                >
                  Debug
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'scaling' && 'rounded-t-sm border-gray-400 bg-white text-black'
                  )}
                  href="/scaling"
                >
                  Scaling
                </a>
              </crow>
            </crow>
          </div>
        </crow>
        <div class="w-56 rounded border border-gray-400 bg-white/30 p-4">
          <h5>INVENTORY</h5>
          <Hr left />
          <div class="my-3">
            <crow vertical up left>
              {#each app.inventory as item, i (item.uuid)}
                {@const equipment = EQUIPMENT(item, true)}
                <crow class="w-full !justify-between gap-2 py-1" left>
                  <EquipmentLink {...equipment} />
                  <Button tertiary onclick={() => equip(item, i)}>Equip</Button>
                </crow>
                <!-- <Debug data={equipment} /> -->
              {/each}
            </crow>
          </div>
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
