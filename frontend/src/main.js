import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "../node_modules/tailwindcss/tailwind.css";
const app = createApp(App);

const userModel = {
  avatar: "icon-128x128.png",
  role: "USER",
  tokens: 2134,
};

app.provide("$user", reactive(userModel)); // global variable

app.use(router).mount("#app");
