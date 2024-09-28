import state from './state';
import getters from './getters';
import actions from './actions';

export const useAuthStore = defineStore('auth', {
  state,
  getters,
  actions,
});
