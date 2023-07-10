import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";
// createApp(App).mount("#app");
createApp(App).use(router).mount("#app");
