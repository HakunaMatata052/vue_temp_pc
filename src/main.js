import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入api接口
import API from "@/server/apis.js";  
// 引入全局方法
import * as method from "@/common/js/mixin.js"; 
// 样式初始化
import "@/common/styles/base.css"; 
//引入UI组件
import ElementUI from 'element-ui';  
import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义主题样式
import '@/common/styles/theme/index.css'
// 自定义样式
import "@/common/styles/mixin.less"; 
//过滤器
import * as  filters from "./filters/filters"; 
Vue.use(ElementUI);

// 全局引入API
Vue.prototype.$SERVER = API;
// 全局引入公用方法，也可以在组件中单独引入，推荐在组件中单独引入。
Vue.prototype.$METHOD = method;
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
