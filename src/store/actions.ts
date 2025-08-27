type Action = {
  [key: string]: (args?: any, ...rest: any[]) => any;
};

export default {
  setOverlay: ([to], { keyLock, overlay }) => ({ overlay: keyLock ? overlay : to }),
  lockKeys: () => ({ keyLock: true }),
  unlockKeys: () => ({ keyLock: false }),
  notify: ([payload]: any, { notifications }) => {
    const { error, warning, success, information } = payload;

    if (error) notifications.add(JSON.stringify({ type: 'error', message: error }));
    if (warning) notifications.add(JSON.stringify({ type: 'warning', message: warning }));
    if (success) notifications.add(JSON.stringify({ type: 'success', message: success }));
    if (information)
      notifications.add(JSON.stringify({ type: 'information', message: information }));

    return {
      notifications
    };
  },
  removeFirstNotification: (_, { notifications: [_first, ...notifications] }) => ({
    notifications: new Set(notifications)
  })
} as Action;
