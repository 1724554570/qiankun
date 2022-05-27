import "./public-path.ts";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const w: any = window;
let instance: any = null;
function render(props?: any) {
  const { container } = props;
  instance = createApp(App)
  instance.config.globalProperties.parentProps = props;
  instance.use(store);
  instance.use(router)
  instance.mount(container ? container.querySelector("#app") : "#app")
}

// 为保证子应用也可以独立运行，需做以下判断
if (!w.__POWERED_BY_QIANKUN__) {
  console.log("w.__POWERED_BY_QIANKUN__", w.__POWERED_BY_QIANKUN__)
  render({})
}

// 必须导出生命周期
export async function bootstrap(props: any) {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props: any) {
  console.log("mount");
  const getStyle = w.getComputedStyle;
  w.getComputedStyle = (element: any, property: any) => {
    if (!element || element.nodeType === 9) return {};
    return getStyle(element, property);
  };
  // (Vue as any).prototype.parentProps = props;
  render(props);//一般需等mount后再渲染挂载
}
export async function unmount(props: any) {
  console.log("unmount");
  if(instance) instance.unmount();
  if(instance) instance._container.innerHTML = '';
  instance = null;
}
