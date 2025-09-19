<script lang="ts">
  import '../app.css';
  import '../crow.css';
  import '$src/store/settings';
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';
  import app from '$src/app.svelte';
  import { equip } from '$src/ts/equipment';
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import ABILITIES from '$src/constants/ABILITIES';
  import { calculateCombatStatsByCharacter, calculateTickStart } from '$src/ts/Utils';
  import {
    allowedNumberOfCharacters,
    getCurrentExperienceAtLevel,
    getExperienceForNextLevel,
    getLevelByExperience
  } from '$src/ts/level';
  import Button from '$src/components/form/Button.svelte';
  import { goto } from '$app/navigation';
  overrideItemIdKeyNameBeforeInitialisingDndZones('uuid');

  let { children } = $props<{ children: Snippet }>();
  let isFrontpage = $derived($page.route.id === '/' && !app.token);
  let isAuthenticated = $derived(!!app.token);
  let activePage = $derived($page.route.id?.split('/')[1] || (!app.token ? 'start' : ''));
  let isDebugPage = $derived($page.route.id === '/debug');
  let characterIndex = $derived($page.params.characterIndex);
  let creatureId = $derived($page.params.creatureId);

  const { setOverlay } = ACTIONS;
  const { IS_PROD } = ENV;

  let showSequence = $state(false);

  const selectBrawler = (e: Event, id: string) => {
    if (creatureId !== undefined && !app.selectedBrawlers.includes(id)) {
      e.preventDefault();
      app.selectedBrawlers = [id];
    }
  };
</script>

<ClientClock />
<ConnectSocket />
<Keystrokes />
<InCombat />

{#if !IS_PROD}
  <DevBar />
{/if}

<div
  data-page-id={activePage}
  class={tw('bg-blur min-h-screen w-screen', isFrontpage ? 'crow' : 'crow up')}
>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))]',
      !isAuthenticated ? 'crow !flex-none' : 'flex w-full max-w-7xl'
    )}
  >
    <Authorization>
      <div class="flex min-h-screen flex-1 gap-3 pt-20">
        <div class="w-56 rounded border border-transparent bg-white/30 p-4">
          <Headline text="MY LUDUS" small>
            <crow right class="cinzel">
              level {getLevelByExperience(app.experience)}
            </crow>
          </Headline>

          <crow vertical left class="w-full gap-2">
            <crow vertical left class="w-full">
              <span class="text-sm text-gray-800">Experience</span>

              <Bar
                class="bg-yellow-600"
                current={getCurrentExperienceAtLevel(app.experience)}
                max={getExperienceForNextLevel(getLevelByExperience(app.experience))}
                center
              />
            </crow>

            <crow vertical left class="w-full">
              <span class="text-sm text-gray-800">Medical area</span>
              <RefillHealthTimer />
            </crow>
          </crow>

          <div class="h-8"></div>

          <Headline text="MY BRAWLERS" small>
            <crow right class="cinzel">
              {app.characters.length} / {allowedNumberOfCharacters()}
            </crow>
          </Headline>

          <div
            class="-mx-4 my-2"
            onmouseenter={() => (showSequence = true)}
            onmouseleave={() => (showSequence = false)}
            role="none"
          >
            <crow vertical up left>
              {#if app.characters.length === 0}
                <crow vertical class="w-full gap-2 text-sm text-stone-500">
                  You have no brawlers yet.
                  <Button onclick={() => goto('/brawlers')} tertiary>Recruit brawler</Button>
                </crow>
              {:else}
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
                      <div class="h-16 w-16 p-1">
                        <div class="glass overflow-hidden rounded-sm border border-gray-600">
                          <img src="/images/races/{character.race}/01-faceshot.png" alt="" />
                        </div>
                      </div>
                      <crow vertical left class="overflow-x-hidden px-1 py-1">
                        <!-- <div class="text-md text-gray-600">{character.name}</div> -->

                        <div class="w-full">
                          <Bar
                            max={calculateCombatStatsByCharacter(character).maxHealth}
                            current={character.combatStats.currentHealth}
                            text={character.name}
                            percentage={!showSequence &&
                              creatureId === undefined &&
                              characterIndex === undefined}
                          />
                        </div>

                        <Accordion
                          isOpen={showSequence ||
                            creatureId !== undefined ||
                            characterIndex !== undefined}
                        >
                          <div class="pr-px">
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
              {/if}
            </crow>
          </div>
        </div>
        <crow vertical class="h-full flex-1">
          <div class="grid h-full w-full">
            <crow
              up
              left
              class={tw(
                'h-auto rounded border border-transparent bg-white p-4 [grid-area:1/1]',
                isDebugPage && 'bg-transparent'
              )}
            >
              <div class={tw('relative min-h-full w-full')}>
                {@render children()}
              </div>
            </crow>

            <crow up class="-mt-7 !h-7 !flex-none !justify-between px-1 [grid-area:1/1]">
              <div>
                {#if app.elapsedMilliseconds < app.combat.duration}
                  <Clickable onclick={() => setOverlay('Combat')} class="crow gap-2">
                    <Spinner class="text-sm text-gray-700" />
                    <div>Fightning..</div>
                  </Clickable>
                {:else if app.combat.duration !== 0}
                  <Clickable onclick={() => setOverlay('Combat')} class="crow gap-2">
                    <div>View outcome</div>
                  </Clickable>
                {/if}
              </div>
              <!-- <Clickable class="crow left gap-1" onclick={() => goto('/the-arena')}>
                ‹ Go back
              </Clickable> -->
              <crow up right class="gap-1">
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === '' && 'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/"
                >
                  Start
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'the-arena' &&
                      'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/the-arena"
                >
                  The Arena
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'vendor' && 'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/vendor"
                >
                  Vendor
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'brawlers' &&
                      'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/brawlers"
                >
                  Brawlers
                </a>
                {#if !IS_PROD}
                  <a
                    class={tw(
                      'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                      activePage === 'debug' &&
                        'rounded-t-sm border-transparent bg-white text-black'
                    )}
                    href="/debug"
                  >
                    Debug
                  </a>
                  <a
                    class={tw(
                      'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                      activePage === 'scaling' &&
                        'rounded-t-sm border-transparent bg-white text-black'
                    )}
                    href="/scaling"
                  >
                    Scaling
                  </a>
                {/if}
              </crow>
            </crow>
          </div>
        </crow>

        <div
          class={tw(
            'pointer-events-none w-56 translate-x-4 rounded border border-transparent bg-white/30 p-4 opacity-0 transition-all duration-200',
            characterIndex !== undefined && 'pointer-events-auto translate-x-0 opacity-100'
          )}
        >
          <Headline text="ARMORY" small />

          {#if app.characters.length}
            <div class="my-3">
              <crow vertical up left>
                {#each app.inventory as item, i (item.uuid)}
                  {@const equipment = EQUIPMENT(item, true)}
                  <crow class="w-full !justify-between gap-2 py-1" left>
                    <EquipmentLink {...equipment} />
                    <Button tertiary onclick={() => equip(item, i)}>Equip</Button>
                  </crow>
                {/each}
              </crow>
            </div>
          {/if}
        </div>
      </div>
    </Authorization>
  </div>
</div>

<Topbar />
<!-- <Logo /> -->
<Overlay />

<Dialog {...app.dialog} />

{#if app.tooltip}
  <Tooltip {...app.tooltip} />
{/if}
<Notifications />

<style>
  :global {
    :root body {
      background-image: url('/images/parchment-bg-2250x1500.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    :root:has([data-page-id='start']) body {
      background-image: url('/images/parchment-bg-2250x1500.jpg');
    }
    :root:has([data-page-id='debug']) body {
      background-image: url('/images/arena-cut.png');
    }
  }
</style>
