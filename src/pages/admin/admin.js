import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueRouter from 'vue-router';
import App from './App';
import router from './router'
import 'element-ui/lib/theme-chalk/display.css';//引入element-ui隐藏类
import commonFucntion from '@/assets/js/function';//引入自定义全局方法
import components from './assets/js/components.js';
import * as commonFilter  from '@/assets/js/filter';//引入全局过滤器
import hljs from 'highlight.js';//引入高亮
import 'highlight.js/styles/googlecode.css';//引入高亮样式
import store from './store';
import echarts from 'echarts'





//全局注册
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(commonFucntion);
Vue.use(components);
Vue.use(commonFilter);
Vue.prototype.$echarts = echarts ;
Vue.prototype.axios = axios;
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
});


/* 创建挂载点至#app元素，将内容显示在index.html页面 */
let app = new Vue({
  el: '#app',
  router,
  axios,
  store,
  // instance,
  render: h => h(App)
})


Vue.use({app})
