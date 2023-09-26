import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    completedTodos: [],
    originalCompletedTodos: [],
    username: "",
  },
  mutations: {
    setCompletedTodos(state, todos) {
      state.completedTodos = todos;
    },
    setOriginalCompletedTodos(state, todos) {
      state.originalCompletedTodos = todos;
    },
    setUsername(state, username) {
      state.username = username;
    },
    resetState(state) {
      state.completedTodos = [];
      state.originalCompletedTodos = [];
      state.username = "";
    },
  },
});
