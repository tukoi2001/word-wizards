import type { AuthStoreOptions, State } from './types';

const getters: AuthStoreOptions['getters'] = {
  currentUserEmail(state: State): string {
    return get(state, 'currentUser.email')!;
  },
};

export default getters;
