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
          class="skeleton"
          v-for='item in 10'
          v-if='skeleton'
          :key="index"
        >
          <md-skeleton
            avatar
            title
            :row='8'
            :loading="skeleton"
          >
          </md-skeleton>
        </div>
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
            :images='item.images'
            :video='item.video'
            :comment='item.comment'
            v-model='point'
            @starThumbsUp='starThumbsUp(index)'
            @comment-handler='commentHandler'
          ></Friends-item>
        </div>
      </template>
      <!-- 内容  start-->
    </scroll-page-wrap>
    <!-- 滚动页面 end-->
    <!-- 输入评论 start -->
    <md-popup
      v-model="isPopupShow.bottom"
      position="bottom"
    >
      <div class="comment-popup">
        <md-field>
          <md-textarea-item
            ref="textarea"
            class="demo2"
            v-model="value"
            :max-length="100"
            :max-height="200"
            placeholder="回复信息在100字以内"
            clearable
          >
            <!-- <template slot="footer">
              <p class="demo2-footer">
                <span
                  class="demo2-footer-left"
                  v-if="value.length"
                >{{ value.length }}/100</span>
                <span v-else></span>
                <span class="demo2-footer-right">页脚文案</span>
              </p>
            </template> -->
          </md-textarea-item>
        </md-field>
      </div>
    </md-popup>
    <!-- 输入评论 end -->

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
import {
  ActionSheet,
  Dialog,
  Popup,
  PopupTitleBar,
  TextareaItem,
  Field,
  InputItem,
} from 'mand-mobile';
import ActionSheetMixin from '@/mixin/ActionSheet';
import { Skeleton } from 'mand-mobile';
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
    [Skeleton.name]: Skeleton,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Field.name]: Field,
    [TextareaItem.name]: TextareaItem,
    [InputItem.name]: InputItem,
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

  /**
   * 骨架屏
   */
  private skeleton: boolean = true;

  /**
   * 输入框
   */
  private isPopupShow = {};

  private value: string = '';
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
  /**
   * Ref textarea
   */
  @Ref('textarea') readonly textarea!: any;
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
  private GetListData(fn?: Function): any {
    return AsyncGetList({
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
        return Promise.resolve();
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /* -------- 输入评论 ------- */
  /**
   * 评论按钮被点击
   */
  private commentHandler(e) {
    console.log(e);
    console.log(3);
    const { pageX, pageY } = e;
    this.showPopUp('bottom');
    // this.scroll.scrollView.scrollTo(pageX, pageY, true)
  }
  /**
   * 显示输入弹窗
   */
  private showPopUp(type) {
    //显示输入弹窗
    this.$set(this.isPopupShow, type, true);
    this.$nextTick(() => {
      this.textarea.focus();
    });
    // setTimeout(() => {
    // }, 200);
    // console.log(this.textarea);
  }
  private focus(name) {
    console.log(name);
    console.log('fouce');
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
    this.GetListData(this.scroll.scrollView.init).then(res => {
      //关闭骨架屏
      this.skeleton = false;
    });
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
  /* 骨架屏 */
  .skeleton {
    width: 100%;
    background-color: #fff;
    padding: 50px 40px 50px 40px;
  }
  /deep/.md-popup-box {
    border-radius: 25px 25px 0px 0px;
  }
  .comment-popup {
    // height: 500px;
    width: 100%;
    background-color: #fff;
    box-shadow: 1px -7px 12px #9c9c9c;
    border-radius: 25px 25px 0px 0px;
  }
}
</style>
