<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    /* background-color: red; */
    border-radius: 50%;
    border: 2px solid #aaa;
    position: relative;
  }

  /* .check-button img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  } */

  .active {
    background-color: red;
    border-color: red;
  }
</style>