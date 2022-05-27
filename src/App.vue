<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
    <div>
      <button @click="loadApp">手动加载微应用 vue</button>
      <button @click="unloadApp">手动卸载微应用 vue</button>
    </div>

    <!-- 存放微应用的容器 -->
    <div id="hand-micro-app"></div>

    <!-- 内容容器 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadMicroApp, initGlobalState } from "qiankun";
import router from "./router/index";

// 初始化 state
const actions = initGlobalState({});

const microApps = {
  name: "qiankun-vue2",
  entry: "//localhost:8081",
  container: "#hand-micro-app",
  activeRule: "/micro/micro-content",
  prefixPath: "/micro/micro-content",
};

const configuration = {
  sandbox: { experimentalStyleIsolation: true },
};

const w: any = window;

export default defineComponent({
  name: "HomeView",
  components: {
    // HelloWorld,
  },
  setup() {
    // 微应用实例
    let microApp: any = null; // 微应用实例

    /**
     * 加载app
     */
    const loadApp = () => {
      const url = "/micro/#/home/abouts";
      router.push(url);
      setTimeout(() => {
        w.qiankunMicroName = "dk";
        microApp = loadMicroApp(microApps, configuration);
        setTimeout(() => {
          actions.setGlobalState({
            microApps,
            configuration,
            nowRouteInfo: {
              url,
            },
          });
        }, 600);
      }, 600);
    };

    /**
     * 卸载app
     */
    const unloadApp = () => {
      if (microApp) {
        microApp.unmount(); // 卸载微应用
      }
    };

    return {
      loadApp,
      unloadApp,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
