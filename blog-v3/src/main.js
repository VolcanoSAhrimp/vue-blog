// 导入App组件
import App from "./App.vue";
// 导入Vue的createApp函数用于创建Vue应用
import { createApp } from "vue";
// 导入路由模块
import router from "./router";
// 引入pinia
import { createPinia } from "pinia";
// 导入icon字体样式
import "./assets/css/iconFont/iconfont.css";
// 引入Element Plus的样式
import "element-plus/dist/index.css";
// 引入Element Plus的暗黑模式样式变量
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入pinia的持久化插件
import piniaPluginPersist from "pinia-plugin-persist";
// 引入animate.css动画库
import "animate.css";
// 引入tailwind.css样式
import "./styles/tailwind.css";
// 引入svg图标
import "virtual:svg-icons-register";
// 引入复制指令
import vCopy from "./directives/copy";
// 引入图片懒加载指令
import image from "./directives/imageLoading";

// 创建Vue应用实例
const app = createApp(App);
// 注册复制指令
app.directive("copy", vCopy);
// 注册图片懒加载指令
app.directive("image", image);
// 使用路由和pinia，并挂载到#app元素上
app.use(router).use(createPinia().use(piniaPluginPersist)).mount("#app");