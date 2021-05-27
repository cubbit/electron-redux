import { remote } from 'electron';

export default function getInitialStateRenderer(ipc_event_name) {
  return function() {
    const getReduxState = remote.getGlobal('getReduxState');
    if (!getReduxState || !getReduxState[ipc_event_name]) {
      throw new Error(
        'Could not find reduxState global in main process, did you forget to call replayActionMain?',
      );
    }
    return JSON.parse(getReduxState[ipc_event_name]());
  }
}
