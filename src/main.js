/**
 * Created by Administrator on 2017/8/22.
 */
// 引入 相关插件
import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";

//  mint-ui 引入必须要一起引入其css文件
import MintUi from "mint-ui";
import "mint-ui/lib/style.css"

//  顶部导航栏 css样式 mui插件
import '../static/libs/mui-master/dist/css/mui.css';

//  引入组件
import App from "./App.vue";
import Home from "./component/home/Home.vue";
import Vip from "./component/vip/Vip.vue";
import Shopcart from "./component/shopcart/Shopcart.vue";
import Search from "./component/search/Search.vue";



// 挂载对象
Vue.use(VueRouter);
Vue.use(MintUi);

//// 在Vue 对象原型上挂载axios对象 这样this vue都能直接点使用axios方法
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';

//  创建路由对象
let router = new VueRouter({
  routes:[
    {name:"home",path:"/home", component:Home},
    {name:"vip",path:"/vip", component:Vip},
    {name:"shopcart",path:"/shopcart", component:Shopcart},
    {name:"search",path:"/search", component:Search},
  ]
})



new Vue({
  el:"#app",
  render:c => c(App),
  router
})