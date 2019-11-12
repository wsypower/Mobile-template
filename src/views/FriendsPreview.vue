<template>
  <div class="cg_preview">
    <page-header @rightBtnClickHandler="rightBtnClickHandler()" :transparent="headerTransparent" />
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
import { getElementStyle } from '@/util/util.assist';
import util from '@/util/util';
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
   * 头部导航栏透明度
   */
  private headerTransparent: number = 0;
  /**
   * 头部图片 VNode 元素
   */
  @Ref('FriendsPreviewHeader') readonly FriendsPreviewHeader!: {
    $el: HTMLElement;
  };

  /**
   * 头部图片的高度
   */
  private scrollImgHeight: number = 0;

  /**
   * 监听点击头部左侧功能按钮
   * @date 2019-11-11-19:55:22
   */
  private rightBtnClickHandler(): void {
    console.log('shoudaole');
  }

  /**
   * 监听滚动的点位,修改头部背景色的透明度
   * @date 2019-11-11-19:55:22
   */
  private scrollTop({ scrollTop }: { scrollTop: number }): void {
    const point = scrollTop / this.scrollImgHeight;
    //修改头部颜色的透明度
    this.headerTransparent = point > 1 ? 1 : point;
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
     util.log.danger(`
    ===============================================
    >>>>>>>              Error              >>>>>>>
    ===============================================
    `);
    util.log.success(`>>>>>>> 连接成功： ${111}   >>>>>>>`);
    util.log.capsule(`111`,`111`);
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
