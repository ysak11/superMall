<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item" 
    :class="{active: index === currentIndex}" @click="titleClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      //通过改变当前索引来改变样式，并发送事件给父组件
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    /* align-items: center; */
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    outline: 1px solid #eee;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
    /* background-color: #eee; */
  }

  .active span{
    border-bottom: 3px solid var(--color-tiny);
  }

</style>