<template>
  <div class="account-info">
    <div class="account-item">
      <div class="wrap">
        <div><span class="num">0.00</span>元</div>
        <div class="remain">我的余额</div>
      </div>
    </div>
    <div class="account-item">
      <div class="wrap">
        <div><span class="num">0</span>个</div>
        <div class="remain">我的余额</div>
      </div>
    </div>
    <div class="account-item">
      <div class="wrap">
        <div><span class="num">0</span>分</div>
        <div class="remain">我的余额</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo"
}
</script>

<style scoped>
  .account-info {
    display: flex;
    width: 100%;
    text-align: center;
    height: 85px;
    border-bottom: 8px solid #eee;
  }

  .account-item {
    flex: 1;
    outline: 1px solid #eee;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .num { 
    color: #ff7733;
  }

  .remain {
    margin-top: 5px;
  }
</style>