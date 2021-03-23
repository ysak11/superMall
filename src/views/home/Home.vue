<template>
  <div class="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" v-show="isTabFixed" @tabClick="tabClick" ref="control2" class="tab-control2"/>
    <scroll class="scroll" ref="scroll" :probe-type=3 :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommends :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="control1"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import Recommends from './childComps/Recommends'
import FeatureView from './childComps/FeatureView'

import {throttle} from 'common/utils'


import {
  getHomeMultidata,
  getHomeGoods
} from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    Recommends,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    //返回当前种类的商品数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //获取首页轮播图和推荐图的数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    //获取首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    },

    //改变当前数据的种类
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1: 
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      //两个control组件的index都要改变
      this.$refs.control1.currentIndex = index;
      this.$refs.control2.currentIndex = index;
    },

    //回到顶部功能
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    //监听滚动事件
    contentScroll(position) {
      this.isShowBackTop = -position.y >= 600 ? true : false;

      //控制另一个tabControl的显示和隐藏
      this.isTabFixed = this.$refs.control1.$el.offsetTop > -position.y ? false : true;
    },

    //请求更多的商品数据
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.refresh();
      //每次都需要调用finish方法后才能进行下一次触底事件
      this.$refs.scroll.finishPullUp();
    }
  },
  created() {
    //轮播图和推荐的数据
    this.getHomeMultidata(); 

    //获取首页商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    //监听item中图片的加载完成，然后刷新重新计算高度
    const refresh = throttle(this.$refs.scroll.refresh, 300);
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll && refresh();
    })
  },
  //回到记录位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 10);
    this.$refs.scroll.refresh();
  },
  //记录离开位置
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  }
}
</script>
<style scoped>
  .home {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tiny);
    color: #fff;
  }

  .scroll {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }

  .tab-control2 {
    position: fixed;
    top: 44px;
    z-index: 9;
  }
</style>