import { deepMerge } from '$src/helpers';
import type { DynamicObject } from '$src/types/common';

export default (
  entities: any,
  id: string,
  uuid?: string,
  fullBody: boolean = false,
  overrides: DynamicObject = {}
) => {
  return {
    ...deepMerge(
      {
        uuid: uuid || crypto.randomUUID(),
        id,
        ...(fullBody ? entities[id] : fullBody)
      },
      overrides
    ),
    overrides
  };
};
