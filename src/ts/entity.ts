export default (entities: any, id: string, uuid?: string, fullBody: boolean = false) => ({
  uuid: uuid || crypto.randomUUID(),
  id,
  ...(fullBody ? entities[id] : fullBody)
});
