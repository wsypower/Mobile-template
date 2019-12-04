<template>
  <div class="self_history">
    111111111111111111
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
@Component({
  name: 'SelfHistory',
  components: {},
})
export default class SelfHistory extends Vue {}
</script>

<style scoped lang='scss'>
.self_history {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>