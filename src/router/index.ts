// import { RouteRecordRaw } from 'vue-router';

// 首次必然要加载的路由
const constRoutes: Array<any> = [];

// 所有路由
// eslint-disable-next-line
let routes:Array<any> = [...constRoutes];

// 自动添加router目录下的所有ts路由模块
const files = require.context('./', false, /\.ts$/);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageName = require('../../package.json').name;

files.keys().forEach((route) => {
  // 如果是根目录的 index.js、 不做任何处理
  if (route.startsWith('./index')) {
    return;
  }
  const routerModule = files(route);

  // 如果是线上独立访问，路由变为访问地址
  if (routerModule.default) {
    routerModule.default.forEach((routeItem: any) => {
      // eslint-disable-next-line
      routeItem.path = !(window as any).__POWERED_BY_QIANKUN__ && process.env.NODE_ENV === 'production' ? `/${packageName}${routeItem.path}` : routeItem.path;
    });
  } else {
    routerModule.forEach((routeItem: any) => {
      // eslint-disable-next-line
      routeItem.path = !(window as any).__POWERED_BY_QIANKUN__ && process.env.NODE_ENV === 'production' ? `/${packageName}${routeItem.path}` : routeItem.path;
    });
  }

  // 兼容 import export 和 require module.export 两种规范 ES modules commonjs
  routes = [...constRoutes, ...(routerModule.default || routerModule)];
});
console.log('routes', routes);

export default routes;
