import { ipcMain } from 'electron';

export default function replayActionMain(ipc_event_name) {
  return function (store) {
    /**
     * Give renderers a way to sync the current state of the store, but be sure
     * we don't expose any remote objects. In other words, we need our state to
     * be serializable.
     *
     * Refer to https://github.com/electron/electron/blob/master/docs/api/remote.md#remote-objects
     */
    if(!global.getReduxState)
      global.getReduxState = {};

    global.getReduxState[ipc_event_name] = () => JSON.stringify(store.getState());

    ipcMain.on(ipc_event_name, (event, payload) => {
      store.dispatch(payload);
    });
  };
}
