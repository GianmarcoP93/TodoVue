import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  router,
  store,
  vuetify,

  render: (h) => {
    return h(App);
  }
}).$mount("#app");
