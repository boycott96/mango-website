import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.config";

const app = createApp(App);
app.use(router);

//建议app.mount放到最后面
app.mount("#app");
