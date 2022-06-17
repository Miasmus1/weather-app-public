import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      cities: ["Istanbul", "Munich", "Paris", "London", "Glasgow"],
    };
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
  },
  mutations: {},
  actions: {},
});
