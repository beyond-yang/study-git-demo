<template>
  <section class="home-wrapper">
    <h1>测试 git push -u origin main 的作用</h1>
    <h2>测试 git 的回退版本 reset 功能</h2>
    <!-- 左侧内容 -->
    <div class="view view__left scale">
      <div class="text-left">
        <!-- 字体图标 -->
        <span class="ion-moveup icon-color"></span>
        <!-- 测试监听 -->
        <br/><el-button @click="testSocket">测试socket监听</el-button>
        <br/><el-button @click="clickMapInteractive">点击和地图进行交互</el-button>
        <!-- 具体内容 -->
        <br/>我是搜索左侧的内容
        <br/>居左侧缩放的
        <br/>可直接在这增加左侧内容
        <br/>在view__left标签内的元素无需再考虑缩放的问题
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="view view__right scale">
      <div class="text-right">
        我是搜索右侧的内容
        <br/>居右侧缩放的。
        <br/>可直接在这增加右侧内容
        <br/>在view__right标签内的元素无需再考虑缩放的问题
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="view view__center scale">
      <div class="text-center">
        我是搜索中间的内容
        <br/>居中缩放的。
        <br/>可直接在这增加弹框等居中内容
        <br/>在view__center标签内的元素无需再考虑缩放的问题
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  onUnmounted,
  toRefs,
  reactive,
  h,
} from 'vue';
import { scaleView } from '@/hooks/common/use-scale'; // 缩放

export default defineComponent({
  name: 'Home',
  setup(props, context: any) {
    // 计算属性
    const state = reactive({
      componentName: '', // 组件的名称
    });

    /**
     * 测试监听
     */
    const testSocket = () => {
      // 发送消息
      if ((window as any).socket) {
        (window as any).socket.send({
          name: '我是用socket发送的消息！',
        });
      }
    };

    /**
     * 点击和地图进行交互
     */
    const clickMapInteractive = () => {
      // 发送消息
      if ((window as any).socket) {
        (window as any).socket.send({
          type: 'regionCode',
          code: '110000',
        });
      }
    };

    onMounted(() => {
      // 缩放视图
      scaleView();
      // 接收消息
      if ((window as any).socket) {
        let isFirstLayersLoaded = true;
        // 接收消息
        (window as any).socket.on((info: any) => {
          // 打印接收到的消息
          console.log(info);
          /**
           * 场景默认配置图层加载完成
           * @desc 默认对地球和配置图层的默认处理在该处写
           */
          if (info.type === 'layersAdded' && isFirstLayersLoaded) {
            // 图层列表图层加载完成只执行一次
            isFirstLayersLoaded = false;
            console.log('图层加载完成');
            // ...对地球和配置图层的默认处理，例如给图层注册事件
          }
        });
      }
    });

    onUpdated(() => {
      scaleView(); // 缩放视图
    });

    onUnmounted(() => {
      // 关闭连接
      if ((window as any).socket) {
        (window as any).socket.leave();
      }
    });

    return {
      ...toRefs(state),
      testSocket,
      clickMapInteractive,
    };
  },
});
</script>

<style scoped lang="scss">
.home-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  clear: both;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .view {
    position: absolute;
    top: 0;
    left: 0;
    clear: both;
    width: 100%;
    height: 100%;

    &__left {
      transform-origin: left top;
    }

    &__right {
      transform-origin: right top;
    }

    &__center {
      transform-origin: center center;
    }
  }

  .icon-color {
    background: -webkit-linear-gradient(left bottom, #fb2c61, #fac362);
    background-clip: text;
    font-size: 30px;
    -webkit-text-fill-color: transparent;
  }

  .text-left {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 460px;
    height: 880px;
    border-radius: 8px;
    background-image: linear-gradient(180deg, rgba(18, 28, 66, 0.7), #0e3169);
    color: #fff;
    line-height: 40px;
    text-align: center;
    pointer-events: all;
  }

  .text-right {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 460px;
    height: 880px;
    border-radius: 8px;
    background-image: linear-gradient(180deg, rgba(18, 28, 66, 0.7), #0e3169);
    color: #fff;
    line-height: 40px;
    text-align: center;
    pointer-events: all;
  }

  .text-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    border-radius: 8px;
    background-image: linear-gradient(180deg, rgba(18, 28, 66, 0.7), #0e3169);
    color: #fff;
    line-height: 40px;
    text-align: center;
    pointer-events: all;
    transform: translate(-50%, -50%);
  }
}
</style>
