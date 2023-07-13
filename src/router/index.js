import { createWebHashHistory, createRouter } from "vue-router";

// import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import PresencePage from "@/pages/PresencePage.vue";
import SlipPage from "@/pages/SlipPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    // path: "/",
    path: "/homepage",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/presencepage",
    name: "PresencePage",
    component: PresencePage,
  },
  {
    path: "/slippage",
    name: "SlipPage",
    component: SlipPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
