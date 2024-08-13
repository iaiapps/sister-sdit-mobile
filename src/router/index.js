import { createWebHashHistory, createRouter } from "vue-router";

import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import PresencePage from "@/pages/PresencePage.vue";
// import SlipPage from "@/pages/SlipPage.vue";
import AppPage from "@/pages/AppPage.vue";
import InfoPage from "@/pages/InfoPage.vue";

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
    // {
    //   path: "/slippage",
    //   name: "SlipPage",
    //   component: SlipPage,
    // },
    {
        path: "/apppage",
        name: "AppPage",
        component: AppPage,
    },
    {
        path: "/infopage",
        name: "InfoPage",
        component: InfoPage,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
