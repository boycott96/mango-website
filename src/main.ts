import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.config";
import SvgIcon from "./components/SvgIcon.vue";
import 'virtual:svg-icons-register'

import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";

const app = createApp(App);
app.use(router);
app.component('svg-icon', SvgIcon)

//建议app.mount放到最后面
app.mount("#app");
