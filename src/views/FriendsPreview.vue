<template>
  <div class="cg_preview">
    <page-header @rightBtnClickHandler="rightBtnClickHandler()" transparent />
    <scroll-page-wrap>
      <!-- 头部 -->
      <Friends-preview-header />
    </scroll-page-wrap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import scrollPageWrap from '@/components/base/scrollPageWrap.vue';
import FriendsPreviewHeader from '../components/views/friendsPreview/friendsPreviewHeader.vue';
@Component({
  name: 'FriPreview',
  components: {
    FriendsPreviewHeader,
    PageHeader,
    scrollPageWrap,
  },
})
export default class FriPreview extends Vue {
  /**
   * @data
   */
  private setStartVal = 0;

  rightBtnClickHandler() {
    console.log('shoudaole');
  }
}
</script>

<style scoped lang="scss">
.cg_preview {
  width: 100%;
  height: 100%;
  background-color: red;
  // background-color: #f5f5f5;
}

</style>
