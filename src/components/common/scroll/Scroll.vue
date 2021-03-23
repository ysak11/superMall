<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //初始化BScroll实例
    this.scroll = new BSroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //监听滚动事件
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position);
    })

    //上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp');
    })
  },
  methods: {
    //简单的封装
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log('refresh');
    },
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>

</style>