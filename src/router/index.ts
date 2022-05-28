import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import HomeContainer from '../views/HomeContainer.vue'
import HomeAboutView from '../views/HomeAboutView.vue'
import SecIndex1 from '../views/Sec/index1.vue'
import SecIndex2 from '../views/Sec/index2.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'base',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/personalWork",
    name: "personalWork",
    component: HomeContainer,
    children: [
      {
        path: 'abouts',
        name: 'abouts',
        component: HomeAboutView
      },
      {
        path: 'SecIndex1',
        name: 'SecIndex1',
        component: SecIndex1
      },
      {
        path: 'SecIndex2',
        name: 'SecIndex2',
        component: SecIndex2
      },
    ]
  }
]

//配置独立运行 或 主应用运行 process.env.BASE_URL
const baseUri = "";

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(baseUri),
  history: createWebHashHistory(baseUri),
  routes
})

// qiankun
import { findAllrouter, getParentPath } from "./qiankun-func";
import { MicroEntity } from "./qiankun-type"

const w: any = window;

// 系统名称必须对应统一门户的路由 personalWork
const config: MicroEntity = {
  microName: "personalWork"
}

const appName = "子应用 app1";

// 这里主要是适配子应用的单独访问和继承访问
// if (isQiankun) {
router.beforeEach((to: any, from: any, next: any) => {
  const qiankunMicroName = w.qiankunMicroName
  console.log(`----- ${appName} beforeEach()`, `【${from.path}】 => 【${to.path}】=> 【${to.fullPath}】=> ${qiankunMicroName}`);
  const tf = to.fullPath;
  // 设置允许子应用切换路由的条件，
  // 1、必须当前即将打开的页面是当前子系统
  // 2、当前存在该路由的，不然就报错
  if (qiankunMicroName == config.microName) {
    // 只取name=home的数据
    const tmpArray = Array.from(router.options.routes).filter((item) => {
      return item.name == qiankunMicroName;
    });
    // console.log("_tmpArray_", tmpArray);
    const tmp = findAllrouter(tmpArray[0], tf);
    console.log("_tmp_", tmp);
    // const qiankunParentPath = getParentPath(tf);
    // console.log("_qiankunParentPath_", qiankunParentPath)
    if (tmp) {
      return next();
      // if (qiankunParentPath.fullPath) {
      //   // next({ path: prefix + qiankunParentPath.fullPath })
      //   next(qiankunParentPath.fullPath);
      // } else {
      //   next();
      // }
    } else {
      // next();
    }
  } else if (!w.qiankunMicroName) {
    // console.log("!w.qiankunMicroName", !w.qiankunMicroName)
    next();
  }
});
// }

// router.afterEach((to: any, from: any) => {
//   console.log(`----- ${appName} afterEach()`, `【${from.path}】 => 【${to.path}】`);
// });

export default router
