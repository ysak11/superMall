import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

Vue.config.productionTip = false;

//事件总线
Vue.prototype.$bus = new Vue();

//解决移动端300ms延迟
FastClick.attach(document.body);

//图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

//安装Toast插件
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
