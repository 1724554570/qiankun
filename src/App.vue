<template>
  <div>
    <nav>
      <router-link :to="{name:'base'}">Home</router-link>|
      <router-link :to="{name:'about'}">About</router-link>|
      <router-link :to="{path:'/home/abouts'}">abouts</router-link>｜
      <router-link to="/home/SecIndex1">abouts</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "./router/index";
import useCurrentInstance from "./utils/useCurrentInstance";

const w: any = window;

interface ChildrenEntity {
  name: string;
  componentName?: string;
  children?: any;
}

const findAllrouter = (a: any, tabId?: string) => {
  const children = a.children;
  if (children) {
    for (var index = 0; index <= children.length - 1; index++) {
      const childrenItem: ChildrenEntity = children[index];
      if (childrenItem.children) {
        if (childrenItem.componentName == tabId) {
          return childrenItem.name;
        }
        const loadDeep = findAllrouter(childrenItem);
        if (loadDeep) {
          return childrenItem.name;
        }
      } else {
        if (childrenItem.componentName == tabId) {
          return childrenItem.name;
        }
      }
    }
  }
};

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const { proxy } = useCurrentInstance();
    const parentProps = proxy.parentProps;
    if (parentProps && parentProps.onGlobalStateChange) {
      parentProps.onGlobalStateChange((state: any) => {
        // 初始化传入的参数对象
        console.log("__POWERED_BY_QIANKUN__", state);
      });
    }
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
