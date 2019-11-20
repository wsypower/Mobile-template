<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _add from 'lodash/fp/add';

@Component({
  name: 'app',
})
export default class extends Vue {}
</script>
<style lang="scss">
//初始化文件（新加入iphone-x的安全布局） + flex布局
@import '~@style/core/function';
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
