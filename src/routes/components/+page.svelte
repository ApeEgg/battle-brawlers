<script lang="ts">
  const { notify, unlockKeys, lockKeys } = ACTIONS;
  const { keys } = STORES;

  $: ({ escape } = $keys);
</script>

<crow class="gap-10" left up>
  <div>
    <h2>Input</h2>
    <!--on:keyup={(e) => console.info(e?.target?.value)}-->
    <Input placeholder="Type something" on:blur={unlockKeys} on:focus={lockKeys} blur={escape} />
  </div>
  <div>
    <h2>Checkbox</h2>
    <Checkbox id="check-me">Check me</Checkbox>
  </div>
  <div>
    <h2>Dropdown</h2>
    <!--on:change={({ target: { value } }) => console.info(value)}-->
    <Dropdown options={['option 1', 'option 2']} />
  </div>
  <div>
    <h2>Button</h2>
    <crow class="gap-2">
      <Button primary onclick={console.info}>Primary</Button>
      <Button secondary onclick={console.info}>Secondary</Button>
      <Button tertiary onclick={console.info}>Tertiary</Button>
    </crow>
  </div>
  <div>
    <h2>Toasts</h2>
    <crow class="gap-2">
      <Button
        tertiary
        onclick={notify.bind(undefined, { error: 'this is a error toast' })}
        class="text-red-500"
      >
        Error
      </Button>
      <Button
        tertiary
        onclick={notify.bind(undefined, {
          warning: 'this is a warning toast'
        })}
        class="text-orange-500"
      >
        Warning
      </Button>
      <Button
        tertiary
        onclick={notify.bind(undefined, { information: 'this is a information toast' })}
        class="text-blue-500"
      >
        Information
      </Button>
      <Button
        tertiary
        onclick={notify.bind(undefined, { success: 'this is a success toast' })}
        class="text-green-500"
      >
        Success
      </Button>
    </crow>
  </div>
</crow>
