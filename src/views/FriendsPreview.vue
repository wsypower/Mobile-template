<template>
  <div class="cg_preview">
    <!-- header start -->
    <page-header
      @rightBtnClickHandler="rightBtnClickHandler()"
      :transparent="headerTransparent"
      title='朋友圈'
    />
    <!-- header end -->
    <!-- 滚动页面 start-->
    <scroll-page-wrap
      @scrollTop="scrollTop"
      :scrollButton="scrollButton"
      :isFinished='isFinished'
      @onRefresh='onRefresh'
      @onEndReached='onEndReached'
      ref='scroll'
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
      <!-- v-scroll-reveal.reset -->
      <template #body>
        <div
          class="preview_item"
          v-for="(item, index) in list"
          :key="index"
        >
          <Friends-item
            :text='item.text'
            :star='item.star'
            :time='item.time'
            :name='item.name'
            :likes='item.likes'
            v-model='point'
            @starThumbsUp='starThumbsUp(index)'
          ></Friends-item>
        </div>

      </template>
      <!-- 内容  start-->
    </scroll-page-wrap>
    <!-- 滚动页面 end-->
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import PageHeader from '@/components/base/PageHeader.vue';
import scrollPageWrap from '@/components/base/scrollPageWrap.vue';
import FriendsPreviewHeader from '@/components/views/friendsPreview/friendsPreviewHeader.vue';
import { getElementStyle } from '@/util/util.assist';
import util from '@/util/util';
import { AsyncGetUser } from '@/api/modules.ts/friend/list';
import FriendsItem from '../components/views/friendsPreview/feirendsItem.vue';
import { AsyncGetList } from '../api/modules.ts/friend/list';
import { ceil, throttle, debounce } from 'lodash';
import { UserModule } from '@/store/modules/user';
import { ActionSheet, Dialog } from 'mand-mobile';
import ActionSheetMixin from '@/mixin/ActionSheet';
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
    [ActionSheet.name]: ActionSheet,
  },
})
export default class FriPreview extends mixins(ActionSheetMixin) {
  /*=============================================
  =                     Data                    =
  =============================================*/
  /**
   *
   * 列表信息
   */
  private list: any[] = [];
  private point: number = 0;
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
   * 是否已经加载所有数据
   *
   * @private
   */
  private isFinished: boolean = false;
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
  private get realname() {
    return UserModule.getRelName;
  }

  /**
   * 姓名
   *
   * @memberof FriendsPreviewHeader
   */
  private get userId() {
    return UserModule.userId;
  }
  /* -------- list ------- */
  /**
   * 数据长度
   */
  private get listLength(): number {
    return this.list.length;
  }
  /*=============================================
  =                     Watch                   =
  =============================================*/
  /* -------- list 判断是否已经加载全部 ------- */
  /**
   * 检测数据长度
   */
  @Watch('listLength')
  onChildChanged(val: number, oldVal: number) {
    val > 20 ? (this.isFinished = true) : (this.isFinished = false);
  }

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
  /* -------- scrollPageWrap ------- */
  /**
   * Ref scrollPageWrap
   *
   * @memberof scrollPageWrap
   */
  @Ref('scroll') readonly scroll!: scrollPageWrap;
  /*=============================================
  =                    Method                   =
  =============================================*/
  /* -------- start ------- */
  private starThumbsUp(index: number) {
    // 取反数据，否则会重刷，以后用v-model设计传值
    this.list[index].star = !this.list[index].star;
  }

  /* -------- PageHeader ------- */
  /**
   * 监听点击头部左侧功能按钮
   *
   * @memberof PageHeader
   */
  private rightBtnClickHandler(): void {
    console.log('shoudaole');
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '拍摄',
          value: '0',
        },
        {
          text: '从手机相册选择',
          value: '1',
        },
      ],
      cancelText: '取消',
      onSelected: this.selected,
    });
  }

  /* -------- scrollPageWrap ------- */
  /**
   * 监听滚动的点位,修改头部背景色的透明度
   *
   * @memberof scrollPageWrap
   */
  private scrollTop({ scrollTop }: { scrollTop: number }) {
    // 保留一位小数
    const point = ceil(scrollTop / this.scrollImgHeight, 1);

    this.point = point;
    // 修改头部颜色的透明度
    this.headerTransparent = point > 1 ? 1 : point < 0 ? 0 : point;
  }

  /**
   * 下拉刷新
   *
   * @memberof scrollPageWrap
   */
  private onRefresh() {
    this.GetListData(this.scroll.scrollView.finishRefresh);
    // 重置“上拉加载”的状态
    this.scroll.scrollView.finishLoadMore();
  }

  /**
   * 上拉加载
   *
   * @memberof scrollPageWrap
   */
  private onEndReached() {
    if (this.isFinished) {
      return;
    }
    AsyncGetList({
      // 参数列表
      userId: this.userId,
    })
      .then((res: any) => {
        const { list } = res;
        this.list.push(...list);
        this.scroll.scrollView.finishLoadMore();
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /* -------- async ------- */
  /**
   * 获取user数据
   *
   * @promise
   */
  private GetListData(fn?: Function): void {
    AsyncGetList({
      // 参数列表
      userId: this.userId,
    })
      .then((res: any) => {
        console.log(res);
        const { list } = res;
        this.list = list;
        if (fn) {
          fn();
        }
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
    /**
     * 获取头部图片的高度
     */
    this.scrollImgHeight = this.getEleStyle(this.FriendsPreviewHeader.$el, 'height');
    /**
     * 初始化滚动条 加载list数据
     */
    this.GetListData(this.scroll.scrollView.init);
  }
  /*=============================================
  =                    Created                  =
  =============================================*/
  // private created(): void {
  //   // 获取列表项
  //   // this.GetListData();
  // }
}
</script>

<style scoped lang="scss">
.cg_preview {
  width: 100%;
  height: 100%;
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
