<template>
  <div>
      <nav-bar text="商品详情"></nav-bar>
      <div class="outer-swiper">
        <div class="swiper">
          <my-swipe :url='"getthumimages/" + $route.params.goodsId'></my-swipe>
        </div>
      </div>
      <div class="product-desc">
        <ul>
          <li><span class="product-desc-span">
                      {{goodsInfo.title}}
                  </span></li>
          <li class="price-li">市场价：
            <s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span></li>
          <li class="number-li">购买数量：<span @click="sub">-</span><span>{{num}}</span><span @click="add">+</span></li>
          <li>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
          </li>
        </ul>
      </div>
      <transition name="ball" @after-enter="afterEnter">
        <div class="ball" v-if="isShow"></div>
      </transition>
      <div class="product-props">
        <ul>
          <li>商品参数</li>
          <li>商品货号：{{goodsInfo.goods_no}}</li>
          <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
          <li>上架时间：{{goodsInfo.add_time | changeTime}}</li>
        </ul>
      </div>
      <div class="product-info">
        <ul>
          <li>
            <mt-button type="primary" size="large" plain @click="showGoodsInfo">图文介绍</mt-button>
          </li>
          <li>
            <mt-button type="danger" size="large" plain @click="showGoodsComment">商品评论</mt-button>
          </li>
        </ul>
      </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import Connect from "../commons/Connect.js";
  import goodsTools from  "../commons/goodsTools.js"


  export default{
    data(){ //数据
      return {
        goodsInfo:{},
        num:1,
        isShow:false
      }
    },
    methods: { // 行为
      sub(){
        this.num === 1 ? 1 : this.num--;
      },
      add(){
        this.num >= this.goodsInfo.stock_quantity ? this.goodsInfo.stock_quantity : this.num++;
      },
//      插入小球  （移出加插入 小球才能有动画）
      addShopcart(){
        this.isShow = true;
//        子组件 传值给父组件
        Connect.$emit("ChangeShopCart",this.num);

//        将信息 存储到本地中
        goodsTools.addorUpdata({
          id  : this.goodsInfo.id,
          num : this.num
        })

      },
//      移出小球
      afterEnter(){
        this.isShow = false;
      },
//        展示商品详情
      showGoodsInfo(){
          this.$router.push({
            name:"goods.info",
            query:{newsId:this.goodsInfo.id}
          })
      },
//      跳转到商品评论组件
      showGoodsComment(){
        this.$router.push({
          name:"goods.comment",
          query:{goodsId:this.goodsInfo.id}
        })
      }
    },
    components: { // 组件
      
    },
    created(){
      let goodsId = this.$route.params.goodsId;

      this.$ajax.get("goods/getinfo/" + goodsId)
        .then(res=>{
          console.log(res.data.message);
          this.goodsInfo = res.data.message[0]
        })
      .catch (err=>{
        console.log(err);
      })
    }
  }
</script>
<style scoped>
  .ball-enter-active {
    animation: bounce-in 1s;
  }

  @keyframes bounce-in {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(50px, -50px, 0);
    }
    75% {
      /*transform: translate3d(100px, 10px, 0);*/
    }
    100% {
      transform: translate3d(100px, 350px, 0);
    }
  }

  .swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
  }

  .outer-swiper,
  .product-desc,
  .product-props,
  .product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
  }


  /*请ulpadding*/

  .outer-swiper ul,
  .product-desc ul,
  .product-props ul,
  .product-info ul {
    padding: 0;
  }

  .product-desc ul li,
  .product-props ul li,
  .product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
  }

  .product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
  }

  .product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .product-desc ul,
  .product-info ul,
  .product-props ul {
    padding-left: 10px;
  }

  .price-li span {
    color: red;
    font-size: 25px;
  }

  .price-li s {
    margin-right: 16px;
  }


  /*加减*/

  .number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
  }


  /*商品参数*/

  .product-props ul >:nth-child(1) {
    text-align: left;
  }

  .product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
  }

  .product-info ul {
    margin-bottom: 70px;
    padding: 0 5px;
  }

  .number-li span {
    text-align: center;
  }

  .number-li >:nth-child(2) {
    width: 40px;
  }

  .ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
  }

</style>