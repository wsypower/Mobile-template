<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <div class="shiw">
      <div
        class="shishi"
        flex="main:center cross:center"
      ></div>
    </div>
    <md-button
      type="primary"
      loading
    >Loading</md-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from 'mand-mobile/lib/button';
@Component({
  components: {
    HelloWorld,
    [Button.name]: Button,
  },
})
export default class Home extends Vue {}
</script>
<style scoped lang="scss">
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
