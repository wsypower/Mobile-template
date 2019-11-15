<template>
  <div class="cg_preview">
    <!-- header start -->
    <page-header
      @rightBtnClickHandler="rightBtnClickHandler()"
      :transparent="headerTransparent"
    />
    <!-- header end -->
    <!-- 滚动页面 start-->
    <scroll-page-wrap
      @scrollTop="scrollTop"
      :scrollButton="scrollButton"
    >
      <!-- 头部 start-->
      <template #header>
        <Friends-preview-header
          ref="FriendsPreviewHeader"
          :realname="realname"
        />
      </template>
      <!-- 头部 start-->
      <!-- 内容  start-->
      <template #body>
        <!-- <div v-for="index in list" class="scroll-view-item" :key="index" @click="onItemClick(i)">
          {{ index }}
        </div> -->
        <div class="preview_item">
          <Friends-item></Friends-item>
        </div>
      </template>
      <!-- 内容  start-->
    </scroll-page-wrap>
    <!-- 滚动页面 end-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import scrollPageWrap from '@/components/base/scrollPageWrap.vue';
import FriendsPreviewHeader from '@/components/views/friendsPreview/friendsPreviewHeader.vue';
import { getElementStyle } from '@/util/util.assist';
import util from '@/util/util';
import { AsyncGetUser } from '@/api/modules.ts/friend/list';
import FriendsItem from '../components/views/friendsPreview/feirendsItem.vue';

/*=============================================
=                  Component                  =
=============================================*/

@Component({
  name: 'FriPreview',
  components: {
    FriendsPreviewHeader,
    PageHeader,
    scrollPageWrap,
    FriendsItem,
  },
})
export default class FriPreview extends Vue {
  /*=============================================
  =                     Data                    =
  =============================================*/
  private list = 30;
  /* -------- FriendsItem ------- */

  /* -------- PageHeader ------- */

  /**
   * 头部导航栏透明度
   *
   * @memberof PageHeader
   */
  private headerTransparent: number = 0;

  /* -------- scrollPageWrap ------- */
  /**
   * 头部图片的高度
   *
   * @private
   */
  private scrollImgHeight: number = 0;

  /**
   * 空白按钮
   *
   * @memberof scrollPageWrap
   */
  private scrollButton: any[] = [
    {
      text: '点击新增',
      type: 'primary',
      icon: 'camera',
      round: true,
      handler() {
        console.log('跳转页面');
      },
    },
  ];
  /* -------- FriendsPreviewHeader ------- */
  /**
   * 姓名
   *
   * @memberof FriendsPreviewHeader
   */
  private realname: string = '';

  /*=============================================
  =                     Ref                     =
  =============================================*/

  /* -------- FriendsPreviewHeader ------- */
  /**
   * Ref FriendsPreviewHeader
   *
   * @memberof FriendsPreviewHeader
   */
  @Ref('FriendsPreviewHeader') readonly FriendsPreviewHeader!: {
    $el: HTMLElement;
  };

  /*=============================================
  =                    Method                   =
  =============================================*/

  /* -------- PageHeader ------- */
  /**
   * 监听点击头部左侧功能按钮
   *
   * @memberof PageHeader
   */
  private rightBtnClickHandler(): void {
    console.log('shoudaole');
  }
  /* -------- scrollPageWrap ------- */
  /**
   * 监听滚动的点位,修改头部背景色的透明度
   *
   * @memberof scrollPageWrap
   */
  private scrollTop({ scrollTop }: { scrollTop: number }): void {
    const point = scrollTop / this.scrollImgHeight;
    // 修改头部颜色的透明度
    this.headerTransparent = point > 1 ? 1 : point < 0 ? 0 : point;
  }
  /* -------- async ------- */
  /**
   * 获取user数据
   *
   * @promise
   */
  private GetUserData(): void {
    AsyncGetUser({ userId: 123 })
      .then((res: any) => {
        const { realname } = res;
        this.realname = realname;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /* -------- public ------- */
  /**
   * 获取元素属性
   *
   * @private
   */
  private getEleStyle(el: HTMLElement, style: string): number {
    return parseFloat(getElementStyle(el, style));
  }

  /*=============================================
  =                    Mounted                  =
  =============================================*/

  private mounted(): void {
    // 获取头部图片的高度
    this.scrollImgHeight = this.getEleStyle(this.FriendsPreviewHeader.$el, 'height');
  }
  /*=============================================
  =                    Created                  =
  =============================================*/
  private created(): void {
    this.GetUserData();
  }
}
</script>

<style scoped lang="scss">
.cg_preview {
  width: 100%;
  height: 100%;
  background-color: red;
  // background-color: #f5f5f5;
  /*=============================================
  =                scroll item                  =
  =============================================*/
  .scroll-view-item {
    padding: 50px 0;
    text-align: center;
    font-size: 28px;
    background-color: #fff;
    border-bottom: 0.5px solid #efefef;
  }
}
</style>
