import { writable } from 'svelte/store';

export const appStore = writable({ user: null });

// setUserUpdateCallback(user => {
//   if (user) {
//     userStore.set({ id: user.uid, name: user.displayName, email: user.email });
//   }
// });
