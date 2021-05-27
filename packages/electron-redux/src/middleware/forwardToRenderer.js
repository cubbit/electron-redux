import { webContents } from 'electron';
import validateAction from '../helpers/validateAction';

const forwardToRenderer = ipc_event_name => () => next => (action) => {
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  // change scope to avoid endless-loop
  const rendererAction = {
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  };

  const allWebContents = webContents.getAllWebContents();

  allWebContents.forEach((contents) => {
    contents.send(ipc_event_name, rendererAction);
  });

  return next(action);
};

export default forwardToRenderer;
