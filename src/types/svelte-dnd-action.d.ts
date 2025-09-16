import type { ActionReturn } from 'svelte/action';

declare module 'svelte-dnd-action' {
  interface DndZoneAttributes<T = any> {
    'on:consider'?: (event: CustomEvent<{ items: T[] }>) => void;
    'on:finalize'?: (event: CustomEvent<{ items: T[] }>) => void;
  }

  interface Options<T = any> {
    items: T[];
    type?: string;
    flipDurationMs?: number;
    dropTargetStyle?: Record<string, string>;
    dropTargetClasses?: string[];
    dragDisabled?: boolean;
    dropFromOthersDisabled?: boolean;
    transformDraggedElement?: (node: HTMLElement, data: T, index: number) => void;
    constrainAxisY?: boolean;
    [key: string]: unknown;
  }

  export function dndzone<T = any>(
    node: HTMLElement,
    options: Options<T>
  ): ActionReturn<Options<T>, DndZoneAttributes<T>>;

  export function overrideItemIdKeyNameBeforeInitialisingDndZones(newKeyName: string): void;
}
