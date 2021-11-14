import { getLocationUrl } from '@/utils/common';
import http from '@/utils/http';
// eslint-disable-next-line
const packageName = require('../../../package').name;

/**
 * 获取地图使用的配置文件路径
 */
async function getConfigPath() {
  let path = '';
  // 判断是否是线上地址
  // eslint-disable-next-line
  if (!(window as any).__POWERED_BY_QIANKUN__ && process.env.NODE_ENV === 'production') {
    path = `http://${window.location.host}/${packageName}/map-config/config.json`;
  } else {
    path = `http://${window.location.host}/map-config/config.json`;
  }
  // 获取文件，判断里边是不是空的
  const data = await http.get(path, {}).then((res) => {
    if (Object.keys(res.data).length > 0) {
      return path;
    }
    return '';
  });
  return data;
}

/**
 * 动态添加地图
 */
async function addMap() {
  // 获取地图使用的配置文件路径
  const filePath = await getConfigPath();
  // 获取浏览器的url或者去找缓存数据，找到用户名
  getLocationUrl((params:any) => {
    if (params.name) {
      const socketIp = (window as any).$config.socketUrl;
      // 读地址栏的用户名
      const dom:any = document.body;
      const iframeDom = document.createElement('iframe');
      iframeDom.src = `http://10.100.245.116:8076/t-earth/index.html?name=${params.name}&socket=${socketIp}&config=${filePath}`;
      iframeDom.style.width = '100%';
      iframeDom.style.height = '100%';
      iframeDom.style.border = 'none';
      iframeDom.style.display = 'block';
      iframeDom.style.position = 'fixed';
      iframeDom.style.left = '0';
      iframeDom.style.top = '0';
      iframeDom.style.zIndex = '-1';
      dom.appendChild(iframeDom);
    }
  });
}
// eslint-disable-next-line
if (!(window as any).__POWERED_BY_QIANKUN__) {
  addMap();
}
