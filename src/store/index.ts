import { createStore } from 'vuex';

export default createStore({
  state: {
    scrollY: 0,
  },
  mutations: {
    recoredY(state, Y) {
      state.scrollY = Y;
    },
  },
  actions: {},
  modules: {},
});
