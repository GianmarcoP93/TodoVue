import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CompletedView from "../views/CompletedView.vue";
import AlboView from "../views/AlboView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/albo",
    name: "albo",
    component: AlboView,
  },

  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/completed",
    name: "completed",
    component: CompletedView,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
