<template>
  <div class="box">
      <nav-bar text="购物车"></nav-bar>
      <div class="pay-detail">
        <ul>
          <li  v-for="(goods,index) in goodsList" :key="goods.id" class="p-list">
            <mt-switch v-model="goods.checked"></mt-switch>
            <img :src="goods.thumb_path">
            <div class="pay-calc">
              <p>{{goods.title}}</p>
              <div class="calc">
                <span>￥{{goods.sell_price}}</span>
                <span @click="sub(goods)">-</span>
                <span>{{goods.num}}</span>
                <span @click="add(goods)">+</span>
                <a href="javascript:;" @click="del(index)">删除</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="show-price">
        <div class="show-1">
          <p>总计(不含运费):</p>
          <span>已经选择商品{{payment.count}}件，总价￥{{payment.totalPrice}}元</span>
        </div>
        <div class="show-2">
          <mt-button type="danger" size="large">去结算</mt-button>
        </div>
      </div>
  </div>
</template>
<script type=text/ecmascript-6>

  import goodsTools from  "../commons/goodsTools.js";
  import Connect from "../commons/Connect.js";


  export default{
    data(){ //数据
      return {
        goodsList:[]
      }
    },
    methods: { // 行为
      add(goods){
        goods.num++;
      },
      sub(goods){
        goods.num === 1 ? 1 : goods.num--;
      },
      del(index){
        if(confirm("请真的要删除吗？")){
          delete this.goodsList.splice(index,1)
        }
      }
    },
    components: { // 组件
      
    },
    created(){
//      获取 存在本地的数据
      const prods = goodsTools.getProds();
      let ids = Object.keys(prods)  //返回是个 一key为元素的数组
      let urlid = ids.join(",")

      if(!urlid){
        urlid = "0"
      }

//    拼接数据 发起请求
      this.$ajax.get('goods/getshopcarlist/' + urlid)
      .then(res=>{
        this.goodsList = res.data.message

        this.goodsList.forEach( ele => {
          //vue中直接添加属性，不能响应式的,需要特定的函数
          this.$set(ele,"checked",true)
          this.$set(ele,"num",prods[ele.id])
        })


      })
      .catch(err=>{
        console.log(err);
      })
    },
//     计算总的价格
    computed:{
      payment(){
        let count = 0;
        let totalPrice = 0;
        this.goodsList.forEach( ele =>{
          if(ele.checked){
            count += ele.num
            totalPrice += ele.sell_price * ele.num
          }
        })

        return { count , totalPrice }
      }
    },

    beforeRouteLeave (to, from, next) {
      if(confirm('亲，确定要离开吗，这么好的商品')){
        let obj = {};
        //转换数据
        this.goodsList.forEach(ele=> obj[ele.id] = ele.num);

        //先保存数据
        goodsTools.savePords(obj);

        //获取商品总数
        let sum = goodsTools.getProdsCount();

        //通知App.vue更改小球显示数量
        Connect.$emit('changeShopcart2',sum);

        //当前组件被App.vue使用,建议未来尽量少A组件改B组件
        // this.$parent.$data.num = sum;
        //放行
        next();

      }else{
        next(false);//取消导航行为
      }
    }
  }
</script>
<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }

  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }

  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }

  .pay-detail ul li >:nth-child(1),
  .pay-detail ul li >:nth-child(3) {
    display: inline-block;
  }

  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .pay-detail ul li >:nth-child(1) {
    line-height: 80px;
  }

  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }

  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .calc a {
    margin-left: 20px;
  }

  .show-1,
  .show-2 {
    display: inline-block;
  }

  .show-1,
  .show-2 {
    margin-left: 30px;
  }

  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>