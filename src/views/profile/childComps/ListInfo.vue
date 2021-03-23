<template>
  <div class="list-info">
    <div class="first">
      <div><img src="~assets/img/profile/email.svg" alt="">我的消息</div>
      <div><img src="~assets/img/profile/point.svg" alt="">积分商城</div>
      <div><img src="~assets/img/profile/vipCard.svg" alt="">会员卡</div>
    </div>
    <div class="second">
      <div><img src="~assets/img/profile/car.svg" alt="">我的购物车</div>
      <div><img src="~assets/img/profile/bag.svg" alt="">下载购物APP</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListInfo",

}
</script>

<style scoped>
  .list-info img {
    width: 15px;
    margin-right: 7px;
  }

  .first div, .second div {
    border-top: 1px solid #eee;
    height: 38px;
    line-height: 38px;
    padding-left: 15px;
    vertical-align: middle;
  }

  .first {
    border-bottom: 10px solid #eee;
  }
</style>