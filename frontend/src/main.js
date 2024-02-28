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

const serverURL = `http://localhost:3000`;

const endpoints = {
  captcha: `${serverURL}/captcha`,
};

app.provide("$user", reactive(userModel));
app.provide("$endpoints", endpoints);

app.use(router).mount("#app");
