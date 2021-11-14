// eslint-disable-next-line
const packageName = require('../package').name;

// 是否是运行在微前端中的微应用
// eslint-disable-next-line
__webpack_public_path__ = (window as any).__POWERED_BY_QIANKUN__
  // eslint-disable-next-line
  ? (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  : process.env.NODE_ENV === 'production' ? `/${packageName}/` : '/';
