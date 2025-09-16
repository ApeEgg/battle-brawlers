<Headline text="crow playground" />

<crow vertical up class="gap-4 rounded border border-gray-400 bg-white/30 p-4">
  <crow class="w-full !justify-between rounded bg-gray-100 p-2" left>
    <div class="font-bold tracking-wide text-gray-600 uppercase">Layout summary</div>
    <span class="text-sm text-gray-500">Side-by-side flex helpers</span>
  </crow>

  <crow vertical left class="w-full gap-2">
    <crow up left class="gap-2 rounded bg-gray-200 p-2">
      <div class="font-bold tracking-wide text-gray-600 uppercase">Horizontal rows</div>
      <crow class="w-full !justify-between rounded border border-gray-300 bg-white px-2 py-1">
        <span>Left</span>
        <span>Right</span>
      </crow>
      <crow class="w-full !justify-between rounded border border-gray-300 bg-white px-2 py-1">
        <span>Aligned</span>
        <span>Centers</span>
      </crow>
    </crow>

    <crow up left class="gap-1 rounded bg-gray-100 p-2">
      <div class="font-bold tracking-wide text-gray-600 uppercase">Stacked columns</div>
      <crow class="w-full !justify-between">
        <span>Top</span>
        <span>Start</span>
      </crow>
      <crow class="w-full !justify-between">
        <span>Middle</span>
        <span>Center</span>
      </crow>
      <crow class="w-full !justify-between">
        <span>Bottom</span>
        <span>End</span>
      </crow>
    </crow>
  </crow>

  <Hr />

  <crow vertical left class="w-full gap-2">
    <crow class="w-full gap-2 rounded border border-gray-300 bg-white p-2">
      <crow vertical left class="w-32 gap-1 bg-gray-100 p-2">
        <span class="font-bold tracking-wide text-gray-600 uppercase">Card A</span>
        <span class="text-sm text-gray-500">portrait</span>
      </crow>
      <crow vertical left class="flex-1 gap-1">
        <crow class="w-full !justify-between rounded bg-yellow-600 px-2 py-1 text-white">
          <span>Power</span>
          <span>45</span>
        </crow>
        <crow class="bg-green w-full !justify-between rounded px-2 py-1 text-gray-800">
          <span>Morale</span>
          <span>High</span>
        </crow>
      </crow>
    </crow>

    <crow up left class="gap-2 rounded border border-gray-300 bg-gray-100 p-2">
      <crow class="w-full gap-2">
        <crow vertical up class="w-24 gap-1 rounded bg-white p-2">
          <span class="font-bold tracking-wide text-gray-600 uppercase">Column</span>
          <span class="text-sm text-gray-500">flex-1 demo</span>
        </crow>
        <crow vertical up class="flex-1 gap-1">
          <crow class="w-full !justify-between rounded border border-gray-300 bg-white px-2 py-1">
            <span>A</span>
            <span>1</span>
          </crow>
          <crow class="w-full !justify-between rounded border border-gray-300 bg-white px-2 py-1">
            <span>B</span>
            <span>2</span>
          </crow>
        </crow>
      </crow>
      <crow class="w-full !justify-between rounded border border-gray-300 bg-white px-2 py-1">
        <span>Footer</span>
        <span>Aligned</span>
      </crow>
    </crow>
  </crow>
</crow>
