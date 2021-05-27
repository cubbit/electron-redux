import { ipcRenderer } from 'electron';

export default function replayActionRenderer(ipc_event_name) {
  return function (store) {
    ipcRenderer.on(ipc_event_name, (event, payload) => {
      store.dispatch(payload);
    });
  };
}
