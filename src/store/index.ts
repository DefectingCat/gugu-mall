import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
// types
import { State } from '@/types/store';

export default createStore<State>({
  state: {
    cartList: [],
  },
  mutations,
  actions,
  getters,
  // modules: {},
});
