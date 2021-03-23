<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content" ref="scroll" :probe-type=3 @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import {throttle, debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      topY: [],
      getTopY: null,
      currentIndex: 0
    }
  },
  methods: {
    //导航栏的点击
    titleClick(index) {
      if(index === 0) {
        this.$refs.scroll.scrollTo(0, 0, 200);
      } else {
        this.$refs.scroll.scrollTo(0, -this.topY[index], 200);
      }
      this.currentIndex = index;
    },

    //监听滚动事件
    contentScroll(position) {
      let index = 0;
      if(-position.y >= this.topY[3]) {
        index = 3;
      } else if (-position.y >= this.topY[2]) {
        index = 2;
      } else if(-position.y >= this.topY[1]) {
        index = 1;
      }
      
      if(index !== this.currentIndex) {
        this.currentIndex = index;
        this.$refs.navBar.currentIndex = index;
      }

      //监听回到顶部按钮的显示和隐藏
      this.isShowBackTop = -position.y <= 600 ? false : true;
    },

    //图片加载完成后重新计算并获取高度
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getTopY();
    },

    //添加购物车
    addToCart() {
      //获取购物车要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = parseInt(String(this.goods.price).slice(1));
      product.iid = this.iid;

      // console.log(product);
      
      //将商品信息加入购物车
      this.$store.commit('addCart', product);
      this.$toast.show('加入购物车成功', 1500);
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      const data = res.result;
      //获取轮播数据
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
      
    })
    //导航栏点击的节流
    this.getTopY = throttle(() => {
      this.topY = [];
      
      this.topY.push(0);
      this.topY.push(this.$refs.param.$el.offsetTop);
      this.topY.push(this.$refs.comment.$el.offsetTop);
      this.topY.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.topY);
    }, 100)
  },
  
}
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>