import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

//导入
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
//只要执行了Vue.use就执行了import toast from 'components/common/toast' 里面的东西
Vue.use(toast)

//调用
//解决移动端300ms的延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  //懒加载图片占位符
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
