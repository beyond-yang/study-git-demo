import { createStore } from 'vuex';

interface IModule {
  [key: string]: { namespaced: boolean }
}

// 自动添加mudules下的所有ts模块
const modules: IModule = {};
// const files = require.context('./modules', false, /\.ts$/);
// files.keys().forEach((key) => {
//   const moduleKey = key.replace(/(\.\/|\.ts)/g, '');
//   modules[moduleKey] = files(key).default;
//   modules[moduleKey].namespaced = true; // 让 mutations、getters、actions 也按照模块划分
// });

export const SET_SEARCHPANELSTATUS = 'SET_SEARCHPANELSTATUS'; // 设置搜索面板状态
export const SET_LAYERPANELSTATUS = 'SET_LAYERPANELSTATUS'; // 设置图层面板状态

// 无需使用模块或者是一些通用的状态写在下方
export default createStore({
  state: {
    searchPanelShow: false, // 显示搜索面板
    layerPanelShow: false, // 显示图层面板
  },
  mutations: {
    /**
     * 设置搜索面板的状态
     */
    [SET_SEARCHPANELSTATUS](state, options) {
      state.searchPanelShow = options;
    },

    /**
     * 设置图层面板的状态
     */
    [SET_LAYERPANELSTATUS](state, options) {
      state.layerPanelShow = options;
    },
  },
  actions: {
    /**
     * 存储搜索面板的状态，形成路由历史
     */
    setSearchPanelStatus({
      commit,
    }, params) {
      commit(SET_SEARCHPANELSTATUS, params);
    },

    /**
     * 存储图层面板的状态，形成路由历史
     */
    setLayerPanelStatus({
      commit,
    }, params) {
      commit(SET_LAYERPANELSTATUS, params);
    },
  },
  modules,
});
