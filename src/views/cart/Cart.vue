<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" class="right" @click="removeProducts">删除</div>
    </nav-bar>
    <cart-list v-if="length>0" />
    <div class="nothing" v-else>购物车空空如也，快去选购吧</div>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength', 'cartList']);
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  methods: {
    //删除选中的商品
    removeProducts() {
      const unSelect = this.list.filter(item => !item.checked);
      
      if(unSelect.length === this.list.length) {
        this.$toast.show('请选择要删除的商品')
      } else {
        this.$store.commit('removeProducts', unSelect);
      }
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    color: #fff;
    background-color: var(--color-tiny);
  }

  .right {
    font-size: 13px;
    font-weight: bold;
  }

  .nothing {
    height: calc(100vh - 44px - 49px - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>