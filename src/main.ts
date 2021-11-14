import './public-path';
import './services/common/socket'; // socket连接
import './hooks/common/use-add-map'; // 动态添加地图，不需要可删掉
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './app.vue';
import routes from './router';
import store from './store';

import 'normalize.css'; // CSS reset的替代方案
import './assets/styles/style.scss';

// eslint-disable-next-line
var router: any = null; // 路由
let instance: any = null; // vue实例

function render(props: {[keys: string]: any} = {}) {
  const container: any = props?.container;
  // 创建路由
  router = createRouter({
    // eslint-disable-next-line
    history: createWebHistory((window as any).__POWERED_BY_QIANKUN__ ? `${props.baseUrl}/` : '/'),
    routes,
  });
  // 挂载实例
  instance = createApp(App as any);
  instance.use(ElementPlus);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector('#app') : '#app');
  // 将子应用的元素放到全局，用于修改元素的缩放；
  instance.config.globalProperties.container = container ? container.querySelector('#app') : document.querySelector('#app');
}

// 独立运行时
// eslint-disable-next-line
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageName = require('../package.json').name;

// eslint-disable-next-line
(window as any)["\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d\x4d\x69\x63\x72\x6f\x61\x70\x70"](packageName,{bootstrap:()=>{},mount:(props:any)=>{render(props)},unmount:()=>{instance["\x75\x6e\x6d\x6f\x75\x6e\x74"]();instance._container.innerHTML='';instance=null;router=null},update:(props:any)=>{},});

// 生命周期
// (window as any).transformMicroapp(packageName, {
//   bootstrap: () => {
//     console.log(`${packageName} bootstrap`);
//   },
//   mount: (props: any) => {
//     render(props);
//     console.log(`${packageName} mount`);
//   },
//   unmount: () => {
//     instance.unmount();
//     // eslint-disable-next-line
//     instance._container.innerHTML = '';
//     instance = null;
//     router = null;
//     console.log(`${packageName} unmount`);
//   },
//   update: (props: any) => {
//     console.log(`${packageName} update props`, props);
//   },
// });
