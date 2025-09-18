export const ALL_ELEMENTS = {
  nature: {
    name: 'Nature',
    color: {
      primary: '#8bb737',
      secondary: '#a0ce3e'
    }
  },
  earth: {
    name: 'Earth',
    color: {
      primary: '#7f5322',
      secondary: '#c68533'
    }
  },
  lightning: {
    name: 'Lightning',
    color: {
      primary: '#eac303',
      secondary: '#fced60'
    }
  },
  frost: {
    name: 'Frost',
    color: {
      primary: '#88c6cb',
      secondary: '#eaffff'
    }
  },
  fire: {
    name: 'Fire',
    color: {
      primary: '#f45f31',
      secondary: '#f4a031'
    }
  }
} as Record<string, any>;

// export default (id: string | CharacterRef, fullBody: boolean = false, meta?: DynamicObject) =>
//   entity(
//     ALL_ELEMENTS,
//     typeof id === 'string' ? id : id.id,
//     typeof id === 'string' ? undefined : id.uuid,
//     fullBody,
//     typeof id === 'string'
//       ? meta?.overrides
//       : meta?.overrides
//         ? deepMerge(id.overrides || {}, meta.overrides || {})
//         : id.overrides
//   ) as Character;
