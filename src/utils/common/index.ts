/* eslint-disable @typescript-eslint/ban-types */
/**
 * 变量是否为空
 * @param data 变量
 */
export function isEmpty(data: any): boolean {
  // eslint-disable-next-line no-nested-ternary
  return data
    ? Object.prototype.toString.call(data) === '[object Array]'
      ? data.length === 0
      : JSON.stringify(data) === '{}'
    : true;
}

/**
 * 模拟eval函数，防止eslint报错
 * @param fn js执行代码字符串
 */
export function evil(fn: string): any {
  const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn(`return ${fn}`)();
}

/**
 * 获取浏览器地址
 * @param callback 回调函数
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getLocationUrl(callback: Function) {
  const thisURL = window.location.search;
  const theRequest: any = {};
  if (thisURL.indexOf('?') !== -1) {
    const strs = thisURL.substr(1).split('&');
    for (let i = 0; i < strs.length; i += 1) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
    callback(theRequest);
  } else {
    callback(theRequest);
  }
}
