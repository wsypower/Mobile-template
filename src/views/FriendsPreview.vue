<template>
  <div class="cg_preview">
    <!-- header start -->
    <page-header
      ref='header'
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
            :index='index'
            v-model='point'
            @starThumbsUp='starThumbsUp(index)'
            @comment-handler='commentHandler'
            @comment-reply='commentReply'
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
      <div
        class="comment-popup"
        ref='popupTextarea'
      >
        <form>
          <md-field>
            <md-textarea-item
              ref="textarea"
              class="demo2"
              v-model="value"
              :max-length="100"
              :max-height="350"
              row="3"
              :placeholder="textareaPlaceholder"
              clearable
              @keyup='textareaKeyUp()'
            >
              <template slot="footer">
                <div
                  class="footer-content"
                  flex="main:center cross:center"
                >
                  <span
                    class="footer-text"
                    v-if="value.length"
                  >{{ value.length }}</span>
                  <span
                    v-else
                    class="footer-text"
                  >0</span>
                  <span class="footer-text">/100</span>
                </div>
                <div class="textarea-btn">
                  <md-action-bar :actions="TextareaAction"></md-action-bar>
                </div>
              </template>
            </md-textarea-item>
          </md-field>
        </form>
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
  ActionBar,
  Toast,
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
    [ActionBar.name]: ActionBar,
    // [Toast.name]: Toast
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
   * 滚动条位置信息
   */
  private scrollTopNumber: number = 0;
  /**
   * 输入框
   */
  private isPopupShow = {};

  private value: string = '';

  private popupTextareaHeight: number = 0;

  /**
   * textarea ——p laceholder
   */
  private textareaPlaceholder: string = '回复信息在100字以内';
  /**
   * 是否是长按复制来的
   */
  private label: string = '';

  /**
   * 点击评论的索引
   */
  private commentIndex: number | null = null;
  /**
   * 输入按钮
   */
  private TextareaAction = [
    // {
    //   text: '关闭',
    //   onClick: this.subHandleClick,
    //   round: true,
    // },
    {
      text: '提交',
      onClick: this.subHandleClick,
      round: true,
      loading: false,
    },
  ];
  /* -------- FriendsItem ------- */

  /* -------- PageHeader ------- */

  /**
   * 头部导航栏透明度
   *
   * @memberof PageHeader
   */
  private headerTransparent: number = 0;

  /**
   * 头部导航栏自适应的高度
   *
   * @memberof PageHeader
   */
  private headerHeight: number = 0;

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
   * 单击评价的索引
   */
  private index: number | null = null;
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
  // 头部菜单栏的高度
  @Ref('header') readonly header!: {
    $el: HTMLElement;
  };
  // 输入弹出框的高度
  @Ref('popupTextarea') readonly popupTextarea!: HTMLElement;
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
    this.scrollTopNumber = scrollTop;
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
  private commentHandler({ e, comment, index }: { e: any; comment: number; index: number }) {
    this.index = index;
    this.showPopUp('bottom');
    // const { clientY, pageY, layerY, offsetY, screenY } = e;
    // console.log('screenY', screenY);
    // console.log('offsetY', offsetY);
    // console.log('layerY', layerY);
    // console.log('pageY', pageY);
    // console.log('clientY', clientY);
    // 点击区域按钮距离显示区域顶部的距离
    // const PointButton = clientY - offsetY;
    // 评论栏的高度
    // const commentHeight = comment;
    // 弹出框的高度
    // const popupHeight = 155; //（执行时间太慢，写死一个数据吧）
    // 可视区域高度
    // const clientHeight = document.body.clientHeight;
    // 要移动的距离
    // const RollingDistance = this.scrollTopNumber + PointButton - commentHeight - comment;
    // this.scroll.scrollView.scrollTo(null, RollingDistance, true);
    // this.scroll.scrollView.scrollTo(null, this.scrollImgHeight-this.headerHeight, true);
  }
  /**
   * 删除自己的评论弹出层
   */
  private removeSelfComment(): void {
    this.showActionSheet({
      value: true,
      options: [
        {
          text: '删除',
          value: '0',
        },
      ],
      defaultIndex: 0,
      cancelText: '取消',
      onSelected: this.removeSelfCommentHandler,
    });
  }

  /**
   * 删除评论
   */
  private removeSelfCommentHandler() {
    const index = this.commentIndex;
    this.list[this.index as number].comment.splice(index, 1);
    Toast.succeed('删除成功', 1000);
  }
  /**
   * 评论区长按回复
   */
  private commentReply({
    label,
    index,
    commentIndex,
  }: {
    label: string;
    index: number;
    commentIndex: number;
  }) {
    this.index = index;
    this.commentIndex = commentIndex;
    if (label === '') {
      return;
    }

    if (this.realname === label) {
      this.removeSelfComment();
      return;
    }
    this.showPopUp('bottom', label);
  }
  /**
   * 答复的键盘事件
   */
  private textareaKeyUp(name: string) {
    console.log(name);
  }
  /**
   * 显示输入弹窗
   */
  private showPopUp(type: string, label: string = '') {
    // 清空输入框
    this.value = '';
    // 显示输入弹窗
    // 复制给label
    this.label = label;
    // 判断 placeholder 显示的数据
    const Placeholder = this.label === '' ? '回复信息在100字以内' : `回复@${this.label}`;
    this.textareaPlaceholder = Placeholder;

    this.$set(this.isPopupShow, type, true);

    setTimeout(() => {
      this.$nextTick(() => {
        this.textarea.focus();
      });
    }, 200);
  }
  private focus(name) {
    console.log('fouce');
  }
  /**
   * 提交
   */
  private subHandleClick() {
    if (this.value.length === 0) {
      Toast.failed('回复内容不能为空', 1000);
      return;
    }
    // 开启提交加载
    this.TextareaAction[0].loading = true;
    setTimeout(() => {
      // 关闭提交加载
      this.TextareaAction[0].loading = false;
      // 关闭弹窗
      this.$set(this.isPopupShow, 'bottom', false);
      Toast.succeed('答复成功', 1000);
      // 判断是不是回复谁，还是自己回复的 textareaPlaceholder
      const Resultlabel = this.label === '' ? [this.realname] : [this.realname, this.label];
      console.log(this.textareaPlaceholder);
      const result = {
        label: Resultlabel,
        value: this.value,
      };
      this.list[this.index as number].comment.push(result);
    }, 1000);
  }
  /**
   * 取消提交
   */
  private cancelHdndleClick() {
    this.$set(this.isPopupShow, 'bottom', false);
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
     * 获取导航栏的高度
     */
    this.headerHeight = this.getEleStyle(this.header.$el, 'height');
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
  // min-height: 100%;
  // position: fixed;

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

    .footer-content {
      padding-left: 35px;
      // height: 50px;
      width: 100%;
      color: #c5cad5;
      font-weight: 400;
    }
  }
}
</style>
