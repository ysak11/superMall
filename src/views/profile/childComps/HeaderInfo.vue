<template>
  <div class="header-info">
    <div class="left">
      <img src="~assets/img/profile/header.svg" alt="">
    </div>
    <div class="center">
      <span>登录/注册</span>
      <div class="phone-icon">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img/profile/next.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {  
  name: "HeaderInfo"
}
</script>

<style scoped>
  .header-info {
    display: flex;
    height: 85px;
    overflow: hidden;
    align-items: center;
    background-color: var(--color-tiny);
  }

  .left {
    height: 65px;
    margin: 0 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  .left img {
    height: 65px;
  }

  .center {
    flex: 1;
    color: #fff;

  }

  .center .phone-icon {
    margin-top: 3px;
  }

  .center img {
    width: 16px;
    vertical-align: middle;
  }

  .right {
    width: 40px;
    display: flex;
    justify-content: center;
  }

  .right img {
    width: 20px;
  }
</style>