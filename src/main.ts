import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router/index";
import ElementPlus from "element-plus";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import "@/assets/styles/index.scss";
import "virtual:svg-icons-register";
import SvgIcon from "@/components/svgIcon/index.vue";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
// 配置路由
setupRouter(app);

app.mount("#app");
(function (doc, win) {
  const fn = () => {
    const docEl = doc.documentElement,
      clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 1920) + "px";
  };
  if (!doc.addEventListener) return;
  win.addEventListener("resize", fn);
  doc.addEventListener("DOMContentLoaded", fn);
})(document, window);
