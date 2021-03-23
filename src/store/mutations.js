import {
  ADD_CART
} from './mutation-type'

export default {
  [ADD_CART](state, payload) {
    //查找之前是否已经添加过该商品
    let product = state.cartList.find(item => item.iid === payload.iid);
    //如果存在，则直接数量加一
    if(product) {
      product.count += 1;
    } else {
      payload.count = 1;
      payload.checked = true;
      state.cartList.push(payload);
    }
  },
  
  //商品数量加一
  addNum(state, payload) {
    payload.count += 1;
  },
  //商品数量减一
  deNum(state, payload) {
    payload.count -= 1;
  },

  //删除选中的商品
  removeProducts(state, payload) {
    //传递过来的是没有被选中的商品
    state.cartList = payload;
  }
}