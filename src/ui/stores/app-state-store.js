import { writable } from 'svelte/store';
export const APP_STATES = {
  SYNCED: 'SYNCED',
  SAVING: 'SAVING',
  UNSAVED_CHANGES: 'UNSAVED_CHANGES',
  UNLOADED: 'UNLOADED',
  ERROR: 'ERROR',
  OFFLINE: 'OFFLINE'
};

const appStateStore = writable(APP_STATES.UNLOADED);

export default appStateStore;
