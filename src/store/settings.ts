import { STORES } from '$src/store';
import { browser } from '$app/environment';
import type { DynamicObject } from '$src/types/common';

const { settings } = STORES;

settings.subscribe((settings: DynamicObject) =>
  Object.entries(settings).forEach(
    ([key, value]) => browser && window.localStorage.setItem(key, JSON.stringify(value))
  )
);
