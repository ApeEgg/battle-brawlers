import EQUIPMENT from '$src/constants/EQUIPMENT';
import type { EquipmentRef } from '$src/types/equipment';

const GET = (entities: any, id: string, uuid?: string, fullBody: boolean = false) => ({
  uuid: uuid || crypto.randomUUID(),
  id,
  ...(fullBody ? entities[id] : fullBody)
});

export default {
  equipment: (id: string | EquipmentRef, fullBody: boolean = false) =>
    GET(
      EQUIPMENT,
      typeof id === 'string' ? id : id.id,
      typeof id === 'string' ? undefined : id.uuid,
      fullBody
    )
};
