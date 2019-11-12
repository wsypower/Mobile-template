<template>
  <div class="cg_preview">
    <page-header @rightBtnClickHandler="rightBtnClickHandler()" transparent />
    <scroll-page-wrap @scrollTop="scrollTop">
      <!-- 头部 -->
      <Friends-preview-header ref="FriendsPreviewHeader" />
    </scroll-page-wrap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import scrollPageWrap from '@/components/base/scrollPageWrap.vue';
import FriendsPreviewHeader from '@/components/views/friendsPreview/friendsPreviewHeader.vue';
import { getElementStyle } from '@/util/util';
@Component({
  name: 'FriPreview',
  components: {
    FriendsPreviewHeader,
    PageHeader,
    scrollPageWrap,
  },
})
export default class FriPreview extends Vue {
  // 头部图片 VNode 元素
  @Ref('FriendsPreviewHeader') readonly FriendsPreviewHeader!: {
    $el: HTMLElement;
  };

  //滚动 scrollTop 点位
  private scrollTopPoint: number = 0;

  //头部图片的高度
  private scrollImgHeight: number = 0;

  /**
   * 监听点击头部左侧功能按钮
   * @date 2019-11-11-19:55:22
   */
  private rightBtnClickHandler(): void {
    console.log('shoudaole');
  }

  /**
   * 监听滚动的点位
   * @date 2019-11-11-19:55:22
   */
  private scrollTop({ scrollTop }: { scrollTop: number }): void {
    this.scrollTopPoint = scrollTop;
    console.log(this.scrollTopPoint);
  }

  /**
   * 获取元素属性
   * @date 2019-11-11-22:08:32
   */
  private getEleStyle(el: HTMLElement, style: string): number {
    return parseFloat(getElementStyle(el, style));
  }

  /**
   * mounted
   */
  private mounted(): void {
    //获取头部图片的高度
    this.scrollImgHeight = this.getEleStyle(this.FriendsPreviewHeader.$el, 'height');
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
