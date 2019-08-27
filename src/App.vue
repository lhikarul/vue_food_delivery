<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  #app {
    min-height: 100vh;
    position: relative;
    max-width: 375px;
    margin: 0 auto;
  }
</style>
