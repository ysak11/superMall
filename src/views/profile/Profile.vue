<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <header-info/>
    <account-info/>
    <list-info/>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import HeaderInfo from './childComps/HeaderInfo'
import AccountInfo from './childComps/AccountInfo'
import ListInfo from './childComps/ListInfo'

export default {
  name : "Profile",
  components: {
    NavBar,
    HeaderInfo,
    AccountInfo,
    ListInfo
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tiny);
    color: #fff;
  }
</style>