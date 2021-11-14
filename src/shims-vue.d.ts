declare module '*.vue' {
  // import { defineComponent } from 'vue';
  declare let Vue: any;
  const { defineComponent } = Vue;

  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'swiper/vue';
