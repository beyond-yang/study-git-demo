import socketio from 'socket.io-client';
import { getLocationUrl } from '@/utils/common/index';

/**
 * 注册socket
 */
function registerSocket(name:string) {
  // 中转socket的链接地址
  const url = (window as any).$config.socketUrl;

  // 连接到服务端
  const socket: any = socketio(url, { path: '/mepcSocket' });

  // 连接成功时触发，进入对应的房间
  socket.on('connect', () => {
    socket.emit('join-room', name);
  });

  // 注册到全局window上
  (window as any).socket = {
    /**
     * 离开房间
     */
    leave() {
      socket.emit('leave-room', name);
    },

    /**
     * 发送信息
     */
    send(data: any) {
      const sendData = data;
      sendData.room = name; // 必传，房间号
      socket.emit('message', sendData);
    },

    /**
     * 接收信息
     */
    on(callback: (data: any) => void) {
      socket.on('message', callback);
    },
  };
}

/**
 * 获取浏览器的url或者去找缓存数据，找到用户名
 */
getLocationUrl((params:any) => {
  if (params.name) {
    // 读地址栏的用户名和socket服务地址
    registerSocket(params.name);
  } else {
    // 读取缓存数据的用户名
    const user:any = localStorage.getItem('userName');
    if (user) {
      registerSocket(user);
    }
  }
});
