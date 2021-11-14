import { getCurrentInstance } from 'vue';

/**
 * 缩放视图
 */
function scaleView():void {
  const h = document.documentElement.clientHeight; // 屏幕可视高度
  // 缩放面板
  const ctx: any = getCurrentInstance()?.appContext.config.globalProperties;
  const panelElement: Array<HTMLElement> = Array.from(ctx.container.querySelectorAll('.scale'));
  const panelZoom = h / 1080; // 缩放级别，1080为设计图的高度
  if (panelElement && panelElement.length) {
    panelElement.forEach((item: HTMLElement) => {
      const dom = item;
      dom.style.transform = `scale(${panelZoom})`;
    });
  }
}

export { scaleView };
