<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    
    //计算选中商品的总价格
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked;
      }).reduce((pre, item) => {
        return pre + item.count * item.price;
      }, 0).toFixed(2);
    },

    //检查有多少个商品处于选中状态
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },

    //全选按钮状态的监听
    isSelectAll() {
      if(this.cartList.length === 0) return false;

      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      //先记录全选按钮的状态，以免在遍历时会被改变
      let temp = this.isSelectAll;
      this.cartList.forEach(item => item.checked = !temp);
    },

    //结算按钮的处理
    calcClick() {
      if(this.cartList.length !== 0 && this.cartList.find(item => item.checked)) return;
      this.$toast.show('请选择要购买的商品', 2000)
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 100%;
  }

  .check-button {
    margin-right: 5px;
    display: flex;
  }

  .price {
    flex: 1;
    margin-left: 20px;
  }

  .calculate {
    width: 90px;
    text-align: center;
    border-radius: 16px;
    background-color: #f39c12;
    color: #fff;
  }
</style>