import App from './App'
import { myRequest,changeImg,actiImg } from "./common/js/api.js";
import Vue from 'vue'

Vue.prototype.$myRequest = myRequest //Vue原型，挂载全局请求方法
Vue.prototype.$changeImg = changeImg //Vue配置，挂载全局资源转译方法
Vue.prototype.$actiImg = actiImg //Vue配置，挂载全局缓存资源转译方法
Vue.config.productionTip = false //Vue配置提示
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()