<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <category-list :type-list="sortlist" @typeLoad="typeloaded"/>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CategoryList from './childComps/CategoryList'

import {getCategory, getCategoryTop, getCategorySub} from 'network/category'

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategoryList
  },
  data() {
    return {
      sortlist: [],
      currentType: '',
      goodslist: {}
    }
  },
  computed: {
    showToplist() {
      return this.goodslist[this.currentType].listTop;
    },
    showBotlist() {
      return this.goodslist[this.currentType].listBot;
    }
  },
  created() {
    getCategory().then(res => {
      console.log(res.data)
      this.sortlist = res.data.category.list;
      this.currentType = this.sortlist[0].title;
      for(let i = 0; i < this.sortlist.length; i++) {
        let obj = {'listTop':[],'listBot':[]};
        obj.maitKey = this.sortlist[i].maitKey;
        obj.miniWallkey = this.sortlist[i].miniWallkey;
        let a = this.sortlist[i].title;
        this.goodslist[a] = obj;
      }
    })
  },
  methods: {
    typeloaded() {
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tiny);
    color: #fff;
  }

  .content {
    height: calc(100vh - 44px - 49px);
    width: 100px;
    overflow: hidden;
    background-color: #eee;
  }
</style>