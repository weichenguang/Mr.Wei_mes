/**
 * Created by Administrator on 2017/8/27.
 */
const goodsTools = {};

// 获取存在本地的 购物车信息 prods 类型 =》 { 88(id):1(数量) }
let prods = JSON.parse( window.localStorage.getItem("prods") ) || {};

//  添加 商品到本地
goodsTools.addorUpdata = function(goods){
    if(prods[goods.id]){
      prods[goods.id] += goods.num;
    }else{
      prods[goods.id] = goods.num;
    }

  // 要让内存的对象与本地存储保持同步
  this.savePords(prods)
}

// 删除商品
goodsTools.deletProd = function (prodsID) {
    delete prods[prodsID]

  // 要让内存的对象与本地存储保持同步
    this.savePords(prods)
}

// 获取数据  拼接在url后面的id
goodsTools.getProds = function (id) {
  let prods = JSON.parse( window.localStorage.getItem("prods") ) || {};
  if(prods[id]){
    return prods[id]
  }else{
    return prods
  }
}

// 保存数据
goodsTools.savePords = function (obj) {
    window.localStorage.setItem( "prods",JSON.stringify(obj) )
}

// 返回商品总数
goodsTools.getProdsCount = function () {
    let sum = 0;
   const prods = goodsTools.getProds();
    for(let key in prods){
      sum += prods[key]
    }
    return sum
}

export default goodsTools


