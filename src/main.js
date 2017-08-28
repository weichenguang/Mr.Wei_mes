/**
 * Created by Administrator on 2017/8/22.
 */
// 引入 相关插件
import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import Moment from "moment";





//  mint-ui 引入必须要一起引入其css文件
import MintUi from "mint-ui";
import "mint-ui/lib/style.css"




//  顶部导航栏 css样式 mui插件
import './static/libs/mui-master/dist/css/mui.css';
// 全局背景颜色  必须在mui.css 下不然会被重叠
import "./static/comment/css/global.css";

//  引入组件
import App from "./App.vue";
import Home from "./component/home/Home.vue";
import Vip from "./component/vip/Vip.vue";
import Shopcart from "./component/shopcart/Shopcart.vue";
import Search from "./component/search/Search.vue";
import NewsList from "./component/news/newsList.vue";
import NavBar from "./component/commons/navbar.vue";
import NewsDetail from "./component/news/newsdetail.vue";
import PicList from "./component/pic/picList.vue";
import Picdetail from  "./component/pic/picdetail.vue";
import Comment from "./component/commons/comment.vue";
import GoodsList from "./component/goods/goodslist.vue";
import GoodsDetail from "./component/goods/goodsdetail.vue";
import MySwipe from "./component/commons/MySwipe.vue";
import GoodsComment from "./component/goods/GoodsComment.vue";


//创建全局组件
Vue.component("NavBar",NavBar)
Vue.filter("changeTime",function (value) {
    return Moment(value).format("YYYY-MM-DD");
})

Vue.component("Comment",Comment)
Vue.component("MySwipe",MySwipe)

// 挂载对象
Vue.use(VueRouter);
Vue.use(MintUi);

// 引入vue-preview 轮播图 缩略图 插件

/*使用vue-preview 插件 必须要配合:
  W H 设置.
  在webpack.config中也要设置相应的loader
  在webpack.config  图片出来loader中加上gif 格式的出来*/
import VuePreview from "vue-preview";
Vue.use(VuePreview);


//// 在Vue 对象原型上挂载axios对象 这样this vue都能直接点使用axios方法
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';



//设置loading拦截器
Axios.interceptors.request.use(config=>{
  MintUi.Indicator.open({//显示loadding图标
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
});
//响应的拦截器
Axios.interceptors.response.use(response=>{
  MintUi.Indicator.close(); //关闭loadding图标
  return response;
})

//  创建路由对象
let router = new VueRouter({
  //  mui  加个类名 能够显示 下部导航栏能高亮显示
  linkActiveClass:'mui-active',
  routes:[
    {path:"/",redirect:{name:'home'}},  // 重定向
    {name:"home",path:"/home", component:Home}, // 首页
    {name:"vip",path:"/vip", component:Vip}, // vip页
    {name:"shopcart",path:"/shopcart", component:Shopcart}, // 购物车页
    {name:"search",path:"/search", component:Search}, //收索页
    {name:"news.list",path:"/news/list",component:NewsList}, // 新闻资讯页
    {name:"news.detail",path:"/news/detail",component:NewsDetail},// 新闻详情页
    {name:"pic.list",path:"/pic/list",component:PicList}, // 图片新闻 资讯页
    {name:"pic.detail",path:"/pic/detail/:imgId",component:Picdetail}, // 图片详情页
    {name:"goods.list",path:"/goods/list",component:GoodsList}, // 商品列表页
    {name:"goods.detail",path:"/goods/detail/:goodsId",component:GoodsDetail}, // 商品详情页
    {name:"goods.info",path:"/goods/showInfo",component:NewsDetail}, // 单个商品展示页
    {name:"goods.comment",path:"/goods/comment",component:GoodsComment}
  ]
})



new Vue({
  el:"#app",
  render:c => c(App),
  router
})