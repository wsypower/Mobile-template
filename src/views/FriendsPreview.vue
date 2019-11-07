<template>
  <div class="cg_preview">
    <page-header @rightBtnClickHandler="rightBtnClickHandler()" transparent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageHeader from '@/components/views/PageHeader.vue';
@Component({
  name: 'FriPreview',
  components: {
    PageHeader,
  },
})
export default class FriPreview extends Vue {
  rightBtnClickHandler() {
    console.log('shoudaole');
  }
}
</script>

<style scoped lang="scss" >
.cg_preview {
  width: 100%;
  height: 100%;
  background-color: rgb(22, 148, 167);
  // height: 50px;
}
</style>