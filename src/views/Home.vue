<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="shiw">
      <div class="shishi" flex="main:center cross:center">111</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
<style scoped lang="scss" type='text/scss'>
$white: #fff;
.shiw {
  width: 750px;
  height: 600px;
  background-color: red;
  @include center-translate();
  .shishi {
    width: 200px;
    height: 200px;
    background-color: saddlebrown;
    color: #fff;
    color: $white;
  }
}
</style>
