<template>
  <div class="box"  :style="{height:parentHeight+'px'}">
      <nav-bar text="商品列表"></nav-bar>
      <mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded"
                   :auto-fill="autoFill"   @bottom-status-change="changeStatus" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
        <li v-for="goods in goodslists" :key="goods.id"  class="mui-table-view-cell mui-media mui-col-xs-6">
          <router-link :to="{name:'goods.detail', params:{goodsId:goods.id} }">
            <img class="mui-media-object" :src="goods.img_url">
            <div class="mui-media-body">{{goods.title}}</div>
            <div class="desc">
              <div class="sell">
                <span>￥{{goods.sell_price}}</span>
                <s>￥{{goods.market_price}}</s>
              </div>
              <div class="detail">
                <div class="hot">
                  热卖中
                </div>
                <div class="count">
                  剩{{goods.stock_quantity}}件
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      </mt-loadmore>
  </div>
</template>
<script type=text/ecmascript-6>
  export default{
    data(){ //数据
      return {
        goodslists:[],
        allLoaded:false, // 当底部数据全部获取完毕时。allLoaded 为true 上拉函数就不执行
        autoFill:false, // 检测它的高度是否能够撑满其容器. autoFill 为true 撑满容器 上啦函数就不执行
        parentHeight:0,
        page:2
      }
    },
    methods: { // 行为
      loadmoreFrist(page){
        if(page > 1){
          this.$ajax.get("getgoods?pageindex=" + page)
              .then(res=>{
                // 判断请求的数据回来的数据 是否为空 为空禁止下拉功能生效
                if(res.data.message.length != 10){
                  this.allLoaded = true;
                }

                this.goodslists = this.goodslists.concat(res.data.message)
              })
              .catch(err=>{
                console.log(err);
              })
        }else{
          this.$ajax.get("getgoods?pageindex=1")
              .then(res=>{

                this.goodslists = res.data.message
              })
              .catch(err=>{
                console.log(err);
              })
        }

      },
      loadBottom(){
        this.loadmoreFrist(this.page);
        this.page++;


//    解决下拉 要多点击一次之后才能在次下拉 问题
        this.$refs.loadmore.onBottomLoaded()
      },
//      检测 当用户滑动组件时 的状态
      changeStatus(status){
//        console.log(status);
      }
    },
    components: { // 组件
      
    },
    created(){
      this.loadmoreFrist()
    },
    mounted(){//DOM生成，可以操作DOM
      let headerHeight = this.$parent.$refs.n1.$el.offsetHeight;
      let footerHeight = this.$parent.$refs.n2.offsetHeight;
      this.parentHeight = document.documentElement.clientHeight - headerHeight - footerHeight;
    }
  }
</script>
<style scoped>
  .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
  }

  .sell > span {
    float: left;
    color: red;
    text-align: left;
  }

  .detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
  }

  .detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
  }


  /*撑开，去除浮动没有的高度*/

  .detail {
    overflow: hidden;
  }

  .desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
  }
</style>